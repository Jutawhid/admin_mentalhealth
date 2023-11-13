import React, {FC} from 'react'
import {PageTitle} from '../../../_jutemplate/layout/core'
import {DataTable} from './dataTablePage'

const DataTableWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Data-Table</PageTitle>
      <DataTable />
    </>
  )
}

export default DataTableWrapper
