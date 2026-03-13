import { useState, useEffect } from 'react';

const TypingAnimation = () => {
  const lines = [
    "AI-powered quizzes tailored to your level",
    "One platform. Java, Python, SQL & 50+ subjects.",
    "Start practicing Java, Python, SQL and 50+ subjects today"
  ];

  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentLine = lines[currentLineIndex];
    const typingSpeed = 70; // Typing speed (ms per character)
    const deletingSpeed = 50; // Deleting speed (ms per character)
    const pauseTime = 2000; // Pause before deleting (ms)

    let timer;

    if (!isDeleting && displayedText === currentLine) {
      // Pause before starting to delete
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === '') {
      // Move to next line
      setIsDeleting(false);
      setCurrentLineIndex((prevIndex) => (prevIndex + 1) % lines.length);
    } else if (!isDeleting) {
      // Typing effect
      timer = setTimeout(() => {
        setDisplayedText(currentLine.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else {
      // Deleting effect
      timer = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, deletingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, currentLineIndex, isDeleting, lines]);

  return (
    <div className="text-2xl md:text-3xl lg:text-4xl flex items-center justify-center px-4 py-2 md:py-3 whitespace-pre-wrap break-words max-w-full">
      <span className="text-center leading-relaxed">{displayedText}</span>
      <span className="animate-pulse ml-1">|</span>
    </div>
  );
};

function Landing({ onGetStarted }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white overflow-x-hidden font-sans">
      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 md:py-12 lg:py-16">
        {/* Powered by Grok AI Badge */}
        <div className="mb-6 md:mb-8">
          <button type="button" className="text-body bg-neutral-primary border border-default hover:bg-neutral-secondary-soft font-medium leading-5 rounded-xl text-sm px-6 py-1.5 focus:outline-none transition-all duration-200">
            ⚡️ Powered by Grok AI
          </button>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-['Zen_Dots'] font-bold text-white leading-tight">
            Master Any Skill with US
          </h1>
        </div>

        {/* Typing Animation */}
        <div className="mb-8 md:mb-10">
          <div className="bg-gradient-to-r from-[#6447f4] to-[#2ba4eb] bg-clip-text text-transparent font-['Zen_Dots']">
            <TypingAnimation />
          </div>
        </div>

        {/* Start Quiz Button */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-xl text-white font-bold bg-gradient-to-r from-[#6c51f1] to-[#366efd] hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-300 font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-3.5 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            ⚡️ Start Quiz Now
          </button>
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-6xl px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-0">
            {/* Unique Questions */}
            <div className="flex flex-col items-center justify-center border-b border-gray-600 lg:border-b-0 lg:border-r pb-6 lg:pb-0 lg:pr-8    bg-gradient-to-r from-[#6447f4] to-[#2ba4eb] bg-clip-text text-transparent whitespace-nowrap">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3">∞</div>
              <div className="text-gray-300 text-xs md:text-sm lg:text-base text-center font-medium">Unique Questions</div>
            </div>

            {/* Subjects */}
            <div className="flex flex-col items-center justify-center border-b border-gray-600 lg:border-b-0 lg:border-r pb-6 lg:pb-0 lg:pr-8     bg-gradient-to-r from-[#6447f4] to-[#2ba4eb] bg-clip-text text-transparent whitespace-nowrap">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3">50+</div>
              <div className="text-gray-300 text-xs md:text-sm lg:text-base text-center font-medium">Subjects</div>
            </div>

            {/* Difficulty Levels */}
            <div className="flex flex-col items-center justify-center border-b border-gray-600 lg:border-b-0 lg:border-r pb-6 lg:pb-0 lg:pr-8     bg-gradient-to-r from-[#6447f4] to-[#2ba4eb] bg-clip-text text-transparent whitespace-nowrap">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3">4</div>
              <div className="text-gray-300 text-xs md:text-sm lg:text-base text-center font-medium">Difficulty Levels</div>
            </div>

            {/* Free to Use */}
            <div className="flex flex-col items-center justify-center border-b border-gray-600 md:border-none pb-6 lg:pb-0 lg:pr-8     bg-gradient-to-r from-[#6447f4] to-[#2ba4eb] bg-clip-text text-transparent whitespace-nowrap">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3">100%</div>
              <div className="text-gray-300 text-xs md:text-sm lg:text-base text-center font-medium">Free to Use</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;