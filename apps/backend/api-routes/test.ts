import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const testApp = new Hono<{ Variables: { db: any } }>()

testApp.get('/testget', (c) => c.json({ message: 'Test route is working!' }));

export const GET = handle(testApp);
export { testApp };