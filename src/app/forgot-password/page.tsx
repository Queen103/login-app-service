"use client"; // Đánh dấu là Client Component

import { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa'; // Nhập biểu tượng email từ react-icons
import { useRouter } from 'next/navigation'; // Nhập useRouter để chuyển hướng
import { motion } from 'framer-motion'; // Nhập framer-motion

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [isExiting, setIsExiting] = useState(false); // Trạng thái thoát
    const router = useRouter(); // Khởi tạo router

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const registeredEmails = ['test@gmail.com', 'user@gmail.com', 'quanh@gmail.com'];

        if (!email) {
            setEmailError('Email is required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email format');
            return;
        }

        setEmailError('');

        if (registeredEmails.includes(email)) {
            alert('Reset password code has been sent to your email.');
            setIsExiting(true);
            setTimeout(() => {
                router.push('/');
            }, 300);
        } else {
            alert('Email does not exist.');
        }
    };

    return (
        <div className="relative flex justify-center items-center h-screen bg-orange-500">
            <div className="absolute inset-0 bg-opacity-50"></div>
            <motion.form
                onSubmit={handleSubmit}
                className="relative z-50 w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -50 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src="https://vnatech.com.vn/wp-content/uploads/2022/01/Logo.png"
                    alt="Logo"
                    className="mb-6 mx-auto h-20"
                />
                <h2 className="text-3xl font-bold text-orange-500 text-center mb-10 mt-4">RESET PASSWORD</h2>

                <motion.div
                    className={`mb-6 flex items-center border ${emailError ? 'border-red' : 'border-gray-300'} rounded-full overflow-hidden transition-all duration-300`}
                    style={{ padding: '0.5rem 1rem' }}
                    whileHover={{ scale: 1.05 }}
                >
                    <FaEnvelope className="text-orange-500 mr-3 w-5 h-5  text-10xl" /> {/* Adjusted size and margin */}
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border-0 focus:outline-none text-black transition-transform duration-300"
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('This field is required')}
                        onInput={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity('');
                            setEmailError('');
                        }}
                    />
                </motion.div>
                {emailError && <p className="text-red mb-4">{emailError}</p>}

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className={`w-2/3 py-3 text-white font-bold rounded-full mb-10 transition-colors duration-200 ${isHovered ? 'bg-orange-400' : 'bg-orange-500'} ${isActive ? 'scale-95' : 'scale-100'}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onMouseDown={() => setIsActive(true)}
                        onMouseUp={() => setIsActive(false)}
                    >
                        Send Reset Link
                    </button>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => router.push('/')}
                        className="text-orange-500 underline"
                    >
                        Back to Login
                    </button>
                </div>
            </motion.form>
        </div>
    );
}
