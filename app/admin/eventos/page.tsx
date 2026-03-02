'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  CircularProgress,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/state/redux/store';
import { getEventsAsync, deleteEventAsync } from '@/state/redux/events';
import { ADMIN_ROUTES, EVENT_CATEGORIES } from '@/constants';
import { Event } from '@/types';

const EventosListPage = () => {
  const dispatch = useAppDispatch();
  const { events, status } = useAppSelector((state) => state.events);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesSearch = !search || ev.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || ev.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [events, search, categoryFilter]);

  useEffect(() => {
    dispatch(getEventsAsync({ page: 1, limit: 50 }));
  }, [dispatch]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, ev: Event) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(ev);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEvent) return;
    setDeleteLoading(true);
    try {
      const result = await dispatch(deleteEventAsync(selectedEvent.id));
      if (result.meta.requestStatus === 'fulfilled') {
        setDeleteDialogOpen(false);
        setSelectedEvent(null);
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    return EVENT_CATEGORIES.find((c) => c.value === category)?.label || category;
  };

  const getCategoryColor = (category: string): 'primary' | 'secondary' | 'warning' | 'info' | 'success' => {
    const colors: Record<string, 'primary' | 'secondary' | 'warning' | 'info' | 'success'> = {
      cultural: 'secondary',
      deportivo: 'warning',
      institucional: 'primary',
      educativo: 'info',
      social: 'success',
    };
    return colors[category] || 'primary';
  };

  const formatDate = (date: string) => {
    return new Date(date + 'T00:00:00').toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const isUpcoming = (event: Event) => {
    const endOrStart = event.end_date || event.event_date;
    return new Date(endOrStart + 'T23:59:59') >= new Date();
  };

  const loading = status.getEventsAsync?.loading;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Eventos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          href={ADMIN_ROUTES.ADMIN_EVENTOS_NUEVO}
        >
          Nuevo Evento
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          size="small"
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, maxWidth: 400 }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={categoryFilter}
            label="Categoría"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="all">Todas</MenuItem>
            {EVENT_CATEGORIES.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Título</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Fecha</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Categoría</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Visible</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Estado</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }} align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array.from(new Array(5)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton /></TableCell>
                      <TableCell><Skeleton width={100} /></TableCell>
                      <TableCell><Skeleton width={80} /></TableCell>
                      <TableCell><Skeleton width={60} /></TableCell>
                      <TableCell><Skeleton width={80} /></TableCell>
                      <TableCell><Skeleton width={40} /></TableCell>
                    </TableRow>
                  ))
                : filteredEvents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary">No se encontraron eventos</Typography>
                      </TableCell>
                    </TableRow>
                  )
                : filteredEvents.map((ev) => (
                    <TableRow key={ev.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {ev.title}
                        </Typography>
                        {ev.location && (
                          <Typography variant="caption" color="text.secondary">
                            {ev.location}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(ev.event_date)}
                          {ev.end_date && ev.end_date !== ev.event_date && (
                            <> — {formatDate(ev.end_date)}</>
                          )}
                        </Typography>
                        {ev.event_time && (
                          <Typography variant="caption" color="text.secondary">
                            {ev.event_time} hs
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getCategoryLabel(ev.category)}
                          size="small"
                          color={getCategoryColor(ev.category)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={ev.is_active ? 'Activo' : 'Inactivo'}
                          size="small"
                          color={ev.is_active ? 'success' : 'default'}
                          variant={ev.is_active ? 'filled' : 'outlined'}
                        />
                      </TableCell>
                      <TableCell>
                        {isUpcoming(ev) ? (
                          <Chip label="Próximo" size="small" color="info" variant="outlined" />
                        ) : (
                          <Chip label="Finalizado" size="small" color="default" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={(e) => handleMenuOpen(e, ev)}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem
          component={Link}
          href={ADMIN_ROUTES.ADMIN_EVENTOS_EDITAR(selectedEvent?.id || '')}
          onClick={handleMenuClose}
        >
          <EditIcon sx={{ mr: 1 }} fontSize="small" />
          Editar
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
          Eliminar
        </MenuItem>
      </Menu>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro que deseas eliminar el evento "{selectedEvent?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleteLoading}>Cancelar</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleteLoading}
            startIcon={deleteLoading ? <CircularProgress size={20} /> : undefined}
          >
            {deleteLoading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventosListPage;
