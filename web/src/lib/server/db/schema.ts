import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { user } from '$lib/server/db/auth.schema';
import { scale } from 'svelte/transition';

export const task = sqliteTable('task', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  priority: integer('priority').notNull().default(1)
});

export const itemCategory = sqliteTable('category', {
  id: text('id')
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull()
});

export const itemCategoryRelation = relations(itemCategory, ({ many }) => ({
  items: many(items)
}));

export const items = sqliteTable('items', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  item: text('item').notNull(),
  img: text('img').notNull(),
  amounts: text('amounts').notNull(),
  variations: text('variations', { mode: 'json' }),
  scale: integer('scale').notNull(),
  weight: integer('weight').notNull(),
  teamId: text('teamId'),
  categoryId: text('categoryId')
});

export const itemRelations = relations(items, ({ one }) => ({
  category: one(itemCategory, {
    fields: [items.categoryId],
    references: [itemCategory.id]
  }),
  team: one(teams, {
    fields: [items.teamId],
    references: [teams.id]
  })
}));

export const teams = sqliteTable('teams', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  color: text('color')
});

export type teamsSelect = typeof teams.$inferSelect;

export const teamsRelation = relations(teams, ({ many }) => ({
  players: many(user),
  items: many(items)
}));

export const roles = sqliteTable('roles', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  color: text('color')
});

export * from './auth.schema';
