/**
 * ImageModal 컴포넌트
 */

const ImageModal = ({ image, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex cursor-pointer items-center justify-center bg-black/50"
    >
      {/* x 버튼 */}
      <button
        onClick={onClose}
        className="reactive-width absolute top-16 z-50 flex justify-end pr-6"
      >
        <img src="/icons/icon-xmarkwhite.svg" alt="닫기" width="20" height="20" />
      </button>
      <div className="reactive-width relative" onClick={(e) => e.stopPropagation()}>
        {/* 이미지 */}
        <div className="flex w-full cursor-default justify-center">
          <img src={image} className="mx-auto max-h-98 max-w-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
