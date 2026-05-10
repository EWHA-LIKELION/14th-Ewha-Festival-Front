/**
 * ImageModal 컴포넌트
 */

const ImageModal = ({ image, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex cursor-pointer items-center justify-center bg-black/50"
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* x 버튼 */}
        <button onClick={onClose} className="absolute -top-31.5 right-5 z-50 p-2">
          <img src="/icons/icon-xmarkwhite.svg" alt="닫기" width="20" height="20" />
        </button>

        {/* 이미지 */}
        <div className="w-full cursor-default">
          <img src={image} className="reactive-width h-98 object-cover object-center" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
