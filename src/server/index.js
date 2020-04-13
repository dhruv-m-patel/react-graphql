import ExpressApp from 'express-app';
import { ApolloServer } from 'apollo-server-express';
import { connectMysqlDb } from '../lib/clients/mysql'
import { connectPostgresDb } from '../lib/clients/postgres'
import typeDefs from '../graphql/server/typeDefs';
import resolvers from '../graphql/server/resolvers';
import { models, db } from '../graphql/server/models';

async function startApp() {
  const expressApp = new ExpressApp();

  // Configure ApolloServer to run GraphQL queries
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context() {
      return { models, db }
    },
  });
  apolloServer.applyMiddleware({
    app: expressApp.app,
    path: '/graphql',
  });

  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const compiler = webpack(require('../../webpack.config.js'));
    expressApp.app.use(require('webpack-dev-middleware')(compiler, {
      stats: { colors: true },
    }));
    expressApp.app.use(require('webpack-hot-middleware')(compiler));
  }

  expressApp.start().then(() => {
    // Add db support for mysql/postgres if necessary
    const dbType = expressApp.config.get('db:dbType');
    if (['mysql', 'pg'].includes(dbType)) {
      const connectDb = dbType === 'mysql' ? connectMysqlDb : connectPostgresDb;
      connectDb()
        .then((database) => {
          expressApp.app.db = database;
          console.log(`${dbType === 'mysql' ? 'MySQL' : 'Postgres'} database connected...`);
        })
        .catch((err) => {
          console.log(`Error connecting to database: ${err.message}`, err.stack);
        });
    }

    console.log('App has started...');
  });
}

startApp();
