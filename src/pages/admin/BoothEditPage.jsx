/**
 * 부스 수정 페이지
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
  useBoothDetail,
  useBoothNotices,
  useUpdateBooth,
} from '@/hooks';
import { ThumbnailImageUploader, DetailImageUploader } from '@/components/FileUploader';
import Input from '@/components/Input/Input';
import Checkbox from '@/components/Checkbox';
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
const PRICE_MAX_DIGITS = 5;

const formatPrice = (value) => {
  const digits = String(value ?? '')
    .replace(/\D/g, '')
    .slice(0, PRICE_MAX_DIGITS);
  return digits ? Number(digits).toLocaleString('en-US') : '';
};

const parsePrice = (value) => Number(String(value ?? '').replace(/,/g, ''));

const BoothEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const openAlert = useAlertStore((s) => s.openAlert);
  const closeAlert = useAlertStore((s) => s.closeAlert);
  const showToast = useToastStore((s) => s.showToast);

  useScrollToTop();
  const showLoading = useLoadingStore((s) => s.showLoading);
  const hideLoading = useLoadingStore((s) => s.hideLoading);

  const { data: boothData, isLoading: isBoothLoading, error: boothError } = useBoothDetail(id);
  const { data: noticesData, isLoading: isNoticesLoading } = useBoothNotices(id);

  const isLoading = isBoothLoading || isNoticesLoading;

  const [originData, setOriginData] = useState(null);
  const [originNotices, setOriginNotices] = useState([]);
  const [resourceVersion, setResourceVersion] = useState(null);

  // 폼 상태 관리
  const [form, setForm] = useState({
    name: '',
    description: '',
    locationDetail: '',
    snsInstagram: '',
    snsKakao: '',
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const [schedule, setSchedule] = useState(
    DAYS.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          checked: false,
          start: FESTIVAL_TIME.booth[day].start,
          end: FESTIVAL_TIME.booth[day].end,
        },
      }),
      {},
    ),
  );

  const [notices, setNotices] = useState([]);
  const [items, setItems] = useState([]);

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
  const [deletedProductIds, setDeletedProductIds] = useState([]);

  // 에러 상태
  const [errors, setErrors] = useState({ notices: [], items: [] });
  const [isFormValid, setIsFormValid] = useState(false);

  // 1. 데이터 초기화 (쿼리 결과를 폼 state로 한 번만 populate)
  useEffect(() => {
    if (!boothData || !noticesData || originData) return;

    const sanitizeUrl = (url) => {
      if (!url) return url;
      return url
        .replace(/^http:\/\//, 'https://')
        .replace(/[^:/?#]+(?=[/?#]|$)/g, (segment) => encodeURIComponent(segment));
    };

    const safeData = {
      ...boothData,
      thumbnail: sanitizeUrl(boothData.thumbnail),
      roadview: sanitizeUrl(boothData.roadview),
    };

    setOriginData(safeData);
    setResourceVersion(boothData.updated_at);

    const snsArray = boothData.sns || [];

    setForm({
      name: boothData.name || '',
      description: boothData.description || '',
      locationDetail: boothData.location_description || '',
      snsKakao: snsArray[0] || '',
      snsInstagram: snsArray[1] || '',
    });
    setSelectedCategories(boothData.category || []);
    setIsOpen(boothData.is_ongoing);

    const newSchedule = DAYS.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          checked: false,
          start: FESTIVAL_TIME.booth[day].start,
          end: FESTIVAL_TIME.booth[day].end,
        },
      }),
      {},
    );

    boothData.schedule?.forEach((s) => {
      const [start, end] = s.time.split('~');
      newSchedule[s.date] = { checked: true, start, end };
    });

    setSchedule(newSchedule);

    const noticesArray = Array.isArray(noticesData) ? noticesData : [];
    setNotices(noticesArray.map((n) => ({ ...n })));
    setOriginNotices(noticesArray);

    // 변경 후
    const productArray = Array.isArray(boothData.product) ? [...boothData.product] : [];

    setItems(
      productArray.map((p) => ({
        ...p,
        _tempId: crypto.randomUUID(),
        status: p.is_selling ? '판매중' : '종료',
        price: formatPrice(p.price),
        image: p.image || null,
      })),
    );
  }, [boothData, noticesData, originData]);

  useEffect(() => {
    if (!boothError) return;
    console.error('데이터 로딩 실패:', boothError);
    showToast('데이터를 불러오는데 실패했습니다.', 'warn');
  }, [boothError]);

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
      JSON.stringify(selectedCategories) !== JSON.stringify(originData.category) ||
      isOpen !== originData.is_ongoing ||
      JSON.stringify(schedule) !==
        JSON.stringify(
          DAYS.reduce((acc, day) => {
            const s = originData.schedule?.find((d) => d.date === day);
            if (s) {
              const [start, end] = s.time.split('~');
              acc[day] = { checked: true, start, end };
            } else {
              acc[day] = {
                checked: false,
                start: FESTIVAL_TIME.booth[day].start,
                end: FESTIVAL_TIME.booth[day].end,
              };
            }
            return acc;
          }, {}),
        ) ||
      JSON.stringify(notices) !== JSON.stringify(originNotices) ||
      JSON.stringify(items) !== JSON.stringify(originData.product || []) ||
      thumbnailFile ||
      detailFile ||
      isThumbnailDeleted ||
      isRoadviewDeleted;

    setIsDirty(!!isChanged);
  }, [
    form,
    selectedCategories,
    isOpen,
    schedule,
    notices,
    items,
    thumbnailFile,
    detailFile,
    isThumbnailDeleted,
    isRoadviewDeleted,
    originData,
  ]);

  // 핸들러 함수들
  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleCategory = (cat, checked) => {
    setSelectedCategories((prev) => (checked ? [...prev, cat] : prev.filter((c) => c !== cat)));
  };

  const handleDayCheck = (day, checked) => {
    setSchedule((prev) => ({ ...prev, [day]: { ...prev[day], checked } }));
  };

  const handleNoticeChange = (idx, field, value) => {
    const newNotices = [...notices];
    newNotices[idx][field] = value;
    setNotices(newNotices);
  };

  const handleItemAdd = () => {
    setItems((prev) => [
      ...prev,
      {
        id: null,
        _tempId: crypto.randomUUID(),
        name: '',
        description: '',
        price: '',
        status: '판매중',
        image: null,
      },
    ]);
  };

  const handleItemChange = (idx, field, value) => {
    const newItems = [...items];
    newItems[idx][field] = value;
    setItems(newItems);
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
  const handleItemRemove = (idx) => {
    openAlert({
      variant: 'delete',
      title: '리스트',
      text: (
        <>
          리스트를 삭제할까요?
          <br />
          삭제한 리스트는 복구되지 않아요.
        </>
      ),
      onConfirm: () => {
        const target = items[idx];
        if (target.id) setDeletedProductIds((prev) => [...prev, target.id]);
        setItems((prev) => prev.filter((_, i) => i !== idx));
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
      title: '변경사항',
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
      items: [],
    };

    if (!form.name.trim()) newErrors.name = '부스명을 입력해주세요.';
    if (selectedCategories.length === 0) newErrors.category = '카테고리를 1개 이상 선택해주세요.';
    if (!Object.values(schedule).some((d) => d.checked))
      newErrors.schedule = '운영 시간을 1개 이상 선택해주세요.';

    newErrors.notices = notices.map((n) => ({
      title: !n.title.trim() ? '제목을 입력해주세요.' : '',
      content: !n.content.trim() ? '내용을 입력해주세요.' : '',
    }));

    newErrors.items = items.map((i) => ({
      name: !i.name.trim() ? '이름을 입력해주세요.' : '',
      description: !i.description.trim() ? '설명을 입력해주세요.' : '',
      price: !i.price?.toString().trim() ? '가격을 입력해주세요.' : '',
    }));

    const isValid =
      !newErrors.name &&
      !newErrors.category &&
      !newErrors.schedule &&
      newErrors.notices.every((n) => !n.title && !n.content) &&
      newErrors.items.every((i) => !i.name && !i.description && !i.price);

    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  }, [form, selectedCategories, schedule, notices, items]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const updateBoothMutation = useUpdateBooth(id, resourceVersion);

  const handleSave = () => {
    if (!validateForm()) return;

    const formData = new FormData();

    // 1. 기본 필드 (변경된 것만)
    if (form.name !== originData.name) {
      formData.append('name', form.name || null);
    }

    if (isOpen !== originData.is_ongoing) {
      formData.append('is_ongoing', isOpen);
    }

    if (form.description !== originData.description) {
      formData.append('description', form.description);
    }

    if (form.locationDetail !== originData.location_description) {
      formData.append('location_description', form.locationDetail);
    }

    // 2. category (배열)
    if (JSON.stringify(selectedCategories) !== JSON.stringify(originData.category)) {
      formData.append('category', JSON.stringify(selectedCategories));
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
    const schedulePayload = Object.entries(schedule)
      .filter(([_, v]) => v.checked)
      .map(([date, v]) => ({
        date,
        time: `${v.start}~${v.end}`,
      }));

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

    // 6. product
    if (items.length > 0) {
      const productPayload = items.map((i, idx) => {
        if (i.image instanceof File) {
          formData.append(`product_image_${idx}`, i.image);
        } else if (i.image === null) {
          // 삭제 요청
          formData.append(`product_image_${idx}`, null);
        }

        return {
          id: i.id || undefined,
          name: i.name,
          description: i.description,
          price: parsePrice(i.price),
          is_selling: i.status === '판매중',
        };
      });

      formData.append('product', JSON.stringify(productPayload));
    }

    // 7. 삭제 배열
    if (deletedNoticeIds.length > 0) {
      formData.append('deleted_notice_ids', JSON.stringify(deletedNoticeIds));
    }

    if (deletedProductIds.length > 0) {
      formData.append('deleted_product_ids', JSON.stringify(deletedProductIds));
    }

    // 8. sns
    const currentSns = [form.snsKakao, form.snsInstagram].filter((v) => v && v.trim() !== '');

    formData.append('sns', JSON.stringify(currentSns));

    updateBoothMutation.mutate(formData);
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
                부스명
              </h2>
              <p className="text-xs leading-4 font-normal tracking-normal text-emerald-600">
                *필수
              </p>
            </div>
            <Input
              variant="square"
              value={form.name}
              onChange={(value) => handleChange('name', value)}
              placeholder="부스명을 입력해주세요"
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
              <Checkbox
                label="음식"
                isSelected={selectedCategories.includes('FOOD')}
                onChange={(checked) => handleCategory('FOOD', checked)}
                isError={!!errors.category}
              />
              <Checkbox
                label="굿즈"
                isSelected={selectedCategories.includes('GOODS')}
                onChange={(checked) => handleCategory('GOODS', checked)}
                isError={!!errors.category}
              />
              <Checkbox
                label="체험"
                isSelected={selectedCategories.includes('EXPERIENCE')}
                onChange={(checked) => handleCategory('EXPERIENCE', checked)}
                isError={!!errors.category}
              />
            </div>
            {errors.category && (
              <p className={`${ERROR_TEXT_CLASS} -mt-1.5`} style={ERROR_TEXT_STYLE}>
                {errors.category}
              </p>
            )}
          </div>

          {/* 운영 여부 */}
          <div className="flex w-full flex-col items-start gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-base leading-6 font-semibold tracking-normal text-zinc-800">
                운영 여부
              </h2>
              <p className="text-xs leading-4 font-normal tracking-normal text-zinc-500">
                설정한 운영 시간에 따라 자동 변경되며, 필요 시 수동으로 변경 가능합니다.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Chip
                variant="state"
                text="운영중"
                isSelected={isOpen === true}
                onClick={() => setIsOpen(true)}
              />
              <Chip
                variant="state"
                text="종료"
                isSelected={isOpen === false}
                onClick={() => setIsOpen(false)}
              />
            </div>
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
                      const timeRange = FESTIVAL_TIME.booth[day];

                      return (
                        <div key={day} className="flex items-center gap-7">
                          <Checkbox
                            label={
                              day === '05.20' ? '수요일' : day === '05.21' ? '목요일' : '금요일'
                            }
                            isSelected={schedule?.[day]?.checked}
                            onChange={(checked) => handleDayCheck(day, checked)}
                            isError={!!errors.schedule}
                          />
                          <Timepicker
                            startTime={schedule?.[day]?.start}
                            endTime={schedule?.[day]?.end}
                            isSelected={schedule?.[day]?.checked}
                            onStartChange={(start) =>
                              setSchedule((prev) => ({
                                ...prev,
                                [day]: { ...prev[day], start },
                              }))
                            }
                            onEndChange={(end) =>
                              setSchedule((prev) => ({
                                ...prev,
                                [day]: { ...prev[day], end },
                              }))
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

          <AdminAccordion title="리스트 수정하기">
            <div>
              <Divider />
              <div className="flex w-full flex-col gap-10 self-stretch bg-zinc-50 px-5 py-6">
                {items.map((item, idx) => (
                  <div
                    key={item.id ?? item._tempId}
                    className="flex w-full flex-col items-start gap-3"
                  >
                    {idx !== 0 && (
                      <>
                        <Divider />
                        <div className="pt-5" />
                      </>
                    )}
                    {/* 상태 */}
                    <div className="flex items-center gap-1 self-stretch pb-5.5">
                      <h3 className="flex items-start pr-2 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
                        상태
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <Chip
                          variant="state"
                          text="판매중"
                          isSelected={item.status === '판매중'}
                          onClick={() => handleItemChange(idx, 'status', '판매중')}
                        />
                        <Chip
                          variant="state"
                          text="종료"
                          isSelected={item.status === '종료'}
                          onClick={() => handleItemChange(idx, 'status', '종료')}
                        />
                      </div>
                    </div>

                    {/* 이름 */}
                    <div className="flex w-full items-start self-stretch">
                      <h3 className="flex w-9 items-start pr-2 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
                        이름
                      </h3>
                      <Input
                        variant="square_white"
                        value={item.name}
                        onChange={(value) => handleItemChange(idx, 'name', value)}
                        placeholder="이름을 입력해주세요"
                        maxLength="15"
                        error={!!errors.items[idx]?.name}
                      />
                    </div>
                    {errors.items[idx]?.name && (
                      <p className={`${ERROR_TEXT_CLASS} -mt-7 pl-8.5`} style={ERROR_TEXT_STYLE}>
                        {errors.items[idx].name}
                      </p>
                    )}

                    {/* 설명 */}
                    <TextArea
                      label="설명"
                      value={item.description}
                      onChange={(value) => handleItemChange(idx, 'description', value)}
                      labelPosition="left"
                      placeholder="설명을 입력해주세요"
                      maxLength="45"
                      error={!!errors.items[idx]?.description}
                    />
                    {errors.items[idx]?.description && (
                      <p className={`${ERROR_TEXT_CLASS} -mt-7 pl-8.5`} style={ERROR_TEXT_STYLE}>
                        {errors.items[idx].description}
                      </p>
                    )}

                    {/* 가격 */}
                    <div className="flex w-full items-start self-stretch pb-5.5">
                      <h3 className="flex w-9 items-start pr-2 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
                        가격
                      </h3>
                      <Input
                        variant="square_white"
                        value={item.price}
                        onChange={(value) => {
                          if (!/^[\d,]*$/.test(value)) {
                            showToast('가격은 숫자로만 입력해주세요.', 'warn');
                            return;
                          }

                          handleItemChange(idx, 'price', formatPrice(value));
                        }}
                        placeholder="가격을 입력해주세요"
                        maxLength={PRICE_MAX_DIGITS}
                        maxLengthCountMode="digits"
                        error={!!errors.items[idx]?.price}
                      />
                    </div>
                    {errors.items[idx]?.price && (
                      <p className={`${ERROR_TEXT_CLASS} -mt-7 pl-8.5`} style={ERROR_TEXT_STYLE}>
                        {errors.items[idx].price}
                      </p>
                    )}

                    {/* 사진 */}
                    <div className="flex w-full items-end justify-between self-stretch">
                      <div className="flex items-start">
                        <h2 className="flex w-9 pr-2 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
                          사진
                        </h2>
                        <DetailImageUploader
                          image={item.image}
                          onChange={(file) => handleItemChange(idx, 'image', file)}
                          onRemove={() =>
                            handleClickRemove(() => handleItemChange(idx, 'image', null))
                          }
                        />
                      </div>
                      <Button
                        variant="bg-pink"
                        size="sm"
                        circle="true"
                        onClick={() => handleItemRemove(idx)}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                ))}
                <Button onClick={handleItemAdd} className="text-sm">
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

export default BoothEditPage;
