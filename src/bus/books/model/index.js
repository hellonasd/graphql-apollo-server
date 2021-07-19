import { v4 } from 'uuid';
import { booksDB } from './db'
export const getBooks = () => {
    const books = [];

    booksDB.forEach((value, key) => {
        const currentBook = {
            id : key,
            ...value
        }
        books.push(currentBook);
    });
    return books
};


export const getBookById = (id) => {
    if(!booksDB.get(id)){
      throw new Error(`we dont have a book with id : ${id}`)
    }
    return {id, ...booksDB.get(id)}
}

export const saveBook = (book) => {
    const id = v4();
    booksDB.set(id, book);
    const savedBook = booksDB.get(id);
    return {id, ...savedBook}
}

export const removeBook = (id) => {
    const expectedBook = booksDB.get(id);
    booksDB.delete(id);
    return {
        id,
        ...expectedBook
    }
}

export const updateBook = (id, receivedBook) => {
    const previousBook = booksDB.get(id);
    const expectedBook = {
        ...previousBook,
        ...receivedBook
    }
    removeBook(id);
    
    booksDB.set(id, expectedBook);
    const savedBook = booksDB.get(id);
    return {id, ...savedBook};
};