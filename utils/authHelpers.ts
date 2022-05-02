import { signIn, signOut, useSession} from 'next-auth/react';

const handleSignIn = () => signIn('github');

const handleSignOut = () => signOut();

const useAuth = () => { 
  const { data: session, status } = useSession()

  const userImage = session?.user?.image;

  const userName = session?.user?.name;

  return { 
    userImage,
    userName,
    status,
  }
}

export { handleSignIn, handleSignOut, useAuth };