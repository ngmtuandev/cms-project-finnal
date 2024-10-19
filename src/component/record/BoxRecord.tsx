const BoxRecord = ({ children }: any) => {
  return (
    <div
      className="w-[100%] border-b-4 border-l-[1px] border-l-gray-200 border-r-[1px] border-r-gray-200 
    border-t-[1px] border-t-gray-200 border-pink_main py-[20px] h-[60%] "
    >
      <div className=" flex justify-center items-center text-center">
        {children}
      </div>
    </div>
  );
};

export default BoxRecord;
