import SingleMOneyCodeForm from '../../Components/createMoneyCode/SingleMOneyCodeForm';
import BulkMOneyCodeForm from '../../Components/createMoneyCode/BulkMoneyCodeForm';
import ManageMacroForm from '../../Components/manageMacro/ManageMacroForm';
import PrimaryMenu from '../../Components/setting/manageMenu/PrimaryMenu'
import SecondaryMenu from '../../Components/setting/manageMenu/SecondaryMenu'

export const ManageMenuTab = [
  {
    id: '1',
    label: 'Primary Menu',
    component: <PrimaryMenu title="Upload US Transaction" btnTtitle="Upload US Transaction"/>,
  },
  {
    id: '2',
    label: 'Secondary Menu',
    component: <SecondaryMenu title="Upload US Transaction" btnTtitle="Upload US Transaction"/>,
  },
];