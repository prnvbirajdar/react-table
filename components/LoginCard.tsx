import { handleSignIn } from '../utils/authHelpers';
import { Github } from '../utils/icons';
import CardLayout from './Layout/CardLayout';
import CenterLayout from './Layout/CenterLayout';

export default function LoginCard() {
  return (
    <CenterLayout>
      <CardLayout>
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Sign in to your account</h2>

        <button
          onClick={handleSignIn}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in with GitHub
          <Github />
        </button>
      </CardLayout>
    </CenterLayout>
  )
}
