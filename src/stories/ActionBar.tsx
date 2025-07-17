import React, { useState } from 'react';

export const ActionBar: React.FC = () => {
  const [likeCount, setLikeCount] = useState(0);

  return (
    <div className="action-bar">
      <button className="action-btn" title="답글">
        <span role="img" aria-label="reply">💬</span> 답글
      </button>
      <button className="action-btn" title="좋아요" onClick={() => setLikeCount(likeCount + 1)}>
        <span role="img" aria-label="like">👍</span> 좋아요 {likeCount > 0 && <span className="like-count">{likeCount}</span>}
      </button>
      <button className="action-btn" title="신고">
        <span role="img" aria-label="report">🚩</span> 신고
      </button>
    </div>
  );
} 