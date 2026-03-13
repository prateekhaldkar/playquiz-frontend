function Result({score, total, onRestart}){
    
    const percentage = (score/total) * 100;

    const getExpression = () => {
        if(percentage < 25) return "😞";
        if(percentage < 50) return "😐";
        if(percentage < 75) return "🙂";
        return "🎉"
    }

    const getExpression1 = () => {
        if(percentage < 25) return " Better luck next time!";
        if(percentage < 50) return " Keep practicing!";
        if(percentage < 75) return " Good job, almost there!";
        return "Excellent! You nailed it!";
    }
    
    return(
        <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-gray-400 flex flex-col items-center justify-center px-4 py-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Quiz Finished
            </h2>
            
            <div className="border-gray-400 w-75 border-3 rounded-4xl md:w-150">
            </div>
            
            <div className="py-20 flex flex-col items-center">
                <div className="text-7xl">
                    {getExpression()}
                </div>
                <div className="text-2xl">
                    {getExpression1()}
                </div>
            </div>
            
            <p className="text-2xl md:text-3xl mb-8">
                Your Score: <span className="text-purple-400 font-semibold">{score}</span> / <span className="text-purple-400 font-semibold">{total}</span>
            </p>

            <button
                onClick={onRestart}
                className="bg-gradient-to-r from-[#6c51f1] to-[#366efd] hover:bg-gradient-to-bl text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
                Restart Quiz
            </button>
        </div>
    );
}

export default Result;