//query
import { queryes as booksQueries} from './bus/books/query';
import { queries as starshipsQueries } from './bus/starships/queries';
import { queries as usersQueries} from './bus/users/queries';
//mutation

import { mutations as booksMutations } from './bus/books/mutation';
import { mutations as usersMutations } from './bus/users/mutations';
// subs

import { subscriptions as userSubscription } from './bus/users/subscriptions'
import { subscriptions as bookSubscription } from './bus/books/subscriptions'
export const resolvers = {
  
  Query: {
    ...booksQueries,
    ...starshipsQueries,
    ...usersQueries
  },
  Mutation: {
    ...booksMutations,
    ...usersMutations
  },
  Subscription : {
    ...userSubscription,
    ...bookSubscription
  }
};
