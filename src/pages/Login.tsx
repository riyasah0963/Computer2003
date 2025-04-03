import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const { login, register, resetPasswordWithMobile } = useAuth(); // New function for mobile-based reset
  const [isLogin, setIsLogin] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false); // New state for Forgot Password mode
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
    mobile: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isResetMode) {
      // Handle password reset with mobile number
      if (!formData.mobile) {
        setError('Please enter your mobile number');
        return;
      }

      setIsResetting(true);
      setResetMessage('');
      setError('');

      resetPasswordWithMobile(formData.mobile)
        .then((success) => {
          if (success) {
            setResetMessage('OTP sent to your mobile. Verify to reset password.');
          } else {
            setError('Mobile number not registered.');
          }
        })
        .catch(() => setError('An error occurred. Try again later.'))
        .finally(() => setIsResetting(false));

      return;
    }

    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.repassword) {
        setError('All fields are required');
        return;
      }
      if (formData.password !== formData.repassword) {
        setError('Passwords do not match');
        return;
      }

      const success = register(formData.name, formData.email, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Email already exists');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {isResetMode ? 'Reset Password' : isLogin ? 'Login' : 'Create Account'}
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}
        {resetMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
            {resetMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isResetMode ? (
            // Reset password with mobile number
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          ) : (
            <>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Re-enter Password</label>
                  <input
                    type="password"
                    value={formData.repassword}
                    onChange={(e) => setFormData({ ...formData, repassword: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            {isResetMode ? 'Send OTP' : isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        {isLogin && !isResetMode && (
          <div className="mt-2 text-center">
            <button
              onClick={() => setIsResetMode(true)}
              className="text-red-600 hover:text-red-700"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          {!isResetMode ? (
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setResetMessage('');
                setFormData({ name: '', email: '', password: '', repassword: '', mobile: '' });
              }}
              className="text-green-600 hover:text-green-700"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
            </button>
          ) : (
            <button
              onClick={() => setIsResetMode(false)}
              className="text-green-600 hover:text-green-700"
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}