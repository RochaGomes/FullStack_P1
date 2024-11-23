import React from 'react';
import { LaunchProvider } from './LaunchContext'; // Importando o LaunchProvider
import LaunchList from './LaunchList'; // Importando o novo componente LaunchList

function App() {
  return (
    <LaunchProvider> {/* Envolvendo o LaunchList com o LaunchProvider */}
      <LaunchList /> {/* Componente que exibe os lançamentos */}
    </LaunchProvider>
  );
}

export default App;