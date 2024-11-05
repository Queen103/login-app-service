// page.tsx
import { redirect } from 'next/navigation';

const Page = () => {
  // Redirect to the /login page
  redirect('/login');

  return null; // This component will not render anything since it's a redirect
};

export default Page;
