import React from 'react';
import { useGetPetsQuery } from '../../service/pet.service';
import { Box, CircularProgress, Typography } from '@mui/material';
import PetList from '../PetList/petsList.component';

const Pets = () => {
  const { data, error, isFetching } = useGetPetsQuery({});

  if (isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems={'center'}
        minHeight={'80vh'}
      >
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No pets have inserted.
          <br />
        </Typography>
      </Box>
    );
  }

  if (error) {
    return <>An error has occured.</>;
  }

  return (
    <div style={{marginTop: "50px"}}>
      <PetList pets={data}/>
    </div>
  );
};

export default Pets;
