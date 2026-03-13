import {useState} from 'react';

function QuizSetup({onStart}){
    
    const [subject, setSubject] = useState("Java");
    const [difficulty, setDifficulty] = useState("Easy");
    const [count, setCount] = useState(5);

    const handleStart = () => {
        onStart({subject, difficulty, count });
    };

    return(
        <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 md:p-10 shadow-2xl border border-gray-700">
                
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#6447f4] to-[#2ba4eb] bg-clip-text text-transparent">
                    Quiz Setup
                </h2>

                {/* Subject Section */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2.5 text-gray-200">
                        Subject
                    </label>
                    <select 
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#6447f4] focus:ring-1 focus:ring-[#6447f4] transition-all duration-200 cursor-pointer hover:border-gray-500"
                    >
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                        <option value="Computer Networks">Computer Networks</option>
                        <option value="SQL">SQL</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="React">React</option>
                        <option value="Spring Boot">Spring Boot</option>
                        <option value="Data Structures">Data Structures</option>
                        <option value="Algorithms">Algorithms</option>
                        <option value="Operating Systems">Operating Systems</option>
                        <option value="General Knowledge">General Knowledge</option>
                        <option value="AutoCAD">AutoCAD</option>

                        <option value="C Programming">C Programming</option>
                        <option value="C++">C++</option>
                        <option value="PHP">PHP</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Swift">Swift</option>
                        <option value="Kotlin">Kotlin</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Go">Go</option>
                        <option value="Rust">Rust</option>
                        <option value="Scala">Scala</option>
                        <option value="Django">Django</option>
                        <option value="Flask">Flask</option>
                        <option value="Node.js">Node.js</option>
                        <option value="Express.js">Express.js</option>
                        <option value="Angular">Angular</option>
                        <option value="Vue.js">Vue.js</option>
                        <option value="Next.js">Next.js</option>
                        <option value="MongoDB">MongoDB</option>
                        <option value="MySQL">MySQL</option>
                        <option value="PostgreSQL">PostgreSQL</option>
                        <option value="Redis">Redis</option>
                        <option value="Docker">Docker</option>
                        <option value="Kubernetes">Kubernetes</option>
                        <option value="AWS">AWS</option>
                        <option value="Azure">Azure</option>
                        <option value="Git">Git</option>
                        <option value="Linux">Linux</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Deep Learning">Deep Learning</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Natural Language Processing">Natural Language Processing</option>
                        <option value="Computer Vision">Computer Vision</option>
                        <option value="Blockchain">Blockchain</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="System Design">System Design</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Mathematics">Mathematics</option>
                    </select>
                </div>

                {/* Difficulty Section */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2.5 text-gray-200">
                        Difficulty
                    </label>
                    <select 
                        value={difficulty} 
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#6447f4] focus:ring-1 focus:ring-[#6447f4] transition-all duration-200 cursor-pointer hover:border-gray-500"
                    >
                        <option>Basic</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>

                {/* Number of Questions Section */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold mb-2.5 text-gray-200">
                        Number of Questions
                    </label>
                    <select 
                        value={count} 
                        onChange={(e) => setCount(e.target.value)}
                        className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#6447f4] focus:ring-1 focus:ring-[#6447f4] transition-all duration-200 cursor-pointer hover:border-gray-500"
                    >
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                    </select>
                </div>

                {/* Start Quiz Button */}
                <button 
                    onClick={handleStart}
                    className="w-full bg-gradient-to-r from-[#6c51f1] to-[#366efd] hover:bg-gradient-to-bl text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6447f4] focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg hover:shadow-xl"
                >
                    ⚡️ Start Quiz
                </button>
            </div>
        </div>
    ); 
}

export default QuizSetup;