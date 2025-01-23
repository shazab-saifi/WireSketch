declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        JWT_SECRET: string;
        // Add other environment variables here if needed
    }
}
