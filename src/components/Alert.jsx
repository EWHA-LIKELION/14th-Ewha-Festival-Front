/**
 * Alert 컴포넌트 ( variant: delete-삭제(기본), confirm-확인, error-오류)
 */

const Alert = ({
  variant = 'delete',
  title = '',
  text = '',
  confirmLabel = '확인',
  onCancel,
  onConfirm,
}) => {
  const isDelete = variant === 'delete';
  const isError = variant === 'error';

  return (
    <div className="shadow-up-sm z-50 flex w-80 flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6">
      <div
        className={`flex flex-col items-center justify-center gap-2 ${isDelete || isError ? 'p-0' : 'p-4'}`}
      >
        {/* 아이콘은 삭제/오류인 경우만 */}
        {(isDelete || isError) && <img src="/icons/icon-alert.svg" />}

        {/* 타이틀 */}
        <h2 className="mt-0.5 text-center text-lg leading-6 font-semibold tracking-normal text-zinc-800">
          {isDelete ? `${title} 삭제` : title}
        </h2>

        {/* 문구 */}
        <p className="text-center text-sm leading-5 font-normal tracking-normal text-zinc-500">
          {text}
        </p>
      </div>

      <div className="flex w-full gap-3 p-0">
        {!isError && (
          <button
            type="button"
            onClick={onCancel}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-zinc-100 p-3 text-center text-base leading-6 font-medium tracking-normal text-zinc-500"
          >
            취소
          </button>
        )}

        <button
          type="button"
          onClick={onConfirm}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg p-3 text-center text-base leading-6 font-medium tracking-normal ${
            isDelete || isError ? 'bg-red-400 text-white' : 'bg-emerald-600 text-white'
          }`}
        >
          {isDelete ? '삭제' : confirmLabel}
        </button>
      </div>
    </div>
  );
};

export default Alert;
