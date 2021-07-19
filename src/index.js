
import { startApolloServer } from './init/server';
import { resolvers } from "./resolvers";
import schema  from './types.graphql';

startApolloServer(schema, resolvers);
