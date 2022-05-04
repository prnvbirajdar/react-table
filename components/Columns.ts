import { format, formatDistance } from 'date-fns';

const initialColumns =  [
  {
    Header: 'ID',
    accessor: (props: { ID: number }) => props.ID,
    width: 50,
  },
  {
    Header: 'First_Name',
    accessor: (props: { First_Name: string }) => props.First_Name,
    width: 130
  },
  {
    Header: 'Last_Name',
    accessor: (props: { Last_Name: string }) => props.Last_Name
  },
  {
    Header: 'Full_Name',
    accessor: (props: { First_Name: string; Last_Name: string; }) => props.First_Name + ' ' + props.Last_Name,
    width: 200
  },
  {
    Header: 'Email',
    accessor: (props: { Email: string }) => props.Email,
    width: 275,
  },
  {
    Header: 'City',
    accessor: (props: { City: string }) => props.City
  },
  {
    Header: 'Registered_Date',
    accessor: (props: { Registered_Date: Date; }) => format(new Date(props.Registered_Date), 'dd MMM, yyyy'),
    width: 175
  },
  {
    Header: 'DSR',
    accessor: (props: { Registered_Date: Date; }) => formatDistance(new Date(props.Registered_Date), new Date())
  }
]

export default initialColumns;