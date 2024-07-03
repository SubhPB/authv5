// Byimaan

import NextAuth, { AuthError } from "next-auth";
import googleProvider from "next-auth/providers/google";
import credentialsProvider from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { User } from "./models/userModel";
import {compare} from 'bcryptjs'
import { dbConnect } from "./lib/mongodb";


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
                await dbConnect();

                
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
                return {name: user.name, email: user.email, id: user._id};
            }

        })
    ],

    pages: {
        
        signIn: '/'
    },

    callbacks: {
        async signIn({user, account}){
            // Suppose when user return back from google's authentication we would want to save some info about user in our db
            if (account?.provider === 'google'){
                try {
                    const {email, name, image, id} = user;

                    await dbConnect();
                    const alreadyAnUser = await User.findOne({email});
                    if (!alreadyAnUser){
                        await User.create({
                            email, name, googleId: id
                        })
                    };

                    return true
                    

                } catch (error) {
                    throw new AuthError("Error while creating user")
                }
            }
            return false
        }
    }
});