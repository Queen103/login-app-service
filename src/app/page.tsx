"use client"; // Đánh dấu là Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa'; // Nhập biểu tượng người dùng và khóa từ react-icons
import { motion } from 'framer-motion'; // Nhập framer-motion

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isExiting, setIsExiting] = useState(false); // Trạng thái thoát
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === '') {
      alert('Username is required');
      return;
    }
    if (password === '') {
      alert('Password is required');
      return;
    }

    if (username !== 'quanh') {
      alert('User does not exist');
      return;
    }
    if (password !== '123') {
      alert('Incorrect password');
      return;
    } else {
      alert('Login successful');
      document.cookie = "isAuthenticated=true; path=/; max-age=3600"; // Cookie có hiệu lực 1 giờ

      router.push('/home'); // Chuyển hướng đến trang /home
    }
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the form from submitting
    setIsExiting(true); // Start exit animation
    setTimeout(() => {
      router.push('/forgot-password'); // Redirect to forgot-password page
    }, 300); // Time to complete the exit animation
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-orange-500">
      <div className="absolute inset-0 bg-opacity-50"></div>
      <motion.form
        onSubmit={handleSubmit}
        className="relative z-50 w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }} // Vị trí ban đầu của form
        animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -50 : 0 }} // Vị trí và độ mờ khi form xuất hiện hoặc thoát
        transition={{ duration: 0.5 }} // Thời gian cho hiệu ứng
      >
        <img
          src="https://vnatech.com.vn/wp-content/uploads/2022/01/Logo.png"
          alt="Logo"
          className="mb-6 mx-auto h-20"
        />
        <h2 className="text-4xl font-bold text-orange-500 text-center mb-10 mt-4">Welcome!</h2>

        {/* Các trường nhập và nút bấm */}
        <div className="mb-6 flex items-center border border-gray-300 rounded-full overflow-hidden transition-transform hover:scale-105">
          <FaUser className="w-6 h-6 text-orange-500 mx-2" /> {/* Biểu tượng màu cam */}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
            className="w-full px-4 py-3 border-0 focus:outline-none text-black"
          />
        </div>

        <div className="mb-6 flex items-center border border-gray-300 rounded-full overflow-hidden transition-transform hover:scale-105">
          <FaLock className="w-6 h-6 text-orange-500 mx-2" /> {/* Biểu tượng màu cam */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
            className="w-full px-4 py-3 border-0 focus:outline-none text-black"
          />
        </div>

        <div className="flex justify-end mt-8 mb-8 text-sm text-orange-500">
          <button
            onClick={handleForgotPassword}
            className="hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-2/3 py-3 text-white font-bold rounded-full mb-10 transition-transform ${isHovered ? 'bg-orange-400' : 'bg-orange-500'} ${isActive ? 'scale-95' : 'scale-100'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
          >
            Login
          </button>
        </div>
      </motion.form>
    </div>
  );
}
