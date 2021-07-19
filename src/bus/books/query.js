import { ApolloError } from 'apollo-server-express';
import { getBooks, getBookById } from './model/index'
export const queryes = {
    books: () => getBooks(),
    book: (_, { id }) => {
      try {
        return getBookById(id);
      } catch ({message}) {
        throw new ApolloError(message);
      }
      
    },
}