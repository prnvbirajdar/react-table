import { useEffect, useMemo, useState } from 'react'
import ioc_data from '../data/ioc.json'

// data model
export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  city: string
  registered_at: string
}

export default function useLocalData() {
  const [iocData, setIocData] = useState([])
  
  // memoize the data
  const data: User[] = useMemo(() => iocData, [iocData])

  // load the data
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('iocData')!)

    if (data) {
      setIocData(data)
    }
  }, [])

  // save the data
  useEffect(() => {
    localStorage.setItem('iocData', JSON.stringify(ioc_data))
  }, [])

  return { data }
}
