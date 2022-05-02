import { format, formatDistance } from 'date-fns';

const initialColumns =  [
  {
    Header: 'ID',
    width: 50,
    accessor: (props: { ID: number }) => props.ID
  },
  {
    Header: 'First_Name',
    width: 130,
    accessor: (props: { First_Name: string }) => props.First_Name
  },
  {
    Header: 'Last_Name',
    accessor: (props: { Last_Name: string }) => props.Last_Name
  },
  {
    Header: 'Full_Name',
    width: 200,
    accessor: (props: { First_Name: string; Last_Name: string; }) => props.First_Name + ' ' + props.Last_Name
  },
  {
    Header: 'Email',
    width: 275,
    accessor: (props: { Email: string }) => props.Email

  },
  {
    Header: 'City',
    accessor: (props: { City: string }) => props.City
  },
  {
    Header: 'Registered_Date',
    width: 175,
    accessor: (props: { Registered_Date: Date; }) => format(new Date(props.Registered_Date), 'dd MMM, yyyy')
  },
  {
    Header: 'DSR',
    accessor: (props: { Registered_Date: Date; }) => formatDistance(new Date(props.Registered_Date), new Date())
  }
]

export default initialColumns;