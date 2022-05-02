import Header from './Header'
import { useAuth } from '../utils/authHelpers';
import Loading from './Loading';
import LoginCard from './LoginCard';

export default function Main() {
  const { status } = useAuth()

  if (status === "loading") { return <Loading /> }

  if (status === "authenticated") { return <Header />}

  return <LoginCard />
}

