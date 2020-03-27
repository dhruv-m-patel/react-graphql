import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Router from '../common/router';
import graphqlClient from '../graphql/client';
console.log('graphqlClient: ', graphqlClient);

export default function renderApp() {
  const supportsHistory = 'pushState' in window.history;

  ReactDOM.hydrate(
    <BrowserRouter forceRefresh={!supportsHistory}>
      <ApolloProvider client={graphqlClient}>
        <Router />
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root'),
  );
}
