import { pgTable, uuid, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users.ts';

const interestLevelKeys = ['LOW', 'MEDIUM', 'HIGH'] as const;
export const interestLevelEnum = pgEnum('interest_levels', interestLevelKeys);
const workModeKeys = ['REMOTE', 'ON_SITE', 'HYBRID'] as const;
export const workModeEnum = pgEnum('work_modes', workModeKeys);
const statusKeys = ['SHORTLISTED', 'APPLIED', 'REJECTED'] as const;
export const statusEnum = pgEnum('statuses', statusKeys);

export const applications = pgTable('applications', {
    id: uuid('id').defaultRandom().primaryKey(),
    interest: interestLevelEnum('interest'),
    company: text('company').notNull(),
    position: text('position').notNull(),
    workMode: workModeEnum('work_mode'),
    applyDate: timestamp('apply_date'),
    status: statusEnum('status').array().notNull(),
    userId: uuid('user_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
