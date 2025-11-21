import { serial, pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  book_for_years: integer("book_for_years").default(0),
  refresh_token: text("refresh_token"),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export type userSchemaSelect = typeof Users.$inferSelect;
export type userSchemaInsert = typeof Users.$inferInsert;

export const Books = pgTable("books", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  author: text("author").notNull(),
  image: text("image"),
  progress: integer("progress").default(0),
  rating: integer("rating").default(0),
  comment: text("comment"),

  // genre: text("genre").notNull(),
  // user_id: text("user_id").notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export type bookSchemaSelect = typeof Books.$inferSelect;
export type bookSchemaInsert = typeof Books.$inferInsert;
