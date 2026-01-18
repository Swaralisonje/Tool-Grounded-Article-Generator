import { redirect } from 'next/navigation';

export default function RootPage() {
  // This automatically sends the user to the login page
  redirect('/login');

  // Return null because this part won't be reached
  return null;
}