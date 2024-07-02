// Byimaan

import NextAuth from "next-auth";
import googleProvider from "next-auth/providers/google";
import credentialsProvider from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { User } from "./models/userModel";
import bcryptjs, {compare} from 'bcryptjs'

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

            // what are needed!
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },

            // So after user has gave the email and pasword no we can verify all info in authorize method.

            async authorize(credentials) {

                const {email, password} = credentials;

                if (!email || !password){
                    throw new CredentialsSignin("Please provide email and password")
                }


                // notice we can't a user object having password in it!
                const user = await User.findOne({
                    email
                }).select('+password');
                
                if (!user) {
                    throw new CredentialsSignin("User not found!")
                }

                if (!user.password){
                    throw new CredentialsSignin("Invalid email or password")
                }

                const isMatch = await compare(password as string, user.password);

                if (!isMatch){
                    throw new CredentialsSignin("Invalid email or password")
                }

                if (password !== 'passcode')
                    throw new CredentialsSignin(undefined, {cause: 'PPassword does not match',});
                
                return {name: user.name, email: user.email, id: user._id};
            }

        })
    ]
});