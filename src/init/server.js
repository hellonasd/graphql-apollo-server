import { ApolloServer } from "apollo-server-express";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT, sessionOptions, corsOptions } from "./config";
import { api as starshipsAPI } from "../bus/starships/dataSource";

//middleware
import { readToken } from "./readToken";

//subs
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

export async function startApolloServer(typeDefs, resolvers) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const app = express();
  app.use(cookieParser());
  app.use(session(sessionOptions));
  app.use(cors(corsOptions));

  app.use(readToken);
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    dataSources: () => {
      return {
        starshipsAPI,
      };
    },
    context: ({ req, res }) => {
      return {
        req,
        res,
        session: req.session,
      };
    },
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
  });
  await server.start();

  server.applyMiddleware({ app, cors: false });
  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create(
    {
      // This is the `schema` we just created.
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // This `server` is the instance returned from `new ApolloServer`.
      path: server.graphqlPath,
    }
  );

  // Shut down in the case of interrupt and termination signals
  // We expect to handle this more cleanly in the future. See (#5074)[https://github.com/apollographql/apollo-server/issues/5074] for reference.
  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, () => subscriptionServer.close());
  });
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`subscription ready at ws://localhost:${PORT}${server.graphqlPath}`);
  });
}
