'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Backdrop,
  Snackbar,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/state/redux/store';
import { loginAsync, clearAuthStatus } from '@/state/redux/auth';
import { ADMIN_ROUTES } from '@/constants';
import { LoginCredentials } from '@/types';
import { useRateLimit } from '@/hooks/useRateLimit';

const schema = yup.object({
  email: yup
    .string()
    .email('Ingresa un email válido')
    .required('El email es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

const getErrorMessage = (message?: string): string => {
  if (!message) return 'Error al iniciar sesión. Verifica tus credenciales.';
  const lower = message.toLowerCase();
  if (lower.includes('invalid login credentials') || lower.includes('invalid_credentials'))
    return 'Email o contraseña incorrectos.';
  if (lower.includes('email not confirmed'))
    return 'El email no ha sido confirmado. Revisá tu bandeja de entrada.';
  if (lower.includes('too many requests') || lower.includes('rate limit'))
    return 'Demasiados intentos. Esperá unos minutos antes de reintentar.';
  if (lower.includes('network') || lower.includes('fetch'))
    return 'Error de conexión. Verificá tu conexión a internet.';
  if (lower.includes('user not found'))
    return 'No existe una cuenta con ese email.';
  if (lower.includes('email') && lower.includes('required'))
    return 'El email es requerido.';
  if (lower.includes('password') && lower.includes('required'))
    return 'La contraseña es requerida.';
  return message;
};

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { isAuthenticated, status } = useAppSelector((state) => state.auth);

  const redirectTo = searchParams.get('redirect') || ADMIN_ROUTES.ADMIN_DASHBOARD;

  const [showPassword, setShowPassword] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const { isLocked, remainingSeconds, attemptsLeft, registerAttempt, reset } = useRateLimit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(schema),
  });

  const loading = status.loginAsync?.loading;
  const error = status.loginAsync?.response === 'rejected';
  const errorMessage = status.loginAsync?.message;

  useEffect(() => {
    if (isAuthenticated) {
      reset();
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, reset, redirectTo]);

  useEffect(() => {
    if (error) {
      setSnackOpen(true);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthStatus('loginAsync'));
    };
  }, [dispatch]);

  const onSubmit = (data: LoginCredentials) => {
    if (!registerAttempt()) return;
    dispatch(loginAsync(data));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        backgroundImage: 'linear-gradient(135deg, #1A5F8B 0%, #2E86C1 50%, #5DA9D9 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            animation: 'scrollFadeInUp 0.6s ease-out',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Image
                src="/logo.webp"
                alt="Escudo Estación General Paz"
                width={80}
                height={96}
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
              Panel de Administración
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center', mt: 1 }}
            >
              Municipalidad de Estación General Paz
            </Typography>
          </Box>

          {/* Lockout Alert */}
          {isLocked && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              Demasiados intentos fallidos. Intenta nuevamente en {remainingSeconds} segundos.
            </Alert>
          )}

          {/* Error Alert */}
          {error && !isLocked && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {getErrorMessage(errorMessage)}
              {attemptsLeft > 0 && attemptsLeft < 3 && (
                <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                  {attemptsLeft} {attemptsLeft === 1 ? 'intento restante' : 'intentos restantes'}
                </Typography>
              )}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register('email')}
              label="Correo electrónico"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading || isLocked}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="admin@ejemplo.com"
            />

            <TextField
              {...register('password')}
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading || isLocked}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Ingresá tu contraseña"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || isLocked}
              sx={{ mt: 3, py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isLocked ? (
                `Bloqueado (${remainingSeconds}s)`
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </Box>

          {/* Footer */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', textAlign: 'center', mt: 4 }}
          >
            Acceso restringido a personal autorizado
          </Typography>
        </Paper>
      </Container>

      {/* Loading Backdrop */}
      <Backdrop
        open={!!loading}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: '#fff',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" size={48} />
        <Typography variant="body1" color="inherit">
          Iniciando sesión...
        </Typography>
      </Backdrop>

      {/* Error Snackbar */}
      <Snackbar
        open={snackOpen && !!error}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {getErrorMessage(errorMessage)}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
