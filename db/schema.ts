import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const postsTable = sqliteTable('posts', {
  id: text('id').primaryKey(), // Reddit post ID (alphanumeric)
  title: text('title').notNull(),
  body: text('body').notNull(),
  createdUtc: text('created_utc').notNull(),
  score: integer('score').notNull(),
  text: text('summary').notNull(),
  sentiment: text('sentiment').notNull(),
  tickers: text('tickers').notNull(),
  insights: text('insights').notNull()
});

export const postsNewTable = sqliteTable('postsNew', {
  id: text('id').primaryKey(), // Reddit post ID (alphanumeric)
  title: text('title').notNull(),
  body: text('body').notNull(),
  createdUtc: text('created_utc').notNull(),
  score: integer('score').notNull(),
  text: text('summary').notNull(),
  sentiment: text('sentiment').notNull(),
  tickers: text('tickers').notNull(),
  insights: text('insights').notNull()
});

// export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
