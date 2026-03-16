import {useEffect, useState, useRef} from 'react'

const timer_in_seconds = 30; // ✅ Change this to set timer duration

function Quiz({config, onFinish}){
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState(timer_in_seconds); // ✅ Timer state
    const hasFetched = useRef(false);
    const scoreRef = useRef(0); // ✅ Ref to track real-time score

    useEffect(() => {
        if(hasFetched.current) return;
        hasFetched.current = true;

        fetch(`https://playquiz-backend-eahngva0akhxcsdd.centralindia-01.azurewebsites.net/api/quiz/generate?topic=${config.subject}&difficulty=${config.difficulty}&count=${config.count}`)
            .then(res => {
                if(!res.ok) throw new Error("Failed to fetch questions");
                return res.json();
            })
            .then(data => {
                setQuestions(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load questions. Please try again.");
                setLoading(false);
            });
    }, []);

    // ✅ Timer effect — runs every second
    useEffect(() => {
        if(loading || selectedOption !== null) return; // Pause if loading or answered

        if(timeLeft === 0){
            handleNext(true); // Auto-advance when timer hits 0
            return;
        }

        const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearTimeout(timer); // Cleanup on unmount
    }, [timeLeft, loading, selectedOption]);

    // ✅ Reset timer when question changes
    useEffect(() => {
        setTimeLeft(timer_in_seconds);
    }, [currentIndex]);

    // ✅ Loading spinner
    if(loading){
        return(
            <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-600 border-t-purple-500 rounded-full animate-spin"></div>
                <p className="mt-6 text-lg text-gray-300 font-medium">
                    Pleas Wait...
                </p>
            </div>
        );
    }

    if(error){
        return(
            <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 flex items-center justify-center p-4">
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center border border-gray-700">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">{error}</h2>
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full bg-gradient-to-r from-[#6c51f1] to-[#366efd] hover:bg-gradient-to-bl text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    const handleOptionClick = (index) => {
        if(selectedOption !== null) return;
        setSelectedOption(index);
        if(index === currentQuestion.correctAnswer){
            scoreRef.current += 1;  // ✅ Update ref immediately (no async issue)
            setScore(scoreRef.current);
        }
    };

    // ✅ timedOut param tells us if called by timer (no answer selected)
    const handleNext = (timedOut = false) => {
        const isLastQuestion = currentIndex === questions.length - 1;

        if(isLastQuestion){
            onFinish(scoreRef.current, questions.length); // ✅ Use ref for accurate score
        } else {
            setSelectedOption(null);
            setCurrentIndex(prev => prev + 1);
        }
    };

    // ✅ Timer color changes based on urgency
    const timerColor = timeLeft > 10 ? "green" : timeLeft > 5 ? "orange" : "red";

    return(
        <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white flex items-center justify-center p-4 py-8">
            <div className="w-full max-w-2xl bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-gray-700">
                
                {/* Header with question count and timer */}
                <div className="flex justify-between items-center mb-8 gap-4">
                    <div className="text-sm md:text-base font-semibold text-gray-300">
                        Question <span className="text-white font-bold">{currentIndex + 1}</span> of <span className="text-white font-bold">{questions.length}</span>
                    </div>

                    {/* Timer display */}
                    <div className={`flex items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 font-bold text-xl md:text-2xl transition-all duration-300 ${
                        timeLeft > 10 ? 'bg-green-500 bg-opacity-20 text-white border-2 border-green-500' :
                        timeLeft > 5 ? 'bg-yellow-500 bg-opacity-20 text-white border-2 border-yellow-500' :
                        'bg-red-500 bg-opacity-20 text-white border-2 border-red-500 animate-pulse'
                    }`}>
                        {timeLeft}
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-8 overflow-hidden">
                    <div 
                        className="bg-gray-500 h-full transition-all duration-300"
                        style={{width: `${((currentIndex + 1) / questions.length) * 100}%`}}
                    ></div>
                </div>

                {/* Question */}
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white leading-relaxed">
                    {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-3 mb-8">
                    {currentQuestion.options?.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(index)}
                            disabled={selectedOption !== null}
                            className={`w-full p-4 text-left rounded-lg font-medium transition-all duration-300 border-2 text-base md:text-lg ${
                                selectedOption === null 
                                    ? 'bg-gray-700 bg-opacity-50 border-gray-600 hover:border-gray-500 hover:bg-gray-700 cursor-pointer'
                                    : index === currentQuestion.correctAnswer
                                        ? 'bg-green-500 bg-opacity-30 border-green-500 text-green-300'
                                        : index === selectedOption
                                            ? 'bg-red-500 bg-opacity-30 border-red-500 text-red-300'
                                            : 'bg-gray-700 bg-opacity-30 border-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <span className="flex items-center gap-3">
                                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                    selectedOption === null 
                                        ? 'border-gray-500'
                                        : index === currentQuestion.correctAnswer
                                            ? 'border-green-500 bg-green-500'
                                            : index === selectedOption
                                                ? 'border-red-500 bg-red-500'
                                                : 'border-gray-600'
                                }`}>
                                    {selectedOption !== null && (
                                        index === currentQuestion.correctAnswer ? (
                                            <span className="text-white text-sm">✓</span>
                                        ) : index === selectedOption ? (
                                            <span className="text-white text-sm">✗</span>
                                        ) : null
                                    )}
                                </span>
                                {option}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Feedback Messages */}
                {selectedOption === null && timeLeft === 0 && (
                    <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border-l-4 border-red-500 rounded">
                        <p className="text-red-300 font-semibold">Time's Up!</p>
                    </div>
                )}


                {/* Next/Finish Button */}
                <button
                    disabled={selectedOption === null && timeLeft > 0}
                    onClick={() => handleNext(false)}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-base transition-all duration-300 transform ${
                        selectedOption === null && timeLeft > 0
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                            : 'bg-gradient-to-r from-[#6c51f1] to-[#366efd] text-white hover:bg-gradient-to-bl hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl'
                    }`}
                >
                    {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </button>
            </div>
        </div>
    );
}

export default Quiz;