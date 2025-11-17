import { CheckCircle, Download, GraduationCap } from "lucide-react";

export const FinishedScreen = ({ recording, onSubmit }) => {
  return (
    <div className="text-center max-w-2xl w-full mx-auto">
      <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        Test Completed!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Well done. You can review your recording below or submit for AI grading.
      </p>

      {/* Audio Player */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left space-y-4 mb-8 shadow-sm">
        <div className="flex items-center justify-between p-3">
          <span className="font-medium text-gray-700">Full Test Recording</span>
          {recording.audioUrl ? (
            <audio src={recording.audioUrl} controls className="h-10" />
          ) : (
            <span className="text-gray-400 text-sm italic">
              No recording found.
            </span>
          )}
          {recording.audioUrl && (
            <a
              href={recording.audioUrl}
              download={`full_speaking_test.webm`}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
              title="Download"
            >
              <Download size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Nút Submit (CĂN GIỮA) */}
      <button
        onClick={onSubmit} // Gọi hàm navigate được truyền từ cha
        disabled={!recording.audioUrl}
        className="w-full max-w-xs !mx-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 !text-white font-semibold px-6 py-4 rounded-lg transition shadow-md hover:shadow-lg disabled:bg-gray-400 cursor-pointer"
      >
        <GraduationCap size={20} />
        Submit for AI Grading
      </button>
    </div>
  );
};