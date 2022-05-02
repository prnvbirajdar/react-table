export default function TableLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex flex-col bg-white rounded-lg">
      <div className="-my-2 -mx-2 sm:-mx-6 lg:-mx-8">
        <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-scroll rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
