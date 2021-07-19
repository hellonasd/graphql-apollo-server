import { addBook, removeBook, updateBook, saveBook} from "./model/index";

import { pubSub } from '../../init/pubSub';

import { events } from './events'

export const mutations = {
  addBook: (_, { book }) => {
    const savedBook = saveBook(book);
    pubSub.publish(events.BOOK_ADDED, {
      book : savedBook
    })
    return savedBook
  },
  removeBook: (_, { id }) => {
    return removeBook(id);
  },
  updateBook: (_, { id, book }) => {
    const updatedBook = updateBook(id, book);
    pubSub.publish(events.BOOK_UPDATED, {
      book : updatedBook 
    })
    return updatedBook
  },
};
