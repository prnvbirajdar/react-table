export default function TableHeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl self-center lg:text-3xl font-bold text-indigo-800">Dashboard</h1>

      <div className='space-x-4'>
        {children}
      </div>
    </div>
  )
}
