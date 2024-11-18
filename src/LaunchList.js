import React, { useState } from 'react';
import { useLaunches } from './LaunchContext';
import { Container, Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const LaunchList = () => {
  const { launches, loading, error } = useLaunches();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Lógica de busca já implementada anteriormente
  };

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
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>

      {error && <Typography color="error" align="center">{error}</Typography>}

      {loading ? (
        <Typography variant="h6" align="center">
          Carregando dados...
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {launches.map((launch) => (
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