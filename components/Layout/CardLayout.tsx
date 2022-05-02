export default function CardLayout({ children }: { children: React.ReactNode }) {
  return <main className='sm:w-full bg-indigo-50 py-8 shadow rounded-lg px-5 sm:px-10'>
    {children}
  </main>;
}
