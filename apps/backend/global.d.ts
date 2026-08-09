declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POOLED_DATABASE_URL: string;
            FRONTEND_URL: string;
        }
    }
}

export {};