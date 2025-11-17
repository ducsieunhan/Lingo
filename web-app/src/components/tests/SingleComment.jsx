import { useState } from "react";
import { Avatar, Button, Input } from "antd";
import { DislikeFilled, LikeFilled, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addComment, retrieveCommentsOfTest } from "../../slice/commentSlice";
import { useParams } from "react-router-dom";
const SingleComment = ({
  comment,
  testId,
  testTitle,
  isReply = false,
  currentCommentMode,
  setCurrentCommentMode,
}) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.accounts);

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [replyText, setReplyText] = useState("");
  const { name } = useParams();
  const handleReplySubmit = () => {
    if (!replyText.trim()) return;

    dispatch(
      addComment({
        content: replyText,
        testId,
        testTitle: name,
        replyId: comment.id,
        userId: currentUser?.keycloakId || null,
        commentOwnerId: comment.userId,
        type: "ANSWER",
      })
    ).then(() => {
      setCurrentCommentMode("REPLY");
      setReplyText("");
      setShowReplyInput(false);
      dispatch(retrieveCommentsOfTest(testId));
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={`${isReply ? "ml-12 mt-4" : ""}`} id={`comment-${comment.id}`}>
      <div className="flex space-x-3 gap-1">
        <Avatar
          className={`!bg-${isReply ? "gray" : "red"}-500`}
          icon={<UserOutlined />}
          src={comment.avatar}
        />
        <div className="flex-1">
          {/* Comment Card */}
          <div className="rounded-lg p-4 bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{comment.username || "Guest"}</span>
              <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
            </div>

            <p className="text-gray-700 text-sm mb-3">{comment.content}</p>

            <div className="flex items-center text-xs text-gray-500 gap-2">
              <Button type="text" size="small">
                <LikeFilled /> {comment.likes || 0}
              </Button>

              <Button type="text" size="small">
                <DislikeFilled /> {comment.dislikes || 0}
              </Button>

              <Button type="text" size="small" onClick={() => setShowReplyInput((p) => !p)}>
                Trả lời
              </Button>

              {comment.replies?.length > 0 && (
                <Button type="text" size="small" onClick={() => setShowReplies((p) => !p)}>
                  {showReplies ? "Ẩn" : "Xem"} {comment.replies.length} phản hồi
                </Button>
              )}
            </div>
          </div>

          {/* Reply Input */}
          {showReplyInput && (
            <div className="mt-3 ml-0">
              <Input.TextArea
                rows={2}
                placeholder="Viết phản hồi..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button size="small" onClick={() => setShowReplyInput(false)}>
                  Hủy
                </Button>
                <Button type="primary" size="small" onClick={handleReplySubmit}>
                  Gửi
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showReplies &&
        comment.replies &&
        comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map((reply) => (
              <SingleComment
                key={reply.id}
                comment={reply}
                testId={testId}
                testTitle={testTitle}
                isReply={true}
                currentCommentMode={currentCommentMode}
                setCurrentCommentMode={setCurrentCommentMode}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default SingleComment;