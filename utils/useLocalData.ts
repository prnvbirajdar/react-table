import { useEffect, useMemo, useState } from 'react'
import ioc_data from '../data/ioc.json'

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

export type { User }