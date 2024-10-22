'use client'

import React from "react";
import { Amplify } from "aws-amplify";
import config from "@/amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(config, { ssr: true });
// Amplify.configure({
//     Auth: {
//       Cognito: {
//         userPoolClientId: "1avak4p54r26t7g4n802ag407q",
//         userPoolId: "ap-northeast-1_5l1E61ChR",
//         // other configuration options
//       }
//     }
// });

const Auth = ({children}: {children: React.ReactNode}) => {
    return(
        <Authenticator.Provider>{children}</Authenticator.Provider>
    );
};

export default Auth;