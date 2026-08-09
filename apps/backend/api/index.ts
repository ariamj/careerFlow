import { config } from 'dotenv';
config({ path: '../../.env' });
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { applications } from '@careerFlow/database';


const app = new Hono().basePath('/api/');

app.use('*', cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));

const sql = neon(process.env.POOLED_DATABASE_URL!);
const db = drizzle(sql);

// GET all applications from database
app.get('/applications', async (c) => {
    try {
        const allApplications = await db.select().from(applications);
        return c.json(allApplications);
    } catch (error) {
        return c.json({ error: 'Failed to retrieve database applications' }, 500);
    }
});

app.post('/applications', async (c) => {
    try {
        const body = await c.req.json();
        const newApplication = await db.insert(applications).values({
            company: body.company,
            position: body.position,
            workMode: body.workMode,
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


export default handle(app);