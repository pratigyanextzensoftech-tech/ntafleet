
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';
import { tableColumns,dummytabledata } from '../Table/Defaultdata';
import RackToRetail from '../../Components/transaction/rackToRetail/RackToRetail';
export const RackToRetailTab = [
  {
    id: '1',
    label:"FJ Rack To Retail Transaction",
    component: <RackToRetail type="flying" btnTitle="Update Rack Transaction"/>,
  },
  {
    id: '2',
    label:"TA-Rack Retail To Retail Transaction",
    component:  <RackToRetail type="ta-petro" btnTitle="Update Rack Transaction"/>,
  },
  
  {
    id: '3',
    label: "ESSO Rack To Retail Transaction",
    component: <RackToRetail type="esso" btnTitle="Update Rack Transaction"/>,
  }
  
  
];
