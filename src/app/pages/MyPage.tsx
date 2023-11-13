import React from 'react'
import {PageTitle} from '../../_jutemplate/layout/core'
import {
  TablesWidget14,
} from '../../_jutemplate/partials/widgets'

export function MyPage() {
  return (
    <>
     <PageTitle breadcrumbs={[]}>All User</PageTitle>
      <TablesWidget14 className='mb-5 mb-xl-8' />
    </>
  )
}
