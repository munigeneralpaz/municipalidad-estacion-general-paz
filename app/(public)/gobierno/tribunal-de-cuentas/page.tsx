'use client';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Skeleton,
  Alert,
} from '@mui/material';
import { Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { useAppSelector } from '@/state/redux/store';
import { getAuthoritiesByCategoryAsync } from '@/state/redux/authorities';
import { useCachedFetch } from '@/hooks';
import { CACHE_TTL } from '@/constants/cache';
import PageHero from '../../components/PageHero';
import AnimatedSection from '../../components/AnimatedSection';

const TribunalPage = () => {
  const { tribunal = [], status } = useAppSelector((state) => state.authorities);

  useCachedFetch({
    selector: (state) => state.authorities.lastFetched,
    dataKey: 'tribunal',
    fetchAction: () => getAuthoritiesByCategoryAsync('tribunal'),
    ttl: CACHE_TTL.AUTHORITIES,
    hasData: tribunal.length > 0,
  });

  const loading = status.getAuthoritiesByCategoryAsync?.loading;
  const error = status.getAuthoritiesByCategoryAsync?.response === 'rejected';

  if (error && !tribunal.length) {
    return (
      <Box>
        <PageHero title="Honorable Tribunal de Cuentas" subtitle="Órgano de control y fiscalización municipal" backgroundImage="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80" overlayColor="rgba(26,95,139,0.88)" overlayColorEnd="rgba(46,134,193,0.72)" />
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <Alert severity="error">
            No se pudo cargar la información. Intente nuevamente más tarde.
          </Alert>
        </Container>
      </Box>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Skeleton variant="text" width="40%" height={60} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mb: 3 }} />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {Array.from(new Array(3)).map((_, index) => (
            <Box key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="circular" width={80} height={80} sx={{ mb: 2 }} />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      <PageHero title="Honorable Tribunal de Cuentas" subtitle="Órgano de control y fiscalización municipal" backgroundImage="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80" overlayColor="rgba(26,95,139,0.88)" overlayColorEnd="rgba(46,134,193,0.72)" />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <AnimatedSection animation="fadeInUp">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Sobre el Tribunal de Cuentas
          </Typography>
          <Typography variant="body1" paragraph>
            El Honorable Tribunal de Cuentas es el órgano encargado de controlar
            y fiscalizar la administración financiera y patrimonial del municipio.
            Tiene la responsabilidad de examinar las cuentas de la gestión
            municipal, verificando la legalidad, regularidad y corrección de los
            actos administrativos.
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 6 }}>
            Su función principal es garantizar la transparencia en el uso de los
            recursos públicos, realizando auditorías y emitiendo dictámenes sobre
            la rendición de cuentas del Departamento Ejecutivo y demás
            organismos municipales.
          </Typography>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={200}>
          {tribunal.length === 0 ? (
            <Alert severity="info">
              La información del Tribunal de Cuentas no está disponible en este
              momento.
            </Alert>
          ) : (
            <>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                Miembros
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                {tribunal.map((authority) => (
                  <Box key={authority.id}>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 3,
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          p: 3,
                        }}
                      >
                        <Avatar
                          src={authority.photo_url}
                          alt={authority.full_name}
                          sx={{
                            width: 100,
                            height: 100,
                            mb: 2,
                            boxShadow: 2,
                          }}
                        />
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ fontWeight: 600 }}
                        >
                          {authority.full_name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary"
                          gutterBottom
                          sx={{ fontWeight: 500 }}
                        >
                          {authority.position}
                        </Typography>

                        {authority.department && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {authority.department}
                          </Typography>
                        )}

                        {(authority.email || authority.phone) && (
                          <Box sx={{ mt: 2, width: '100%' }}>
                            {authority.email && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mb: 0.5,
                                }}
                              >
                                <EmailIcon
                                  sx={{
                                    fontSize: 16,
                                    mr: 0.5,
                                    color: 'text.secondary',
                                  }}
                                />
                                <Typography variant="caption">
                                  <a
                                    href={`mailto:${authority.email}`}
                                    style={{
                                      color: 'inherit',
                                      textDecoration: 'none',
                                    }}
                                  >
                                    {authority.email}
                                  </a>
                                </Typography>
                              </Box>
                            )}
                            {authority.phone && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <PhoneIcon
                                  sx={{
                                    fontSize: 16,
                                    mr: 0.5,
                                    color: 'text.secondary',
                                  }}
                                />
                                <Typography variant="caption">
                                  <a
                                    href={`tel:${authority.phone}`}
                                    style={{
                                      color: 'inherit',
                                      textDecoration: 'none',
                                    }}
                                  >
                                    {authority.phone}
                                  </a>
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </AnimatedSection>
      </Container>
    </Box>
  );
};

export default TribunalPage;
