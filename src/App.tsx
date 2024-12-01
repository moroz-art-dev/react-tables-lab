import React from 'react';
import TableClient from './components/Table/TableClient';
import TableInfinite from './components/Table/TableInfinite';
import './App.css';

function App() {
  return (
    <>
      <h2>AG Grid Table - Client Module</h2>
      <TableClient />
      <h2>AG Grid Table - Infinite Module</h2>
      <TableInfinite />
    </>
  );
}

export default App;
