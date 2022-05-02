import Nav from '../components/Nav'
import DataTable from './DataTable.jsx'

export default function Header() {
  return (
    <>
      <div className="bg-indigo-700 pb-40 lg:pb-60">
        <Nav />
      </div>

      <main className="-mt-32">
        <div className="max-w-[1400px] mx-auto pb-12 sm:px-6 lg:px-8">
          <div className="bg-indigo-100 rounded-lg shadow px-5 py-6 sm:px-6 ">
            <DataTable />
          </div>
        </div>
      </main>
    </>
  )
}

