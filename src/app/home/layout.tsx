// pages/forgot-password.tsx

import { Metadata } from 'next';
import Layout from '../layout'; // Đường dẫn tới file layout.tsx
import ForgotPasswordPage from './page';


export const metadata: Metadata = {
    title: "Home VNA Tech",
    description: "Home Page VNATech",
};

export default function ForgotPassword() {
    return (
        <Layout>
            <ForgotPasswordPage />
        </Layout>
    );
}
