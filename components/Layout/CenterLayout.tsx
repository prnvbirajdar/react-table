export default function CenterLayout({ children }: { children: React.ReactNode }) {
  return <main className='bg-white w-full max-h-screen h-screen max-w-md mx-auto flex flex-col justify-center'>
    {children}
  </main>;
}
