import { useEffect, useMemo, useState } from 'react'
import ioc_data from '../data/ioc.json'
import { columnSaved, columnLoaded } from './toastHelpers'

// data model
type User = {
  ID: number
  First_Name: string
  Last_Name: string
  Email: string
  City: string
  Registered_Date: string
}

export default function useLocalData() {
  // memoize the data
  const data = useMemo(() => ioc_data, [])

  const [iocData, setIocData] = useState(data as User[])

  // save the data
  useEffect(() => {
    localStorage.setItem('iocData', JSON.stringify(iocData))
  }, [iocData])

  // load the data
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('iocData')!)

    if (data) {
      setIocData(data)
    }
  }, [])

  return { data }
}

// saves column order to localStorage
const handleSave = (columnOrder: string[]) => {
  columnSaved()
  localStorage.setItem('columnOrder', JSON.stringify(columnOrder))
}

// loads columnOrder from localStorage
const handleLoad = (cols: { Header: string }[], colsFunc: ((arg0: any[]) => any)) => {
  const data = JSON.parse(localStorage.getItem('columnOrder')!)

  // function compares the saved column order to the current column order
  function sortFunc(a: { Header: string }, b: { Header: string }) {
    var sortingArr = data
    return sortingArr.indexOf(a.Header) - sortingArr.indexOf(b.Header);
  }

  const newCol = cols.sort(sortFunc);

  if (data) {
    columnLoaded()
    return colsFunc([...newCol])
  }
}

export { handleSave, handleLoad }

export type { User }