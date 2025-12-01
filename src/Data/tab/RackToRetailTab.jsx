
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';
import { tableColumns,dummytabledata } from '../Table/Defaultdata';
import RackToRetail from '../../Components/transaction/rackToRetail/RackToRetail';

export const RackToRetailTab = [
  {
    id: '1',
    label:"FJ Rack To Retail Transaction",
    component: <RackToRetail company_list="checkbox"  supplier_ids="1" type="flying" btnTitle="Update Rack Transaction" api_name={""}/>,
  },
  {
    id: '2',
    label:"TA-Rack Retail To Retail Transaction",
    component:  <RackToRetail company_list="checkbox" supplier_ids="3" type="ta-petro" btnTitle="Update Rack Transaction" api_name={""}/>,
  },
  
  {
    id: '3',
    label: "ESSO Rack To Retail Transaction",
    component: <RackToRetail company_list="checkbox" supplier_ids="6" type="esso" btnTitle="Update Rack Transaction" api_name={""}/>,
  }
  
  
];
