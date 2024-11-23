import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useLaunches } from './LaunchContext';

const LaunchList = () => {
  const { launches, loading, error } = useLaunches();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');

  // useEffect para validar o searchTerm
  useEffect(() => {
    if (searchTerm && searchTerm.length < 3) {
      setSearchError('O termo de busca deve ter pelo menos 3 caracteres.');
    } else {
      setSearchError('');
    }
  }, [searchTerm]);

  // useMemo para filtrar lançamentos
  const filteredLaunches = useMemo(() => {
    if (!searchTerm || searchTerm.length < 3) {
      return launches; // Retorna todos os lançamentos se não houver um termo válido
    }
    return launches.filter(launch =>
      launch.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, launches]);

  return (
    <Container maxWidth="md" sx={{ paddingTop: 5 }}>
      <Typography variant="h2" color="primary" align="center" gutterBottom>
        <RocketLaunchIcon fontSize="large" sx={{ verticalAlign: 'middle', marginRight: 1 }} />
        SpaceX Launches
      </Typography>

      <TextField
        label="Buscar Lançamentos"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={() => {}}>
        Buscar
      </Button>

      {searchError && <Typography color="error" align="center">{searchError}</Typography>}
      {error && <Typography color="error" align="center">{error}</Typography>}

      {loading ? (
        <Typography variant="h6" align="center">
          Carregando dados...
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredLaunches.map((launch) => (
            <Grid item xs={12} sm={6} md={4} key={launch.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" color="primary" component="div" gutterBottom>
                    {launch.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Data: {new Date(launch.date_utc).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Local: {launch.locationName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {launch.details ? launch.details : "Sem detalhes"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default LaunchList;