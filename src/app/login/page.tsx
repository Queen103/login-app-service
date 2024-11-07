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

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
            setIsExiting(true);
            setTimeout(() => {
                router.push('/home'); // Redirect to forgot-password page
            }, 6000); // Chuyển hướng đến trang /home
        }
    };

    const handleForgotPassword = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsExiting(true); // Start exit animation
        setTimeout(() => {
            router.push('/forgot-password'); // Redirect to forgot-password page
        }, 6000); // Time to complete the exit animation
    };

    return (
        <div className="outer-container"> {/* Thêm thẻ div ngoài cùng */}
            <div className="relative flex justify-center items-center h-screen bg-orange-400 overflow-hidden">
                <div className="absolute inset-0 bg-opacity-50"></div>
                <motion.form
                    onSubmit={handleSubmit}
                    className="relative z-50 w-full max-w-md p-8 bg-white rounded-[50px] shadow-lg"
                    initial={{ opacity: 1, y: 800 }} // Vị trí ban đầu của form nằm trên đỉnh màn hình
                    animate={{ opacity: isExiting ? 1 : 1, y: isExiting ? -800 : 0 }} // Trượt xuống khi xuất hiện và trượt tiếp xuống khi thoát
                    exit={{ opacity: 1, y: -800 }} // Trượt xuống dưới khi biến mất
                    transition={{ duration: 6.0, ease: 'linear' }}

                >
                    <img
                        src="https://vnatech.com.vn/wp-content/uploads/2022/01/Logo.png"
                        alt="Logo"
                        className="mb-6 mx-auto h-20"
                    />
                    <h2 className="text-4xl font-bold text-orange-400 text-center mb-10 mt-4">Welcome!</h2>

                    {/* Các trường nhập và nút bấm */}
                    <div className="mb-6 flex items-center border border-gray-400 rounded-[50px] overflow-hidden transition-transform hover:scale-105">
                        <FaUser className="w-6 h-6 text-orange-400 ml-4" /> {/* Biểu tượng màu cam */}
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

                    <div className="mb-6 flex items-center border border-gray-400 rounded-[50px] overflow-hidden transition-transform hover:scale-105">
                        <FaLock className="w-6 h-6 text-orange-400 ml-4" /> {/* Biểu tượng màu cam */}
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

                    <div className="flex justify-end mt-8 mb-8 text-sm text-orange-400">
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
                            className={`w-2/3 py-3 text-white font-bold rounded-[50px] mb-10 transition-transform ${isHovered ? 'bg-orange-400' : 'bg-orange-400'} ${isActive ? 'scale-95' : 'scale-100'}`}
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
        </div>
    );
}
