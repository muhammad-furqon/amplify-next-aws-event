import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import outputs from '@/amplify_outputs.json';
import { cookies } from 'next/headers';
import { getCurrentUser } from 'aws-amplify/auth/server';
// https://docs.amplify.aws/nextjs/build-a-backend/data/connect-from-server-runtime/nextjs-server-runtime/
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data';
import { type Schema } from '@/amplify/data/resource';
import { fetchAuthSession } from "aws-amplify/auth/server";

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
            // console.log("user info", user);
            return !!user;
        } catch (error) {
            console.error('Error auth user:', error);  
            return false;
        }    
    }, 
}) 

export const currentSession = async () =>
await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec){
        try {
            return await fetchAuthSession(contextSpec);    
        }
        catch (error) {
          console.error('Error fetching auth session:', error);
          return null;
        }
    }
})

export const currentUserGroup = async () =>
await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec){
        try {
            const session = await fetchAuthSession(contextSpec);
            // console.log("id token", session?.tokens?.idToken);
            // console.log("access token", session?.tokens?.accessToken);
            const currentUserGroup = session?.tokens?.idToken?.payload["cognito:groups"];
            console.log("user belongs to following groups: " + currentUserGroup);
            return currentUserGroup;     
        }
        catch (error) {
            console.error('Error fetching auth session:', error);
            return null;
        }
    }
})

export const isAdmin = async () =>
await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec){
        try {
            const session = await fetchAuthSession(contextSpec);
            // console.log("id token", session?.tokens?.idToken);
            // console.log("access token", session?.tokens?.accessToken);
            const currentUserGroup = session?.tokens?.idToken?.payload["cognito:groups"];
            // console.log("user belongs to following groups: " + currentUserGroup);
            return currentUserGroup === "ADMINS";     
        }
        catch (error) {
            console.error('Error fetching auth session:', error);
            return false;
        }
    }
})