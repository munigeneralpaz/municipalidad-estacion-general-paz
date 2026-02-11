// ============================================================================
// MENÚS DE NAVEGACIÓN - MUNICIPALIDAD GENERAL PAZ
// ============================================================================

import { PUBLIC_ROUTES, ADMIN_ROUTES } from './routes';

export type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
  icon?: string;
};

// Menú principal del portal público
export const MAIN_MENU: MenuItem[] = [
  {
    label: 'Inicio',
    href: PUBLIC_ROUTES.HOME,
  },
  {
    label: 'Gobierno',
    href: PUBLIC_ROUTES.MUNICIPALIDAD,
    children: [
      {
        label: 'Intendente',
        href: PUBLIC_ROUTES.MUNICIPALIDAD_INTENDENTE,
      },
      {
        label: 'Gabinete Municipal',
        href: PUBLIC_ROUTES.MUNICIPALIDAD_GABINETE,
      },
      {
        label: 'Honorable Concejo Deliberante',
        href: PUBLIC_ROUTES.MUNICIPALIDAD_CONCEJO,
      },
      {
        label: 'Honorable Tribunal de Cuentas',
        href: PUBLIC_ROUTES.MUNICIPALIDAD_TRIBUNAL,
      },
      {
        label: 'Historia de la Ciudad',
        href: PUBLIC_ROUTES.MUNICIPALIDAD_HISTORIA,
      },
      {
        label: 'Transparencia',
        href: PUBLIC_ROUTES.NORMATIVA,
      },
    ],
  },
  {
    label: 'Areas',
    href: PUBLIC_ROUTES.SERVICIOS,
    children: [
      {
        label: 'Salud',
        href: PUBLIC_ROUTES.SERVICIOS_SALUD,
      },
      {
        label: 'Cultura',
        href: PUBLIC_ROUTES.SERVICIOS_CULTURA,
      },
      {
        label: 'Deporte',
        href: PUBLIC_ROUTES.SERVICIOS_DEPORTE,
      },
      {
        label: 'Educación',
        href: PUBLIC_ROUTES.SERVICIOS_EDUCACION,
      },
    ],
  },
  {
    label: 'Trámites',
    href: PUBLIC_ROUTES.SERVICIOS_TRAMITES,
  },
  {
    label: 'Agenda',
    href: PUBLIC_ROUTES.AGENDA,
  },
  {
    label: 'Contacto',
    href: PUBLIC_ROUTES.CONTACTO,
  },
];

// Menú del panel de administración
export const ADMIN_MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    href: ADMIN_ROUTES.ADMIN_DASHBOARD,
    icon: 'Dashboard',
  },
  {
    label: 'Novedades',
    href: ADMIN_ROUTES.ADMIN_NOVEDADES,
    icon: 'Article',
  },
  {
    label: 'Servicios',
    href: ADMIN_ROUTES.ADMIN_SERVICIOS,
    icon: 'MiscellaneousServices',
  },
  {
    label: 'Autoridades',
    href: ADMIN_ROUTES.ADMIN_AUTORIDADES,
    icon: 'People',
  },
  {
    label: 'Normativa',
    href: ADMIN_ROUTES.ADMIN_NORMATIVA,
    icon: 'Gavel',
  },
  {
    label: 'Eventos',
    href: ADMIN_ROUTES.ADMIN_EVENTOS,
    icon: 'Event',
  },
  {
    label: 'Configuración',
    href: ADMIN_ROUTES.ADMIN_CONFIGURACION,
    icon: 'Settings',
  },
];

// Breadcrumbs labels
export const BREADCRUMB_LABELS: Record<string, string> = {
  '/': 'Inicio',
  '/gobierno': 'Gobierno',
  '/gobierno/intendente': 'Intendente',
  '/gobierno/gabinete': 'Gabinete Municipal',
  '/gobierno/concejo': 'Honorable Concejo Deliberante',
  '/gobierno/tribunal-de-cuentas': 'Honorable Tribunal de Cuentas',
  '/gobierno/historia': 'Historia',
  '/novedades': 'Novedades',
  '/areas': 'Areas',
  '/areas/salud': 'Salud',
  '/areas/cultura': 'Cultura',
  '/areas/deporte': 'Deporte',
  '/tramites': 'Trámites',
  '/areas/educacion': 'Educación',
  '/normativa': 'Transparencia',
  '/contacto': 'Contacto',
  '/admin': 'Dashboard',
  '/admin/novedades': 'Novedades',
  '/admin/novedades/nueva': 'Nueva Novedad',
  '/admin/servicios': 'Servicios',
  '/admin/servicios/nuevo': 'Nuevo Servicio',
  '/admin/autoridades': 'Autoridades',
  '/admin/autoridades/nueva': 'Nueva Autoridad',
  '/admin/normativa': 'Normativa',
  '/admin/normativa/nueva': 'Nueva Ordenanza',
  '/admin/eventos': 'Eventos',
  '/admin/eventos/nuevo': 'Nuevo Evento',
  '/agenda': 'Agenda',
  '/admin/configuracion': 'Configuración',
};
