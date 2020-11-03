import { useTable, usePagination, useSortBy, useFilters, useGroupBy, useExpanded, useRowSelect, useGlobalFilter } from 'react-table'
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Button, Badge, Card, CardHeader, CardBody, Pagination, CardFooter, PaginationItem, PaginationLink,
  Container, Row, Col, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle,
} from "reactstrap";
import PaginationContainer from "./PaginationContainer.jsx";

export default function Table({columns, data, rowInfo, changeHandler}) {
    const filterTypes = React.useMemo(
        () => ({
          // Or, override the default text filter to use
          // "startWith"
          text: (rows, id, filterValue) => {
            return rows.filter(row => {
              const rowValue = row.values[id]
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
          },
        }),
        []
      )
      const defaultColumn = React.useMemo(
        () => ({
          Filter: DefaultColumnFilter,
        }),
        []
      )

    const {getTableProps, getTableBodyProps, headerGroups, rows, page, canPreviousPage,
           canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, prepareRow,
           state: { pageIndex, pageSize }, visibleColumns, preGlobalFilteredRows,
           setGlobalFilter} = useTable({columns, data,  initialState: { pageIndex: 0, hiddenColumns: ['id'] }, defaultColumn, filterTypes,},
           useFilters, useGlobalFilter, usePagination)
  
    useMemo(() => changeHandler(rows), [rows]);

    // Render Data Table UI
    return (
        <div>
      <table {...getTableProps()} className="align-items-center table-flush hover-table table">
        <thead className="thead-light"> 
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} scope="col">
              {headerGroup
                .headers
                .map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} >
        {
        page.map(
          (row, i) =>
            prepareRow(row) || (
              <tr {...row.getRowProps({onClick: () => rowInfo(row)} )} >
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
        )}
      </tbody>
      </table>
      <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination className="pagination justify-content-end mb-0" >
                    <PaginationContainer func={() => previousPage()} disabled={!canPreviousPage} icon="fa-angle-left" text="Previous"/>
                        <span style={{verticalAlign: 'middle'}}>
                        Page{' '}
                        <strong>
                        {pageIndex + 1}</strong> of {pageOptions.length}
                        </span>
                        <PaginationContainer func={() => nextPage()} disabled={!canNextPage}icon="fa-angle-right" text="Next"/>
                    </Pagination>
                  </nav>
                </CardFooter>
      </div>
    )

  }

  export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter, filteredRows },
    }) {
    
    return (
        <input className="form-control-alternative form-control"
        value={filterValue || ''}
        onChange={e => {
            setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            
        }}
        placeholder={`Search`}
        />
      )
    }