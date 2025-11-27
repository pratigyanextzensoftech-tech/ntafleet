import UltramarPetro from '../../Components/location/petroLink/UltramarPetro';
import PetroLinkForm from '../../Components/location/petroLink/PetroLinkForm';

export const LocPetroLink = [
  {
    id: '1',
    label: 'Esso Petro Link',
    component: <PetroLinkForm title="Esso Petro Link"/>,
  },
  {
    id: '2',
    label: 'Ultramar Petro Link',
    component: <UltramarPetro title="Ultramar Petro Link" />,
  },
];