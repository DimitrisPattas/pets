import React from 'react';
import { Stack } from '@mui/material';
import PetCard from '../PetCard/petCard.component';

interface PetListProps {
  pets: any[];
}

const PetList: React.FC<PetListProps> = ({ pets }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 8 }}
    >
      {pets.map((pet, i) => (
        <PetCard pet={pet} key={i}/>
      ))}
    </Stack>
  );
};

export default PetList;
