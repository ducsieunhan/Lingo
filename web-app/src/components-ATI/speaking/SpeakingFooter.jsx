import { ChevronsRight, Mic, Pause } from "lucide-react"

const SpeakingFooter = ({ handleToggleRecordPause, isFinished, recordingStatus, handleNextQuestion, isLastQuestion }) => {
  return (
    <footer className="flex justify-between items-center p-4 border-t border-gray-200">
      <button
        onClick={handleToggleRecordPause}
        disabled={isFinished}
        className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold !text-white transition ${isFinished
          ? "bg-gray-400 cursor-not-allowed"
          : recordingStatus === "recording"
            ? "bg-red-600 hover:bg-red-700 cursor-pointer"
            : "bg-black hover:bg-gray-800 cursor-pointer"
          }`}
      >
        {recordingStatus === "recording" ? (
          <Pause size={18} className="fill-white" />
        ) : (
          <Mic size={18} />
        )}
        {recordingStatus === "recording"
          ? "Pause"
          : recordingStatus === "paused"
            ? "Resume"
            : "Record"}
      </button>

      <div className="text-sm font-medium">
        {recordingStatus === "recording" && (
          <span className="flex items-center gap-2 text-red-600">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            Recording...
          </span>
        )}
        {recordingStatus === "paused" && (
          <span className="text-red-600">On pause</span>
        )}
      </div>

      <button
        onClick={handleNextQuestion}
        disabled={isFinished}
        className={`flex items-center gap-1.5 px-5 py-3 rounded-lg font-semibold !text-white transition ${isFinished
          ? "bg-gray-400 cursor-pointer hover:bg-blue-500 transition ease-out duration-200"
          : "bg-black hover:bg-gray-800 cursor-pointer"
          }`}
      >
        {isLastQuestion ? "Finish" : "Next"}
        <ChevronsRight size={18} />
      </button>
    </footer>
  )
}
export default SpeakingFooter