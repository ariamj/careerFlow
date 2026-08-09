CREATE TYPE "public"."interest_levels" AS ENUM('LOW', 'MEDIUM', 'HIGH');--> statement-breakpoint
CREATE TYPE "public"."statuses" AS ENUM('SHORTLISTED', 'APPLIED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."work_modes" AS ENUM('REMOTE', 'ON_SITE', 'HYBRID');--> statement-breakpoint
ALTER TABLE "applications" ALTER COLUMN "interest" SET DATA TYPE "public"."interest_levels" USING "interest"::"public"."interest_levels";--> statement-breakpoint
ALTER TABLE "applications" ALTER COLUMN "work_mode" SET DATA TYPE "public"."work_modes" USING "work_mode"::"public"."work_modes";--> statement-breakpoint
ALTER TABLE "applications" ALTER COLUMN "status" SET DATA TYPE "public"."statuses"[] USING "status"::"public"."statuses"[];