import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server'
import { ApolloProvider } from '@apollo/react-hooks';
import Router from '../../common/router';
import graphqlClient from '../../graphql/client';

export default function () {
  return function renderPage (req, res) {
    // Redirect to secure url in production
    if (req.config.get('env:env') === 'production' && req.protocol === 'http') {
      res.redirect(`https://${req.headers.host}${req.originalUrl}`);
      return;
    }

    const statsFile = path.join(process.cwd(), './build-static/loadable-stats.json');
    const extractor = new ChunkExtractor({
      statsFile,
      entrypoints: ['client'],
      publicPath: '/',
    });

    const context = {};
    if (context.url) {
      res.redirect(context.url);
      return;
    }

    const application = extractor.collectChunks(
      <StaticRouter location={req.url} context={context}>
        <ApolloProvider client={graphqlClient}>
          <Router />
        </ApolloProvider>
      </StaticRouter>
    );
    const html = ReactDOMServer.renderToString(application);

    res.send(`
      <!DOCTYPE html>
      <html lang="en-US">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" priority="1" />
          <meta name="ie-compat" content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
          <title>${req.config.get('title')}</title>
          ${extractor.getLinkTags()}
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous" />
          ${extractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${html}</div>
          ${extractor.getScriptTags()}
          <script async src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
        </body>
      </html>
    `);
  }
}
