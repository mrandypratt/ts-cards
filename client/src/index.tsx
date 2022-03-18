import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import "./App.css";
import Container from '@mui/material/Container';

ReactDOM.render(
  <React.StrictMode>
    <Container maxWidth="sm">
      <div>
        <App />
      </div>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);