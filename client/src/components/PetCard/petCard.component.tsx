import React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';

interface Pet {
  pet: any;
}

const imageApiUrl = 'http://localhost:8080/api/uploads';

const PetCard: React.FC<Pet> = ({ pet }) => {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        src={pet && pet.images && pet.images.length > 0 ? `${imageApiUrl}/${pet.images[0].imageName}` : `${imageApiUrl}/example.jpg`}
        component="img"
        alt="green iguana"
        height="140"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pet?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pet?.description} 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;
