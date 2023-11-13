import {
  useTable,
  useSortBy,
  Column,
  CellProps,
  usePagination,
} from 'react-table';
import Spinner from './Spinner';
import { useEffect, useState } from 'react';
interface Props {
  columns: Array<Column<object>>;
  data: Array<object>;
}

const DataTable: React.FC<Props> = ({ columns, data }) => {
  const [loading, setLoading] = useState<any>(true);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  );
  const firstPageRows = rows.slice(0, 10);
  //console.log(data.length);
  useEffect(() => {
    if (data.length >= 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table
            {...getTableProps()}
            className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
            <thead>
              {headerGroups.map( (headerGroup) => (
                <tr
                  
                  className="fw-bolder"
                  {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <>
                      <th
                        
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}>
                        {column.render('Header')}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' ↓'
                              : ' ↑'
                            : ''}
                        </span>
                      </th>
                    </>
                  ))}
                </tr>
              ))}
            </thead>
            {/* <Spinner loading={loading} /> */}
            {page.length > 0 ? (
              <>
                <tbody {...getTableBodyProps()}>
                  {page.map((row, i) => {
                    prepareRow(row);
                    // console.log(i)
                    return (
                      <tr className='' {...row.getRowProps()} key={i + 1}>
                        {row.cells.map((cell: any, i: number) => {
                          return (
                            <td {...cell.getCellProps()} key={i + 1}>
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </>
            ) : (
              < div className=' d-flex w-100 justify-content-center mt-8'>
              {loading === false ? (<h6 className='text-danger'>No Data Found</h6>) : (<h6>Loading Data</h6>) }
              </div>
            )}
          </table>
          <br />
          <div className="col-sm-12 d-flex align-items-center justify-content-center justify-content-md-end">
            {/* <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '} */}

            {data.length >= 10 && (
              <>
                <select
                  className="form-select form-select-solid w-auto"
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value));
                  }}>
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option
                      key={pageSize}
                      value={pageSize}
                      className="form-control-sm">
                      Show {pageSize}
                    </option>
                  ))}
                </select>
                <div>
                  <ul className="pagination">
                    <li className="page-item previous">
                      { canPreviousPage && 
                        <button
                          onClick={() => previousPage()}
                          //disabled={!canPreviousPage}
                          className="page-link"
                          >
                          « Previous
                        </button>
                      }
                      {' '}
                    </li>

                      <li className="page-item active">
                        <a className="page-link">{pageIndex + 1}</a>
                      </li>

                      <li className="page-item">
                        <a className="page-link">of {pageOptions.length}</a>
                      </li>
                    
                    <li className="page-item next">
                      { canNextPage &&
                        <button
                          onClick={() => nextPage()}
                          //disabled={!canNextPage}
                          className="page-link"
                          >
                          Next »
                        </button>
                      }
                      {" "}
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
