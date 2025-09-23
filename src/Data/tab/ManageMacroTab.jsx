import SingleMOneyCodeForm from '../../Components/createMoneyCode/SingleMOneyCodeForm';
import BulkMOneyCodeForm from '../../Components/createMoneyCode/BulkMoneyCodeForm';
export const ManageMacroTab = [
  {
    id: '1',
    label: ' Upload US Transaction',
    component: <SingleMOneyCodeForm title="Upload US Transaction" btnTtitle="Upload US Transaction"/>,
  },
  {
    id: '2',
    label: 'Upload Canada Transaction',
    component: <BulkMOneyCodeForm title="Upload Canada Transaction" btnTtitle="Upload Canada Transaction"/>,
  },
 {
    id: '3',
    label: 'Upload ESSP FTP Transaction',
    component: <BulkMOneyCodeForm title="Upload ESSP FTP Transaction" btnTtitle="Upload ESSP FTP Transaction"/>,
  }
  
];