import {
  LocalHospital as LocalHospitalIcon,
  TheaterComedy as TheaterComedyIcon,
  Construction as ConstructionIcon,
  School as SchoolIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import { PUBLIC_ROUTES } from './routes';

export const SERVICES = [
  {
    title: 'Salud',
    icon: LocalHospitalIcon,
    description: 'Accede a Área de salud municipal',
    href: PUBLIC_ROUTES.SERVICIOS_SALUD,
    color: '#2E86C1',
    image: '/pages-hero/salud-hero.webp',
  },
  {
    title: 'Cultura y Deporte',
    icon: TheaterComedyIcon,
    description: 'Eventos, actividades culturales y deportivas',
    href: PUBLIC_ROUTES.SERVICIOS_CULTURA,
    color: '#B52A1C',
    image: '/pages-hero/cultura-y-deporte-hero.webp',
  },
  {
    title: 'Obra e infraestructura',
    icon: ConstructionIcon,
    description: 'Obras e infraestructura municipal',
    href: PUBLIC_ROUTES.SERVICIOS_OBRAS,
    color: '#F5A623',
    image: '/pages-hero/obra-e-infraestructura-hero.webp',
  },
  {
    title: 'Educación',
    icon: SchoolIcon,
    description: 'Programas educativos municipales',
    href: PUBLIC_ROUTES.SERVICIOS_EDUCACION,
    color: '#1A5F8B',
    image: '/pages-hero/educacion-hero.webp',
  },
  {
    title: 'Registro Civil',
    icon: BadgeIcon,
    description: 'Trámites y servicios del Registro Civil',
    href: PUBLIC_ROUTES.SERVICIOS_REGISTRO,
    color: '#2E7D32',
    image: '/pages-hero/registro-civil-hero.webp',
  },
] as const;
