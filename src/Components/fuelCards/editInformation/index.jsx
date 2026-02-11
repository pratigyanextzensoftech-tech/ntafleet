import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import { Container } from 'reactstrap'
import { useLocation } from 'react-router'
const Index = () => {
     const { state } = useLocation();
     const rowData = state?.data;
     console.log(rowData);
     
  return (
    <Fragment>
        <Breadcrumbs parent="Fuel Card" title="Fuel Card Information " />
        <Container fluid={true}>
            <table className='table-responsive border'>
                <tr>
                    <th>Heading</th>
                    <th>Before</th>
                    <th>After</th>
                </tr>
                  <tr>
                    <th>CardNumber</th>
                    <th>{rowData?.card_no}</th>
                    <th>-</th>
                </tr>
                <tr>
                    <th>Company</th>
                    <th>{rowData.company_name}</th>
                    <th>-</th>
                </tr>
                <tr>
                    <th>Pollicy Number</th>
                    <th>{rowData.policy}</th>
                    <th>-</th>
                </tr>
                <tr>
                    <th>Unit Number</th>
                    <th>{rowData.unit_number}</th>
                    <th>-</th>
                </tr>
                <tr>
                    <th>Pin Number</th>
                    <th>{rowData.pin_number}</th>
                    <th>-</th>
                </tr>
                <tr>
                    <th>Driver Name</th>
                    <th>{rowData.driver_name}</th>
                    <th>-</th>
                </tr>
                <tr>
                    <th>Driver  Mobile1 </th>
                    <th>{rowData.d_mobile1}</th>
                    <th>-</th>
                </tr>
                <tr>
                    <th>Driver  Mobile2</th>
                    <th>{rowData.d_mobile2}</th>
                    <th>-</th>
                </tr>
                  <tr>
                    <th>Card Status</th>
                    <th>{rowData.status}</th>
                    <th>-</th>
                </tr>
            </table>
        </Container>
      </Fragment>
  )
}
export default Index
