
import { applications } from '@careerFlow/database/schema/applications.ts';
import { Hono } from 'hono';

const applicationsApp = new Hono<{ Variables: { db: any } }>()

// GET all applications from database
applicationsApp.get('/applications', async (c) => {
    try {
        const db = c.get('db');
        const allApplications = await db.select().from(applications);
        return c.json(allApplications);
    } catch (error) {
        return c.json({ error: 'Failed to retrieve database applications' }, 500);
    }
});

applicationsApp.post('/applications', async (c) => {
    try {
        const body = await c.req.json();
        const db = c.get('db');
        const newApplication = await db.insert(applications).values({
            company: body.company,
            position: body.position,
            workMode: body.workMode, // Drizzle will enforce value must be one of enum values (eg. SHORTLISTED, APPLIED, etc.)
            interest: body.interest,
            applyDate: body.applyDate,
            status: body.status,
            userId: body.userId,
        }).returning();

        return c.json(newApplication, 201);
    } catch (error) {
        return c.json({ error: 'Failed to create new application' }, 500);
    }
});

export { applicationsApp };