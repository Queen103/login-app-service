// app/home/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
    const [isExiting, setIsExiting] = useState(false); // Trạng thái thoát
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<{ email: string; name: string; phone: string } | null>(null);

    useEffect(() => {
        const cookies = document.cookie.split('; ').find(row => row.startsWith('isAuthenticated='));
        const isAuthenticated = cookies ? cookies.split('=')[1] === 'true' : false;

        if (!isAuthenticated) {
            router.push('/'); // Chuyển hướng về trang đăng nhập nếu không xác thực
        } else {
            // Nếu xác thực thành công, thiết lập thông tin người dùng
            setUserInfo({
                email: 'quanh@gmail.com',
                name: 'Chu Quang Anh',
                phone: '0372691660',
            });
        }
    }, [router]);

    const handleLogout = () => {
        document.cookie = "isAuthenticated=false; path=/; max-age=0"; // Xóa cookie
        alert('You have logged out.');
        setIsExiting(true); // Đặt trạng thái thoát trước khi chuyển hướng
        setTimeout(() => {
            router.push('/login'); // Chuyển hướng sau khi thoát
        }, 5000);// Chuyển hướng về trang đăng nhập
    };

    if (!userInfo) {
        return null; // Hoặc hiển thị một loading state
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-orange-500">
            <motion.div
                initial={{ opacity: 1, y: -900 }} // Vị trí ban đầu của form nằm trên đỉnh màn hình
                animate={{ opacity: isExiting ? 1 : 1, y: isExiting ? -800 : 0 }} // Trượt xuống khi xuất hiện và trượt tiếp xuống khi thoát
                exit={{ opacity: 1, y: -800 }} // Trượt xuống dưới khi biến mất
                transition={{ duration: 5 }}>
                <h1 className="text-4xl font-bold text-white mb-4">Welcome, {userInfo.name}!</h1>
            </motion.div>

            <motion.div
                className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md"
                initial={{ opacity: 1, y: 900 }} // Vị trí ban đầu của form nằm trên đỉnh màn hình
                animate={{ opacity: isExiting ? 1 : 1, y: isExiting ? 800 : 0 }} // Trượt xuống khi xuất hiện và trượt tiếp xuống khi thoát
                exit={{ opacity: 1, y: 800 }} // Trượt xuống dưới khi biến mất
                transition={{ duration: 5 }}
            >
                <p className="text-lg mb-2 text-black"><strong>Email:</strong> {userInfo.email}</p>
                <p className="text-lg mb-2 text-black"><strong>Name:</strong> {userInfo.name}</p>
                <p className="text-lg mb-4 text-black"><strong>Phone:</strong> {userInfo.phone}</p>

                <motion.button
                    onClick={handleLogout}
                    className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg transition duration-200 hover:bg-orange-500-400"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Logout
                </motion.button>
            </motion.div>
        </div>
    );
}
