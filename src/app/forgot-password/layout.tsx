// pages/forgot-password.tsx

import { Metadata } from 'next';
import Layout from '../layout'; // Đường dẫn tới file layout.tsx
import ForgotPasswordPage from './page';


export const metadata: Metadata = {
    title: "Forgot Password VNA Tech",
    description: "Send link for reset password to Gmail",
};

export default function ForgotPassword() {
    return (
        <Layout>
            <ForgotPasswordPage />
        </Layout>
    );
}
