// pages/forgot-password.tsx

import { Metadata } from 'next';
import Layout from '../layout'; // Đường dẫn tới file layout.tsx
import ForgotPasswordPage from './page';


export const metadata: Metadata = {
    title: "Login VNA Tech",
    description: "Login Web from user's VNATech",
};

export default function ForgotPassword() {
    return (
        <Layout>
            <ForgotPasswordPage />
        </Layout>
    );
}
