// import 'dotenv/config';
import { config } from 'dotenv';
config({ path: '../../.env' });
import { defineConfig } from 'drizzle-kit';

if (!process.env.DIRECT_DATABASE_URL) {
    throw new Error('DIRECT_DATABASE_URL is not set in the .env file');
}

export default defineConfig({
    schema: './schema', // schema folder
    out: './drizzle', // migrations folder
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DIRECT_DATABASE_URL,
    },
});
