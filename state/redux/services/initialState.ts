import { ServicesSlice } from '@/types';

const initialState: ServicesSlice = {
  services: [],
  servicesByCategory: {
    salud: [],
    cultura: [],
    deporte: [],
    tramites: [],
    educacion: [],
  },
  currentService: null,
  lastFetched: {},
  status: {},
};

export default initialState;
