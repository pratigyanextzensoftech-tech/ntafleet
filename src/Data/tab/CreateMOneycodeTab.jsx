import SingleMOneyCodeForm from '../../Components/createMoneyCode/SingleMOneyCodeForm';
import BulkMOneyCodeForm from '../../Components/createMoneyCode/BulkMoneyCodeForm';
export const CreateMoneyCodeTab = [
  {
    id: '1',
    label: 'Create Single MoneyCode Invoice',
    component: <SingleMOneyCodeForm title="Create  Invoice" btnTtitle="Create  Invoice"/>,
  },
  {
    id: '2',
    label: 'Create Bulk MoneyCode Invoice',
    component: <BulkMOneyCodeForm title="Create MoneyCode Invoice" btnTtitle="Create MoneyCode Invoice"/>,
  },
 
  
];