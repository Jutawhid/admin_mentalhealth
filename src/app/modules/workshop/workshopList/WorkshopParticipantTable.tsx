import React from 'react';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../../_jutemplate/helpers';
import DataTable from '../../../../_jutemplate/dataTable/DataTable';


interface TableProps {
    participantData : any[]
  
}
export const WorkshopParticipantTable: React.FC<TableProps> = ({
    participantData
}) => {
  //const store = useSelector((state: any) => state)
  //const { user } = store.auth as any

  // React.useEffect(() => {
  //     // set data
  //   }, [user])

  const columns = React.useMemo(
    () => [
     
      {
        Header: 'Name',
        accessor: 'name',
        disableSortBy: false,
      },

      {
        Header:'Email',
        accessor: 'email',
        disableSortBy: false,
      },
      {
        Header:'Generated Ticket Id',
        accessor: 'generated_ticket_id',
        disableSortBy: false,
      },

      {
        Header: 'Number Of Tickets',
        accessor: 'number_of_tickets',
        disableSortBy: false,
      },
      {
        Header: 'Price',
        accessor: 'price',
        disableSortBy: false,
      },
      {
        Header: 'Vat Percent',
        accessor: 'vat_percent',
        disableSortBy: false,
      },
      {
        Header: 'Vat Amount',
        accessor: 'vat_amount',
        disableSortBy: false,
      },

      {
        Header: 'Sub Total',
        accessor: 'sub_total',
        disableSortBy: false,
      },
      {
        Header: 'Total',
        accessor: 'total',
        disableSortBy: false,
      },

      
      
    ],
    [participantData]
  )

  return <DataTable columns={columns} data={participantData} />
}