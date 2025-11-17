import { Lightbulb, X } from "lucide-react"
import { Link } from "react-router-dom"

const SpeakingHeader = ({ isFinished, TOTAL_QUESTIONS, currentQuestionIndex, totalElapsedTime, formatTime, handleClose }) => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200">
      <Link to="/" className="text-xl font-bold text-gray-800">
        Lexi<span className="text-blue-600">Prep</span>
      </Link>
      <div className="flex items-center gap-4">
        <button className="cursor-pointer flex items-center gap-1.5 text-sm font-medium bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200">
          <Lightbulb size={16} className="text-yellow-500" />
          Tips & Tricks
        </button>
        <div className="text-right text-sm">
          <span className="font-semibold">
            Total: {isFinished ? TOTAL_QUESTIONS : currentQuestionIndex + 1} /{" "}
            {TOTAL_QUESTIONS}
          </span>
          <span className="ml-4 font-mono text-gray-700">
            {formatTime(totalElapsedTime)}
          </span>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <X size={24} />
        </button>
      </div>
    </header>
  )
}
export default SpeakingHeader