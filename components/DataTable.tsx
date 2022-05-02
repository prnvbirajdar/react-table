/* eslint-disable react/jsx-key */
import { useMemo, useCallback, useState, useEffect, DragEvent, SetStateAction } from 'react'
import initialColumns from './Columns'
import { useTable, useSortBy, useBlockLayout, useColumnOrder, HeaderGroup } from 'react-table'
import { FixedSizeList } from 'react-window'
import scrollbarWidth from '../utils/scrollbarWidth';
import { ArrowDown, ArrowUp } from '../utils/icons'
import TableLayout from './Layout/TableLayout'
import useLocalData from '../utils/useLocalData'
import { User } from '../utils/useLocalData'

const DataTable = () => {
  // get data from localStorage
  const { data } = useLocalData()

  // memoize initial columns 
  const memoColumns = useMemo(() => initialColumns, [])
  const [columns, setColumns] = useState(memoColumns)

  // keep track of the column order while dragging
  const [currentColumn, setCurrentColumn] = useState(null);

  const scrollBarSize = useMemo(() => scrollbarWidth(), [])

  // setting width of table
  const defaultColumn = useMemo(
    () => ({
      minWidth: 60,
      width: 150,
      maxWidth: 400
    }),
    []
  )

  // hooks from react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    setColumnOrder,
    totalColumnsWidth,
    prepareRow,
    visibleColumns
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useBlockLayout,
    useSortBy,
    useColumnOrder
  )


  console.log(state);

  //  drag and drop functionality
  function dragEnterHandler(e: DragEvent<HTMLElement>, column: HeaderGroup<User> | null) {
    e.preventDefault();
    if (column === currentColumn) return;
    const arr = [...visibleColumns.map((d) => d.id)];
    const currentIndex = arr.indexOf(currentColumn.id);
    arr.splice(currentIndex, 1);
    const dropIndex = arr.indexOf(column.id);
    if (currentIndex > dropIndex) arr.splice(dropIndex, 0, currentColumn.id);
    else arr.splice(dropIndex + 1, 0, currentColumn.id);
    setColumnOrder(arr);
  }

  function dragStartHandler(e: DragEvent<HTMLElement>, column: HeaderGroup<User> | SetStateAction<null>) {
    setCurrentColumn(column);
  }

  // function to handle infinite scrolling behaviour when rendering rows
  const RenderRow = useCallback(
    ({ index, style }: { index: number }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <div
          {...row.getRowProps({
            style
          })} className="divide-x divide-gray-200"
        >
          {row.cells.map(cell => {
            return (
              <div {...cell.getCellProps()} className="whitespace-nowrap p-4 text-center text-sm text-gray-700">
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows]
  )

  // loads columnOrder from localStorage
  const handleLoad = () => {
    const data = JSON.parse(localStorage.getItem('columnOrder')!)

    // function compares the saved column order to the current column order
    function sortFunc(a: { Header: string }, b: { Header: string }) {
      var sortingArr = data
      return sortingArr.indexOf(a.Header) - sortingArr.indexOf(b.Header);
    }

    const newCol = columns.sort(sortFunc);

    if (data) {
      return setColumns([...newCol])
    }
  }

  // saves column order to localStorage
  const handleSave = () => localStorage.setItem('columnOrder', JSON.stringify(state.columnOrder))

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl self-center lg:text-3xl font-bold text-indigo-800">Dashboard</h1>

        <div className='space-x-4'>
          <button onClick={handleSave} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Save
          </button>
          <button onClick={handleLoad} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Load
          </button>
        </div>
      </div>

      <TableLayout>
        <div {...getTableProps()} className="min-w-full divide-y">
          {headerGroups.map(headerGroup => (
            <div className='divide-x divide-gray-400' {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps(column.getSortByToggleProps())} className="bg-indigo-600 px-4 py-4 text-center self-center text-sm font-semibold text-white">
                  <div
                    className="flex items-center justify-center"
                    draggable={true}
                    onDragEnter={(e) => dragEnterHandler(e, column)}
                    onDragStart={(e) => dragStartHandler(e, column)}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? <ArrowUp /> : <ArrowDown />) : ''}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div {...getTableBodyProps()} className="divide-y divide-gray-200 bg-white">
            <FixedSizeList
              height={500}
              itemCount={rows.length}
              itemSize={50}
              width={totalColumnsWidth + scrollBarSize!}
            >
              {RenderRow}
            </FixedSizeList>
          </div>
        </div>
      </TableLayout>
    </>
  )
}

export default DataTable;
