import { pgTable, uuid, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import {
    INTEREST_LEVEL_OPTIONS,
    InterestLevelKey,
    WORK_MODE_OPTIONS,
    WorkModeKey,
    STATUS_OPTIONS,
    StatusKey
} from '../../../apps/frontend/src/utils/types';
import { users } from './users';

const interestLevelKeys = Object.keys(INTEREST_LEVEL_OPTIONS) as [InterestLevelKey, ...InterestLevelKey[]];
export const interestLevelEnum = pgEnum("interest_levels", interestLevelKeys);
const workModeKeys = Object.keys(WORK_MODE_OPTIONS) as [WorkModeKey, ...WorkModeKey[]];
export const workModeEnum = pgEnum("work_modes", workModeKeys);
const statusKeys = Object.keys(STATUS_OPTIONS) as [StatusKey, ...StatusKey[]];
export const statusEnum = pgEnum("statuses", statusKeys);

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
