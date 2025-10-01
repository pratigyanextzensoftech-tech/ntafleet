import SingleMOneyCodeForm from '../../Components/createMoneyCode/SingleMOneyCodeForm';
import BulkMOneyCodeForm from '../../Components/createMoneyCode/BulkMoneyCodeForm';
import ManageMacroForm from '../../Components/manageMacro/ManageMacroForm';
import PrimaryMenu from '../../Components/setting/manageMenu/PrimaryMenu'
import SecondaryMenu from '../../Components/setting/manageMenu/SecondaryMenu'
import UltramarPetro from '../../Components/location/petroLink/UltramarPetro';
import PetroLinkForm from '../../Components/location/petroLink/PetroLinkForm';

export const LocPetroLink = [
  {
    id: '1',
    label: 'Esso Petro Link',
    component: <PetroLinkForm />,
  },
  {
    id: '2',
    label: 'Ultramar Petro Link',
    component: <UltramarPetro/>,
  },
];