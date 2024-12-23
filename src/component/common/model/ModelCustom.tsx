const ModelCustom = ({
  isOpen,
  onClose,
  children,
  isShowHeader = true,
  className,
}: any) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className={
          className
            ? className
            : "bg-white rounded-lg shadow-lg px-[2%] py-[2%] w-full max-w-sm mx-4 md:mx-0 md:w-1/2 md:max-h-[90%] lg:max-h-[90%] xl:max-h-[90%] xl:lg:min-w-[90%] md:min-w-[90%] lg:min-w-[90%]"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        {isShowHeader && (
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-sm font-semibold text-pink_main pb-[4px]">
              Yêu cầu tạo mới giải pháp
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 text-2xl hover:text-gray-600"
            >
              &times;
            </button>
          </div>
        )}
        {/* Modal Body */}
        <div className="mt-4 overflow-y-auto scroll">{children}</div>
        {/* 
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ModelCustom;
