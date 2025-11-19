// src/pages/AIAssessmentPage.jsx
// (KHÔNG CẦN THAY ĐỔI FILE NÀY)
import React, { useState } from "react";
import WritingTool from "../../components/ai-tools/WritingTool";
import SpeakingTool from "../../components/ai-tools/SpeakingTool";
import ReadingTool from "../../components/ai-tools/ReadingTool";
import ListeningTool from "../../components/ai-tools/ListeningTool";


const skills = [
  { id: "writing", name: "Writing", icon: "✍️", component: <WritingTool /> },
  { id: "speaking", name: "Speaking", icon: "🗣️", component: <SpeakingTool /> },
  { id: "listening", name: "Listening", icon: "🎧", component: <ListeningTool /> },
  { id: "reading", name: "Reading", icon: "📖", component: <ReadingTool /> },
];

function AIAssessmentPage() {
  const [activeSkill, setActiveSkill] = useState("writing");
  const ActiveTool = skills.find((s) => s.id === activeSkill)?.component;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Thanh Taskbar/Tab */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 border-b border-gray-200 pb-4">
        {skills.map((skill) => (
          <button
            key={skill.id}
            onClick={() => setActiveSkill(skill.id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${activeSkill === skill.id
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            <span>{skill.icon}</span>
            <span>{skill.name}</span>
          </button>
        ))}
      </div>

      {/* Hiển thị Tool (Giờ đây tool sẽ tự động trải rộng) */}
      <div className="mt-8">
        {ActiveTool || <div>Vui lòng chọn một kỹ năng</div>}
      </div>
    </div>
  );
}

export default AIAssessmentPage;