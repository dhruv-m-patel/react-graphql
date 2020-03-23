import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from '../common/router';

export default function renderApp() {
  const supportsHistory = 'pushState' in window.history;

  ReactDOM.hydrate(
    <BrowserRouter forceRefresh={!supportsHistory}>
      <Router />
    </BrowserRouter>,
    document.getElementById('root'),
  );
}
