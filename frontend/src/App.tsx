import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PostPage from './components/PostPage';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <PostPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = React.useContext(AuthContext);
  return auth?.token ? <>{children}</> : <Navigate to="/login" />;
};

export default App;
