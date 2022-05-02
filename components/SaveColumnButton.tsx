import React from 'react'
import { Toaster } from 'react-hot-toast';
import { handleSave, handleLoad } from '../utils/useLocalData'

function SaveColumnButton({ columnOrder }: { columnOrder: string[] }) {
  return (
    <>
      <button onClick={() => handleSave(columnOrder)} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
        Save
      </button>
      <Toaster />
    </>
  )
}

function LoadColumnButton({ columns, setColumns }: { columns: { Header: string }[], setColumns: ((arg0: any[]) => any) }) {
  return (
    <>
      <button onClick={() => handleLoad(columns, setColumns)} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
        Load
      </button>
      <Toaster />
    </>
  )
}

export { SaveColumnButton, LoadColumnButton }

