function Navbar({onGetStarted}) {
  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="flex items-center self-center text-xl font-['Zen_Dots'] font-bold whitespace-nowrap">
          <span className="bg-gradient-to-r from-[#6447f4] to-[#2ba4eb] bg-clip-text text-transparent whitespace-nowrap">Play</span>
          <span className="text-amber-400 mr-2">Quiz</span>
          <span className="text-[#7B9EF9]">AI</span>
        </span>
        <div  className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button  onClick={onGetStarted} type="button" className="rounded-xl text-white font-bold bg-gradient-to-r from-[#6c51f1] to-[#366efd] hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-300 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;