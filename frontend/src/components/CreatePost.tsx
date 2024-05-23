import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CreatePostProps {
  onPostCreated: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      setError('Please fill out all fields');
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/posts`, { title, content }, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      setTitle('');
      setContent('');
      setError('');
      onPostCreated();
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        console.error('There was an error!', error);
      }
    }
  };

  const handleSignOut = () => {
    auth?.logout();
    navigate('/signin');
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 p-4 ">
      <div className="w-full flex justify-start mb-4">
        <button
          onClick={handleSignOut}
          className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white mb-4">Create Post</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleCreatePost}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-white">
              Title
            </label>
            <input
              type="text"
              id="title"
              className={`w-full px-3 py-2 bg-gray-700 border ${title.trim() !== '' ? 'border-gray-600' : 'border-red-500'} rounded`}
              value={title}
              onChange={handleTitleChange}
            />
            {title.trim() === '' && (
              <p className="text-red-500 mt-1">Title is required</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-white">
              Content
            </label>
            <textarea
              id="content"
              className={`w-full px-3 py-2 bg-gray-700 border ${content.trim() !== '' ? 'border-gray-600' : 'border-red-500'} rounded`}
              value={content}
              onChange={handleContentChange}
            />
            {content.trim() === '' && (
              <p className="text-red-500 mt-1">Content is required</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 ${title.trim() === '' || content.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={title.trim() === '' || content.trim() === ''}
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
