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
