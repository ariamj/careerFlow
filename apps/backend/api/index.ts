import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';
import { neon } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { applicationsApp } from '../api-routes/applications.js';
import { testApp } from '../api-routes/test.js';

type Env = {
    Variables: {
        db: NeonHttpDatabase;
    };
};

const app = new Hono<Env>().basePath('/api/');

app.use('*', cors({
    origin: process.env.BASE_URL || 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));

let db: NeonHttpDatabase;

try {
    if (!process.env.POOLED_DATABASE_URL) {
        throw new Error('POOLED_DATABASE_URL is not defined in the environment variables.');
    }
    const sql = neon(process.env.POOLED_DATABASE_URL!);
    db = drizzle({client: sql});
} catch (error: any) {
    console.error(error.message);
}


app.use('*', async (c, next) => {
    c.set('db', db);
    await next();
});

app.get('/', (c) => c.json({ message: 'Welcome to the CareerFlow API!' }));
app.get('/testing', (c) => c.json({ message: 'Testing route is working!', ok: "hello world!" }));

app.route('/', applicationsApp);
app.route('/', testApp);

export const runtime = 'edge';
export const GET = handle(app);
// export default handle(app);