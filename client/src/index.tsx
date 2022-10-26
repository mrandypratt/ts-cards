import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import "./App.css";
import { Feedback } from './components/Feedback';

ReactDOM.render(
  <React.StrictMode>
      <div>
        <App />
        <Feedback/>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);