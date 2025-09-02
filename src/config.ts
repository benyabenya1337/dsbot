import dotenv from 'dotenv';
dotenv.config();

export const TOKEN = process.env.TOKEN as string;
export const CLIENT_ID = process.env.CLIENT_ID as string;
export const GUILD_ID = process.env.GUILD_ID as string;
export const JULIKA_PASSWORD = process.env.JULIKA_PASSWORD as string;
