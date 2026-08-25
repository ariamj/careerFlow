
import { applications } from '@career-flow/database/schema/applications.js';
import { eq } from 'drizzle-orm';
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

applicationsApp.get('/applications/:id', async (c) => {
    try {
        const db = c.get('db');
        const applicationId = c.req.param('id');
        const application = await db.select().from(applications).where(eq(applications.id, applicationId));
        if (!application) {
            return c.json({ error: `Application with id ${applicationId} not found` }, 404);
        }
        return c.json(application[0]);
    } catch (error) {
        return c.json({ error: 'Failed to retrieve application' }, 500);
    }
});

// POST a new application to the database
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