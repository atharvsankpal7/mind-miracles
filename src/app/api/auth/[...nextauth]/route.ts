import nextAuth from 'next-auth';
import { authOptions } from '@/lib/auth_options';

//TODO: Fix the types
//@ts-ignore
const handler = nextAuth(authOptions);

export const GET = handler;
export const POST = handler;
