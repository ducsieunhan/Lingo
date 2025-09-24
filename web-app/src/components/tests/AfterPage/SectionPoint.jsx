import { UserOutlined, BookOutlined } from "@ant-design/icons";

const SectionPoint = ({ skill, score, total, percent }) => {
  const isListening = skill.toLowerCase() === "listening";

  const bgColor = isListening ? "bg-blue-50" : "bg-green-50";
  const textColor = isListening ? "text-blue-600" : "text-green-600";
  const Icon = isListening ? UserOutlined : BookOutlined;

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg ${bgColor}`}>
      <div className="flex items-center space-x-4">
        <Icon className={`text-2xl ${textColor}`} />
        <div>
          <h4 className="font-semibold text-gray-800">{skill}</h4>
          <div className={`text-2xl font-bold ${textColor}`}>
            {score}/{total}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-lg font-semibold ${textColor}`}>{percent}%</div>
      </div>
    </div>
  );
};

export default SectionPoint;
