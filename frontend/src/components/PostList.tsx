import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

interface Post {
  _id: string;
  title: string;
  content: string;
  userId: string;
  timestamp: Date;
}

interface PostListProps {
  refresh: number;
}

const PostList: React.FC<PostListProps> = ({ refresh }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const auth = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      fetchPosts();
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/posts`, {
          id: editingPost._id,
          title: editTitle,
          content: editContent,
        }, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setEditingPost(null);
        setEditTitle('');
        setEditContent('');
        fetchPosts();
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [auth, refresh]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl text-white mb-4">Your Posts</h2>
        {editingPost && (
          <form onSubmit={handleUpdatePost} className="mb-4">
            <h3 className="text-xl text-white mb-2">Edit Post</h3>
            <div className="mb-4">
              <label className="block text-white">Title:</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={`w-full px-3 py-2 bg-gray-700 border ${editTitle.trim() !== '' ? 'border-gray-600' : 'border-red-500'} rounded`}
              />
              {editTitle.trim() === '' && (
                <p className="text-red-500 mt-1">Title is required</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-white">Content:</label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className={`w-full px-3 py-2 bg-gray-700 border ${editContent.trim() !== '' ? 'border-gray-600' : 'border-red-500'} rounded`}
              />
              {editContent.trim() === '' && (
                <p className="text-red-500 mt-1">Content is required</p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 ${editTitle.trim() === '' || editContent.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={editTitle.trim() === '' || editContent.trim() === ''}
              >
                Update Post
              </button>
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {posts.map((post) => (
          <div key={post._id} className="mb-4 p-4 bg-gray-700 rounded-lg shadow">
            <h3 className="text-xl text-white">{post.title}</h3>
            <p className="text-gray-300">{post.content}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEditPost(post)}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post._id)}
                className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
