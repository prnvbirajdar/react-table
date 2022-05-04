/* eslint-disable react/jsx-key */
import { useMemo, useCallback, useState } from 'react'
import initialColumns from './Columns'
import { useTable, useSortBy, useBlockLayout, useColumnOrder } from 'react-table'
import { FixedSizeList } from 'react-window'
import scrollbarWidth from '../utils/scrollbarWidth';
import { ArrowDown, ArrowUp } from '../utils/icons'
import TableLayout from './Layout/TableLayout'
import useLocalData from '../utils/useLocalData'
import TableHeaderLayout from './Layout/TableHeaderLayout'
import { LoadColumnButton, SaveColumnButton } from './SaveColumnButton'

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

  //  drag and drop functionality
  function dragEnterHandler(e, column) {
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

  function dragStartHandler(e, column) {
    setCurrentColumn(column);
  }

  // function to handle infinite scrolling behaviour when rendering rows
  const RenderRow = useCallback(
    ({ index, style }) => {
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

  return (
    <>
      <TableHeaderLayout>
        <SaveColumnButton columnOrder={state.columnOrder} />
        <LoadColumnButton columns={columns} setColumns={setColumns} />
      </TableHeaderLayout>

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
              height={1000}
              itemCount={rows.length}
              itemSize={50}
              width={totalColumnsWidth + scrollBarSize}
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
