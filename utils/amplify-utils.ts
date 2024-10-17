import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import outputs from '@/amplify_outputs.json';
import { cookies } from 'next/headers';
import { getCurrentUser } from 'aws-amplify/auth/server';
// https://docs.amplify.aws/nextjs/build-a-backend/data/connect-from-server-runtime/nextjs-server-runtime/
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data';
import { type Schema } from '@/amplify/data/resource';

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
    config: outputs,
    cookies,
    authMode: "userPool",
  });

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs
});

export const isAuthenticated = async () =>
await runWithAmplifyServerContext({
    nextServerContext:{cookies},
    async operation(contextSpec) {
        try {
            const user = await getCurrentUser(contextSpec);
            return !!user;
        } catch (error) {
            return false;
        }    
    }, 
}) 
