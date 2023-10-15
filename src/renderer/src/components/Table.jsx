import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce } from 'react-table'

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  }, useGlobalFilter, useSortBy)

  return (
    <div className="flex flex-col">
      <div className="overflow-x-scroll overflow-y-hidden">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table {...getTableProps()} className="table-auto w-full">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-2">
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="border px-4 py-2">
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Table
