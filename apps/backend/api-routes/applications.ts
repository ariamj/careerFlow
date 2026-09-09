
import { applications } from '@career-flow/database/schema/applications.js';
import { and, eq } from 'drizzle-orm';
import { Hono } from 'hono';

const applicationsApp = new Hono<{ Variables: { db: any; id: string; user: any } }>()

const normalizeEnumValue = (value: unknown) => {
    if (typeof value !== 'string') {
        return value;
    }
    return value.toUpperCase().replace(/\s+/g, '_');
};

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

// PUT update an existing application in the database
applicationsApp.put('/applications/:id', async (c) => {
    try {
        const body = await c.req.json();
        const db = c.get('db');
        const applicationId = c.req.param('id');

        // Check if the request body is empty and return a 400 error if it is -- Nothing to update
        if (Object.keys(body).length === 0) {
            return c.json({ message: 'No fields to update' }, 400);
        }

        const setPayload: Record<string, any> = {
            updatedAt: new Date(),
        };

        Object.keys(body).forEach((key) => {
            if (key === 'workMode') {
                setPayload[key] = normalizeEnumValue(body[key]) as 'REMOTE' | 'ON_SITE' | 'HYBRID' | undefined;
            } else if (key === 'interest') {
                setPayload[key] = normalizeEnumValue(body[key]) as 'LOW' | 'MEDIUM' | 'HIGH' | undefined;
            } else if (key === 'applyDate') {
                setPayload[key] = body[key] ? new Date(body[key]) : undefined;
            } else if (key === 'status') {
                setPayload[key] = Array.isArray(body[key])
                    ? body[key].map(normalizeEnumValue) as ('SHORTLISTED' | 'APPLIED' | 'REJECTED')[]
                    : undefined;
            } else {
                setPayload[key] = body[key];
            }
        });

        const updatedApplication = await db.update(applications)
            .set({
                ...setPayload
            })
            .where(
                and(
                    eq(applications.id, applicationId),
                    eq(applications.userId, "d37168ef-edbe-4a32-8f61-0694aaa70183") // Hardcoded for now, will be replaced with user.id when auth is implemented
                )
            )
            .returning();

        if (updatedApplication.length === 0) {
            return c.json({ error: `Application not found or unauthorized` }, 404);
        }

        return c.json(updatedApplication[0]);
    } catch (error) {
        console.error('Failed to update application:', error);
        return c.json({ error: 'Failed to update application' }, 500);
    }
});

applicationsApp.delete('/applications/:id', async (c) => {
    try {
        const db = c.get('db');
        const applicationId = c.req.param('id');

        const deletedApplication = await db.delete(applications)
            .where(
                and(
                    eq(applications.id, applicationId),
                    eq(applications.userId, "d37168ef-edbe-4a32-8f61-0694aaa70183") // Hardcoded for now, will be replaced with user.id when auth is implemented
                )
            )
            .returning();

        if (deletedApplication.length === 0) {
            return c.json({ error: `Application not found or unauthorized` }, 404);
        }

        return c.json({ message: `Application with id ${applicationId} deleted successfully` });
    } catch (error) {
        console.error('Failed to delete application:', error);
        return c.json({ error: 'Failed to delete application' }, 500);
    }
})

export { applicationsApp };