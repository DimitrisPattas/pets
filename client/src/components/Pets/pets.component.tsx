import React from 'react';
import { useGetPetsQuery } from '../../service/pet.service';
import { Box, CircularProgress, Typography } from '@mui/material';

const Pets = () => {
  const { data, error, isFetching } = useGetPetsQuery({});

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems={"center"} minHeight={"80vh"}>
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
    return (<>An error has occured.</>);
  }

  return (<div>Pets</div>);
};

export default Pets;
