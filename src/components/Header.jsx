const Header = (props) => {
  return (
    <div className="w-full ">
      <div className="flex-1 rounded-lg flex flex-col justify-center items-end p-1   text-2xl font-bold text-right shadow-lg h-24">
        {/* Expression with Vertical Scroll (Without Scrollbar) */}
        <div className="text-gray-800 dark:text-white text-xl overflow-y-auto w-full max-h-20 px-2 scrollbar-none">
          {props.expression || "0"}
        </div>
        {/* Result */}
        <div className="text-gray-800 dark:text-white text-3xl flex items-center gap-3 mt-1">
          <span className="text-gray-500 dark:text-gray-300">=</span>
          {props.result}
        </div>
      </div>
    </div>
  );
};

export default Header;
