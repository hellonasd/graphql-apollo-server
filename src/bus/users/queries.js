import { db } from "./db";

export const queries = {
  users: (_, __, ctx) => {
    if (ctx.req.username) {
      return db;
    } else {
      return db.map(({ name, email }) => ({
        name,
        email,
        password: null,
      }));
    }
  },
};
