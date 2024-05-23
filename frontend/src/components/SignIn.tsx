import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(newEmail));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailValid || password.length < 8) {
      setError('Invalid email or password');
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, { email, password });
      auth?.login(response.data.token);
      navigate('/posts');
    } catch (error) {
      setError('Failed to sign in');
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white mb-4">Sign In</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-3 py-2 bg-gray-700 border ${emailValid ? 'border-gray-600' : 'border-red-500'} rounded`}
              value={email}
              onChange={handleEmailChange}
            />
            {!emailValid && (
              <p className="text-red-500 mt-1">Please enter a valid email address</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              value={password}
              onChange={handlePasswordChange}
            />
            {password.length > 0 && password.length < 8 && (
              <p className="text-red-500 mt-1">Password must be at least 8 characters</p>
            )}
            <p className="text-gray-400 mt-2"><a href="/signup">Sign up</a></p>
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 ${!emailValid || password.length < 8 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!emailValid || password.length < 8}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
