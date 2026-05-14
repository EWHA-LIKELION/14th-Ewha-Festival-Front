/**
 * 부스 수정 - 상품(리스트) 항목
 * - 항목별로 useImageUploader 를 사용하기 위해 별도 컴포넌트로 분리
 */

import { useEffect } from 'react';
import { useImageUploader } from '@/hooks';
import { DetailImageUploader } from '@/components/FileUploader';
import Input from '@/components/Input/Input';
import TextArea from '@/components/Input/TextArea';
import Chip from '@/components/Chip';
import Button from '@/components/Button';
import Divider from '@/components/Divider';

const ERROR_TEXT_CLASS = 'text-xs font-normal leading-4 font-normal tracking-0';
const ERROR_TEXT_STYLE = {
  color: 'var(--System-normal, #FF5B5E)',
};

const ProductItem = ({
  item,
  index,
  error,
  priceMaxDigits,
  onChange,
  onPriceChange,
  onRemoveItem,
  onRemoveImage,
  onCompressingChange,
}) => {
  const { image, file, isDeleted, isCompressing, onSelectFile, clearImage } = useImageUploader(
    item.image,
  );

  // useImageUploader 의 이미지 변경을 부모 items[index].image 로 동기화
  useEffect(() => {
    if (file) onChange(index, 'image', file);
  }, [file, index, onChange]);

  useEffect(() => {
    if (isDeleted) onChange(index, 'image', null);
  }, [isDeleted, index, onChange]);

  // 압축 진행 상태를 부모로 전달 (저장 버튼 활성화 제어용)
  useEffect(() => {
    if (!isCompressing) return;
    onCompressingChange(true);
    return () => onCompressingChange(false);
  }, [isCompressing, onCompressingChange]);

  return (
    <div className="flex w-full flex-col items-start gap-3">
      {index !== 0 && (
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
            onClick={() => onChange(index, 'status', '판매중')}
          />
          <Chip
            variant="state"
            text="종료"
            isSelected={item.status === '종료'}
            onClick={() => onChange(index, 'status', '종료')}
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
          onChange={(value) => onChange(index, 'name', value)}
          placeholder="이름을 입력해주세요"
          maxLength="15"
          error={!!error?.name}
        />
      </div>
      {error?.name && (
        <p className={`${ERROR_TEXT_CLASS} -mt-7 pl-8.5`} style={ERROR_TEXT_STYLE}>
          {error.name}
        </p>
      )}

      {/* 설명 */}
      <TextArea
        label="설명"
        value={item.description}
        onChange={(value) => onChange(index, 'description', value)}
        labelPosition="left"
        placeholder="설명을 입력해주세요"
        maxLength="45"
        error={!!error?.description}
      />
      {error?.description && (
        <p className={`${ERROR_TEXT_CLASS} -mt-7 pl-8.5`} style={ERROR_TEXT_STYLE}>
          {error.description}
        </p>
      )}

      {/* 가격 */}
      <div className="flex w-full items-start self-stretch">
        <h3 className="flex w-9 items-start pr-2 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
          가격
        </h3>
        <Input
          variant="square_white"
          value={item.price}
          onChange={(value) => onPriceChange(index, value)}
          placeholder="가격을 입력해주세요"
          maxLength={priceMaxDigits}
          maxLengthCountMode="digits"
          error={!!error?.price}
        />
      </div>
      {error?.price && (
        <p className={`${ERROR_TEXT_CLASS} -mt-7 pl-8.5`} style={ERROR_TEXT_STYLE}>
          {error.price}
        </p>
      )}

      {/* 사진 */}
      <div className="flex w-full items-end justify-between self-stretch pt-5.5">
        <div className="flex items-start">
          <h2 className="flex w-9 pr-2 text-sm leading-5 font-semibold tracking-normal text-zinc-800">
            사진
          </h2>
          <DetailImageUploader
            image={image}
            onChange={onSelectFile}
            onRemove={() => onRemoveImage(clearImage)}
            isLoading={isCompressing}
          />
        </div>
        <Button variant="bg-pink" size="sm" circle="true" onClick={() => onRemoveItem(index)}>
          삭제
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
