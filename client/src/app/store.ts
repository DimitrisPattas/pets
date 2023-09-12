import { configureStore } from '@reduxjs/toolkit';

import { petApi } from '../service/pet.service';

export default configureStore({
  reducer: {
    [petApi.reducerPath]: petApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petApi.middleware),
});
