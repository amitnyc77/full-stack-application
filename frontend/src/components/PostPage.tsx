import React, { useState, useCallback } from 'react';
import PostList from './PostList';
import CreatePost from './CreatePost';

const PostPage: React.FC = () => {
  const [refresh, setRefresh] = useState(0);

  const handlePostCreated = useCallback(() => {
    setRefresh((prev) => prev + 1);
  }, []);

  return (
    <div>
      <CreatePost onPostCreated={handlePostCreated} />
      <PostList refresh={refresh} />
    </div>
  );
};

export default PostPage;
