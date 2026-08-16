declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POOLED_DATABASE_URL: string;
            BASE_URL: string;
        }
    }
}

export {};