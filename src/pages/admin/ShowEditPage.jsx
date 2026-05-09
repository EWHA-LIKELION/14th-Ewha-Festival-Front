/**
 * 공연 수정 페이지
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAlertStore from '@/store/useAlertStore';
import useToastStore from '@/store/useToastStore';
import useLoadingStore from '@/store/useLoadingStore';

import Header from '@/components/Header';
import {
  useImageUploader,
  useScrollToTop,
  useShowDetail,
  useShowNotices,
  useUpdateShow,
} from '@/hooks';
import { ThumbnailImageUploader, DetailImageUploader } from '@/components/FileUploader';
import Input from '@/components/Input/Input';
import Checkbox from '@/components/Checkbox';
import Radio from '@/components/Radio';
import Chip from '@/components/Chip';
import { AdminAccordion } from '@/components/Accordion';
import Divider from '@/components/Divider';
import TextArea from '@/components/Input/TextArea';
import Timepicker from '@/components/Timepicker';
import Button from '@/components/Button';
import { FESTIVAL_TIME } from '@/constants/time';

const ERROR_TEXT_CLASS = 'text-xs font-normal leading-4 font-normal tracking-0';
const ERROR_TEXT_STYLE = {
  color: 'var(--System-normal, #FF5B5E)',
};
const DAYS = ['05.20', '05.21', '05.22'];

const ShowEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const openAlert = useAlertStore((s) => s.openAlert);
  const closeAlert = useAlertStore((s) => s.closeAlert);
  const showToast = useToastStore((s) => s.showToast);

  useScrollToTop();
  const showLoading = useLoadingStore((s) => s.showLoading);
  const hideLoading = useLoadingStore((s) => s.hideLoading);

  const { data: showData, isLoading: isShowLoading, error: showError } = useShowDetail(id);
  const { data: noticesData, isLoading: isNoticesLoading } = useShowNotices(id);

  const isLoading = isShowLoading || isNoticesLoading;

  const [originData, setOriginData] = useState(null);
  const [originNotices, setOriginNotices] = useState([]);
  const [initialSetlists, setInitialSetlists] = useState([]);
  const [resourceVersion, setResourceVersion] = useState(null);

  // 폼 상태 관리
  const [form, setForm] = useState({
    name: '',
    description: '',
    locationDetail: '',
    snsInstagram: '',
    snsKakao: '',
  });
  const [category, setCategory] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const [schedule, setSchedule] = useState(
    DAYS.reduce((acc, day) => {
      const timeRange = FESTIVAL_TIME.show[day];

      acc[day] = {
        start: timeRange.start,
        end: timeRange.end,
      };

      return acc;
    }, {}),
  );

  const [notices, setNotices] = useState([]);
  const [setlists, setSetlists] = useState([]);

  const [isDirty, setIsDirty] = useState(false);

  const {
    image: detailImage,
    file: detailFile,
    isDeleted: isRoadviewDeleted,
    onSelectFile: onDetailChange,
    clearImage: clearDetailImage,
  } = useImageUploader(originData?.roadview);

  const {
    image: thumbnailImage,
    file: thumbnailFile,
    isDeleted: isThumbnailDeleted,
    onSelectFile: onThumbnailChange,
    clearImage: clearThumbnailImage,
  } = useImageUploader(originData?.thumbnail);

  // 삭제된 항목 ID 추적
  const [deletedNoticeIds, setDeletedNoticeIds] = useState([]);
  const [deletedSetlistIds, setDeletedSetlistIds] = useState([]);

  // 에러 상태
  const [errors, setErrors] = useState({ notices: [], items: [] });
  const [isFormValid, setIsFormValid] = useState(false);

  // 1. 데이터 초기화 (쿼리 결과를 폼 state로 한 번만 populate)
  useEffect(() => {
    if (!showData || !noticesData || originData) return;

    const sanitizeUrl = (url) => {
      if (!url) return url;
      return url
        .replace(/^http:\/\//, 'https://')
        .replace(/[^:/?#]+(?=[/?#]|$)/g, (segment) => encodeURIComponent(segment));
    };

    const safeData = {
      ...showData,
      thumbnail: sanitizeUrl(showData.thumbnail),
      roadview: sanitizeUrl(showData.roadview),
    };

    setOriginData(safeData);
    setResourceVersion(showData.updated_at);

    const snsArray = showData.sns || [];

    // 기본 정보 세팅
    setForm({
      name: showData.name || '',
      description: showData.description || '',
      locationDetail: showData.location_description || '',
      snsKakao: snsArray[0] || '',
      snsInstagram: snsArray[1] || '',
    });
    setCategory(showData.category || null);

    // 스케줄 세팅
    showData.schedule?.forEach((s) => {
      const [start, end] = s.time.split('~');

      setSelectedDay(s.date);

      setSchedule((prev) => ({
        ...prev,
        [s.date]: { start, end },
      }));
    });

    // 공지 및 아이템 세팅
    const noticesArray = Array.isArray(noticesData) ? noticesData : [];

    setNotices(
      noticesArray.map((n) => ({
        ...n,
      })),
    );

    setOriginNotices(noticesArray);

    const setlistArray = Array.isArray(showData.setlist) ? [...showData.setlist] : [];

    setInitialSetlists(setlistArray);

    setSetlists(
      setlistArray.map((s) => ({
        id: s.id,
        name: s.name,
      })),
    );
  }, [showData, noticesData, originData]);

  useEffect(() => {
    if (!showError) return;
    console.error('데이터 로딩 실패:', showError);
    showToast('데이터를 불러오는데 실패했습니다.', 'warn');
  }, [showError]);

  useEffect(() => {
    if (isLoading) showLoading();
    else hideLoading();
    return () => hideLoading();
  }, [isLoading, showLoading, hideLoading]);

  useEffect(() => {
    if (!originData) return;

    const isChanged =
      form.name !== originData.name ||
      form.description !== originData.description ||
      form.locationDetail !== originData.location_description ||
      category !== originData.category ||
      JSON.stringify(schedule) !==
        JSON.stringify(
          DAYS.reduce((acc, day) => {
            const s = originData.schedule?.find((d) => d.date === day);
            if (s) {
              const [start, end] = s.time.split('~');
              acc[day] = { checked: true, start, end };
            } else {
              acc[day] = { checked: false, start: '09:00', end: '18:00' };
            }
            return acc;
          }, {}),
        ) ||
      JSON.stringify(notices) !== JSON.stringify(originNotices) ||
      JSON.stringify(setlists) !== JSON.stringify(initialSetlists) ||
      thumbnailFile ||
      detailFile ||
      isThumbnailDeleted ||
      isRoadviewDeleted;

    setIsDirty(!!isChanged);
  }, [
    form,
    category,
    schedule,
    notices,
    setlists,
    thumbnailFile,
    detailFile,
    isThumbnailDeleted,
    isRoadviewDeleted,
    originData,
  ]);

  // 핸들러 함수들
  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleNoticeChange = (idx, field, value) => {
    const newNotices = [...notices];
    newNotices[idx][field] = value;
    setNotices(newNotices);
  };

  const handleSetlistAdd = () => {
    setSetlists((prev) => [...prev, { id: null, name: '' }]);
  };

  const handleSetlistChange = (idx, value) => {
    setSetlists((prev) => prev.map((item, i) => (i === idx ? { ...item, name: value } : item)));
  };

  // 이미지 삭제 alert
  const handleClickRemove = (clearImage) => {
    openAlert({
      variant: 'delete',
      title: '사진',
      text: (
        <>
          사진을 삭제할까요?
          <br />
          삭제한 사진은 복구되지 않아요.
        </>
      ),
      onConfirm: () => {
        clearImage();
        closeAlert();
      },
      onCancel: () => closeAlert(),
    });
  };

  // 공지 삭제 alert
  const handleNoticeRemove = (idx) => {
    openAlert({
      variant: 'delete',
      title: '공지',
      text: (
        <>
          공지를 삭제할까요?
          <br />
          삭제한 공지는 복구되지 않아요.
        </>
      ),
      onConfirm: () => {
        const target = notices[idx];
        if (target.id) setDeletedNoticeIds((prev) => [...prev, target.id]);
        setNotices((prev) => prev.filter((_, i) => i !== idx));
        closeAlert();
      },
      onCancel: () => closeAlert(),
    });
  };

  // 리스트 삭제 alert
  const handleSetlistRemove = (idx) => {
    openAlert({
      variant: 'delete',
      title: '세트리스트',
      text: (
        <>
          리스트를 삭제할까요?
          <br />
          삭제한 세트리스트는 복구되지 않아요.
        </>
      ),
      onConfirm: () => {
        const target = setlists[idx];
        if (target.id) setDeletedSetlistIds((prev) => [...prev, target.id]);
        setSetlists((prev) => prev.filter((_, i) => i !== idx));
        closeAlert();
      },
      onCancel: () => closeAlert(),
    });
  };

  const handleBack = () => {
    if (!isDirty) {
      navigate(-1);
      return;
    }

    openAlert({
      variant: 'delete',
      title: '변경사항 삭제',
      confirmLabel: '확인',
      text: (
        <>
          변경사항을 삭제할까요?
          <br />
          삭제된 변경사항은 복구되지 않아요.
        </>
      ),
      onConfirm: () => {
        setIsDirty(false);
        closeAlert();
        navigate(-1);
      },
      onCancel: () => closeAlert(),
    });
  };

  // 유효성 검사
  const validateForm = useCallback(() => {
    const newErrors = {
      name: '',
      category: '',
      schedule: '',
      notices: [],
      setlists: [],
    };

    if (!form.name.trim()) newErrors.name = '부스명을 입력해주세요.';
    if (!category) newErrors.category = '카테고리를 선택해주세요.';
    if (!selectedDay) newErrors.schedule = '운영 시간을 선택해주세요.';

    newErrors.notices = notices.map((n) => ({
      title: !n.title.trim() ? '제목을 입력해주세요.' : '',
      content: !n.content.trim() ? '내용을 입력해주세요.' : '',
    }));

    newErrors.setlists = setlists.map((s) => ({
      name: !s.name?.trim() ? '내용을 입력해주세요.' : '',
    }));

    const isValid =
      !newErrors.name &&
      !newErrors.category &&
      !newErrors.schedule &&
      newErrors.notices.every((n) => !n.title && !n.content) &&
      newErrors.setlists.every((s) => !s.name);

    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  }, [form, category, schedule, notices, setlists]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const updateShowMutation = useUpdateShow(id, resourceVersion);

  const handleSave = () => {
    if (!validateForm()) return;

    const formData = new FormData();

    // 1. 기본 필드 (변경된 것만)
    if (form.name !== originData.name) {
      formData.append('name', form.name || null);
    }

    if (form.description !== originData.description) {
      formData.append('description', form.description);
    }

    if (form.locationDetail !== originData.location_description) {
      formData.append('location_description', form.locationDetail);
    }

    // 2. category
    if (category !== originData.category) {
      formData.append('category', category);
    }

    // 3. 이미지
    // thumbnail 처리
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    } else if (isThumbnailDeleted) {
      formData.append('thumbnail', '');
    }

    // roadview 처리
    if (detailFile) {
      formData.append('roadview', detailFile);
    } else if (isRoadviewDeleted) {
      formData.append('roadview', '');
    }

    // 4. schedule
    const schedulePayload = selectedDay
      ? [
          {
            date: selectedDay,
            time: `${schedule[selectedDay].start}~${schedule[selectedDay].end}`,
          },
        ]
      : [];

    formData.append('schedule', JSON.stringify(schedulePayload));

    // 5. notice (신규/수정된 공지만 전송)
    const originalNoticeMap = new Map(
      originNotices.filter((n) => n.id).map((n) => [n.id, { title: n.title, content: n.content }]),
    );

    const noticePayload = notices
      .filter((n) => {
        if (!n.id) return true;

        const original = originalNoticeMap.get(n.id);
        if (!original) return true;

        return n.title !== original.title || n.content !== original.content;
      })
      .map((n) => ({
        ...(n.id ? { id: n.id } : {}),
        title: n.title,
        content: n.content,
      }));

    formData.append('notice', JSON.stringify(noticePayload));

    // 6. setlist
    const setlistPayload = setlists
      .filter((s) => s.name?.trim())
      .map((s) => ({
        ...(s.id ? { id: s.id } : {}),
        name: s.name,
      }));

    formData.append('setlist', JSON.stringify(setlistPayload));

    // 7. 삭제 배열
    if (deletedNoticeIds.length > 0) {
      formData.append('deleted_notice_ids', JSON.stringify(deletedNoticeIds));
    }

    if (deletedSetlistIds.length > 0) {
      formData.append('deleted_setlist_ids', JSON.stringify(deletedSetlistIds));
    }

    // 8. sns
    const currentSns = [form.snsKakao, form.snsInstagram].filter((v) => v && v.trim() !== '');

    formData.append('sns', JSON.stringify(currentSns));

    updateShowMutation.mutate(formData);
  };

  if (isLoading || !originData) return null;

  return (
    <>
      <Header
        left="back"
        right="save"
        onSave={handleSave}
        saveDisabled={!isFormValid}
        onBack={handleBack}
      />

      <div className="pt-18">
        <ThumbnailImageUploader
          image={thumbnailImage}
          onChange={onThumbnailChange}
          onRemove={() => handleClickRemove(clearThumbnailImage)}
        />

        <div className="flex w-full flex-col items-center gap-6 px-5 pt-5 pb-6">
          {/* 부스명 */}
          <div className="flex w-full flex-col items-start gap-3">
            <div className="flex items-center gap-1">
              <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
                공연명
              </h2>
              <p className="text-xs leading-4 font-normal tracking-normal text-emerald-600">
                *필수
              </p>
            </div>
            <Input
              variant="square"
              value={form.name}
              onChange={(value) => handleChange('name', value)}
              placeholder="공연명을 입력해주세요"
              maxLength="20"
              error={!!errors.name}
            />
            {errors.name && (
              <p className={`${ERROR_TEXT_CLASS} -mt-7`} style={ERROR_TEXT_STYLE}>
                {errors.name}
              </p>
            )}
          </div>

          {/* 카테고리 */}
          <div className="flex w-full flex-col items-start gap-3">
            <div className="flex items-center gap-1">
              <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
                카테고리
              </h2>
              <p className="text-xs leading-4 font-normal tracking-normal text-emerald-600">
                *필수
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Radio
                label="밴드"
                selected={category === 'BAND'}
                onChange={() => handleCategory('BAND')}
                error={!!errors.category}
              />
              <Radio
                label="보컬"
                selected={category === 'VOCAL'}
                onChange={() => handleCategory('VOCAL')}
                error={!!errors.category}
              />
              <Radio
                label="댄스"
                selected={category === 'DANCE'}
                onChange={() => handleCategory('DANCE')}
                error={!!errors.category}
              />
              <Radio
                label="연극"
                selected={category === 'THEATER'}
                onChange={() => handleCategory('THEATER')}
                error={!!errors.category}
              />
            </div>
            {errors.category && (
              <p className={`${ERROR_TEXT_CLASS} -mt-1.5`} style={ERROR_TEXT_STYLE}>
                {errors.category}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col pb-36">
          <AdminAccordion title="정보 수정하기">
            <div>
              <Divider />
              <div className="flex w-full flex-col items-start gap-6 self-stretch bg-zinc-50 px-5 py-6">
                {/* 소개글 */}
                <div className="flex w-full flex-col items-stretch self-stretch">
                  <TextArea
                    value={form.description}
                    onChange={(value) => handleChange('description', value)}
                    size="large"
                    label="소개글"
                    placeholder="소개글을 입력해주세요"
                    maxLength="100"
                  />
                </div>

                {/* 운영 시간 */}
                <div className="flex w-full flex-col items-start gap-3">
                  <div className="flex items-center gap-1">
                    <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
                      운영 시간
                    </h2>
                    <p className="text-xs leading-4 font-normal tracking-normal text-emerald-600">
                      *필수
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    {DAYS.map((day) => {
                      const timeRange = FESTIVAL_TIME.show[day];

                      return (
                        <div key={day} className="flex items-center gap-7">
                          <Radio
                            label={
                              day === '05.20' ? '수요일' : day === '05.21' ? '목요일' : '금요일'
                            }
                            selected={selectedDay === day}
                            onChange={() => handleDaySelect(day)}
                          />
                          <Timepicker
                            startTime={schedule?.[day]?.start}
                            endTime={schedule?.[day]?.end}
                            isSelected={selectedDay === day}
                            onStartChange={(start) =>
                              setSchedule((prev) => ({ ...prev, [day]: { ...prev[day], start } }))
                            }
                            onEndChange={(end) =>
                              setSchedule((prev) => ({ ...prev, [day]: { ...prev[day], end } }))
                            }
                            minTime={timeRange.start}
                            maxTime={timeRange.end}
                            onError={(msg) => showToast(msg, 'warn')}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {errors.schedule && (
                    <p className={`${ERROR_TEXT_CLASS} -mt-1.5`} style={ERROR_TEXT_STYLE}>
                      {errors.schedule}
                    </p>
                  )}
                </div>

                {/* 위치 로드뷰 */}
                <div className="flex w-full flex-col items-start gap-3 self-stretch">
                  <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
                    위치 로드뷰
                  </h2>
                  <DetailImageUploader
                    image={detailImage}
                    onChange={onDetailChange}
                    onRemove={() => handleClickRemove(clearDetailImage)}
                  />
                </div>

                {/* 위치 상세설명 */}
                <div className="flex w-full flex-col items-start gap-3 self-stretch">
                  <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
                    위치 상세설명
                  </h2>
                  <Input
                    variant="square_white"
                    value={form.locationDetail}
                    onChange={(value) => handleChange('locationDetail', value)}
                    placeholder="학문관 지하예요/이마트24 오른쪽에 있어요"
                    maxLength="50"
                  />
                </div>

                {/* SNS */}
                <div className="flex w-full flex-col items-start gap-3 self-stretch">
                  <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
                    SNS 링크
                  </h2>
                  <div className="flex items-center gap-3 self-stretch">
                    <img src="/icons/logo-instagramcolor.svg" className="rounded-md" />
                    <Input
                      variant="square_white"
                      value={form.snsInstagram}
                      onChange={(value) => handleChange('snsInstagram', value)}
                      placeholder="https://www.instagram.com/"
                    />
                  </div>
                  <div className="flex items-center gap-3 self-stretch">
                    <img src="/icons/logo-kakaotalkcolor.svg" className="rounded-md" />
                    <Input
                      variant="square_white"
                      value={form.snsKakao}
                      onChange={(value) => handleChange('snsKakao', value)}
                      placeholder="http://pf.kakao.com/"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AdminAccordion>

          <Divider />

          <AdminAccordion title="공지 수정하기">
            <div>
              <Divider />
              <div className="flex w-full flex-col gap-10 self-stretch bg-zinc-50 px-5 py-6">
                <Button
                  className="text-sm"
                  onClick={() =>
                    setNotices((prev) => [
                      {
                        id: null,
                        _tempId: Date.now(),
                        title: '',
                        content: '',
                      },
                      ...prev,
                    ])
                  }
                >
                  <img src="/icons/icon-addimage-white.svg" />
                </Button>

                {notices.map((notice, idx) => (
                  <div
                    key={notice.id ?? notice._tempId}
                    className="flex w-full flex-col items-start gap-3"
                  >
                    {idx !== 0 && (
                      <>
                        <Divider />
                        <div className="pt-5" />
                      </>
                    )}
                    <div className="flex items-start gap-2 self-stretch">
                      <h2 className="w-7 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
                        제목
                      </h2>
                      <Input
                        variant="square_white"
                        value={notice.title}
                        onChange={(value) => handleNoticeChange(idx, 'title', value)}
                        placeholder="제목을 입력해주세요"
                        maxLength="40"
                        error={!!errors.notices[idx]?.title}
                      />
                    </div>
                    {errors.notices[idx]?.title && (
                      <p className={`${ERROR_TEXT_CLASS} -mt-7 pl-8.5`} style={ERROR_TEXT_STYLE}>
                        {errors.notices[idx].title}
                      </p>
                    )}
                    <div className="flex w-full items-start gap-2 self-stretch">
                      <TextArea
                        labelPosition="left"
                        label="내용"
                        value={notice.content}
                        onChange={(value) => handleNoticeChange(idx, 'content', value)}
                        placeholder="내용을 입력해주세요"
                        maxLength="150"
                        error={!!errors.notices[idx]?.content}
                      />
                    </div>
                    {errors.notices[idx]?.content && (
                      <p className={`${ERROR_TEXT_CLASS} -mt-7 pl-8.5`} style={ERROR_TEXT_STYLE}>
                        {errors.notices[idx].content}
                      </p>
                    )}
                    <div className="flex justify-end self-stretch">
                      <Button
                        variant="bg-pink"
                        size="sm"
                        circle="true"
                        onClick={() => handleNoticeRemove(idx)}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AdminAccordion>

          <Divider />

          <AdminAccordion title="세트리스트 수정하기">
            <div>
              <Divider />
              <div className="flex w-full flex-col gap-10 self-stretch bg-zinc-50 px-5 py-6">
                {setlists.map((item, idx) => (
                  <div key={item.id ?? `new-${idx}`} className="flex w-full flex-col gap-3">
                    <div className="flex w-full items-end gap-4">
                      <div className="flex flex-1 flex-col">
                        <Input
                          variant="square_white"
                          value={item.name}
                          onChange={(value) => handleSetlistChange(idx, value)}
                          placeholder="아티스트와 노래를 입력해주세요"
                          maxLength="40"
                          error={!!errors.setlists?.[idx]?.name}
                        />
                        {errors.setlists?.[idx]?.setlist && (
                          <p className={ERROR_TEXT_CLASS} style={ERROR_TEXT_STYLE}>
                            {errors.setlists?.[idx]?.name}
                          </p>
                        )}
                      </div>

                      <Button
                        variant="bg-pink"
                        size="sm"
                        circle
                        onClick={() => handleSetlistRemove(idx)}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                ))}
                <Button onClick={handleSetlistAdd} className="text-sm">
                  <img src="/icons/icon-addimage-white.svg" />
                </Button>
              </div>
            </div>
          </AdminAccordion>
        </div>
      </div>
    </>
  );
};

export default ShowEditPage;
