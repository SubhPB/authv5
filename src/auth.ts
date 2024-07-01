// Byimaan

import NextAuth from "next-auth";
import googleProvider from "next-auth/providers/google";
import credentialsProvider from "next-auth/providers/credentials";

export const {handlers, signIn, signOut, auth} = NextAuth({

    // Remember `provider: Provider[]` means Function[]
    providers: [

        // just id with secret key same with other OAuth Providers
        googleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // we could also use default `auth` form but we will use our custom form
        credentialsProvider({
            name: 'Credentionals',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                }
            }
        })
    ]
});