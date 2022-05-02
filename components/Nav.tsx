import Image from 'next/image'
import { handleSignOut, useAuth } from '../utils/authHelpers';
import { Github } from '../utils/icons';

export default function Nav() {
  const { userName, userImage } = useAuth()

  return (
    <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8">
      <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
        <div className='flex space-x-4'>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
          />
        </div>
        <div className='flex space-x-4'>
          <a className='self-center text-white' target="_blank" href='https://github.com/prnvbirajdar/react-table' rel="noreferrer">          
            <Github />
          </a>

          <p className='text-white self-center pr-2'>
            {userName}
          </p>

          <Image
            src={userImage as string}
            alt="Landscape picture"
            width={36}
            height={32}
            className="rounded-full"
          />

          <button onClick={handleSignOut} className=' text-indigo-100 rounded-md py-2 px-4 text-sm font-medium hover:bg-indigo-900 hover:bg-opacity-75'>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
