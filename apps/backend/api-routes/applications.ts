
import { applications } from '@career-flow/database/schema/applications.js';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';

const applicationsApp = new Hono<{ Variables: { db: any; user: any } }>()

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
        // const user = c.get('user');
        // if (!user) {
        //     return c.json({error: "Unauthorized"}, 401);
        // }

        const body = await c.req.json();
        const db = c.get('db');

        const normalizeEnumValue = (value: unknown) => {
            if (typeof value !== 'string') {
                return value;
            }
            return value.toUpperCase().replace(/\s+/g, '_');
        };

        const newApplication = await db.insert(applications).values({
            company: body.company,
            position: body.position,
            workMode: normalizeEnumValue(body.workMode) as 'REMOTE' | 'ON_SITE' | 'HYBRID' | undefined,
            interest: normalizeEnumValue(body.interest) as 'LOW' | 'MEDIUM' | 'HIGH' | undefined,
            applyDate: body.applyDate ? new Date(body.applyDate) : undefined,
            status: Array.isArray(body.status)
                ? body.status.map(normalizeEnumValue) as ('SHORTLISTED' | 'APPLIED' | 'REJECTED')[]
                : undefined,
            // userId: user.id,
            userId: "d37168ef-edbe-4a32-8f61-0694aaa70183", // Hardcoded for now, will be replaced with user.id when auth is implemented
        }).returning();

        return c.json(newApplication, 201);
    } catch (error) {
        console.error('Failed to create new application:', error);
        return c.json({ error: 'Failed to create new application' }, 500);
    }
});

export { applicationsApp };