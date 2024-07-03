// Byimaan

'use client';

import clsx from 'clsx';
import * as z from 'zod';
import React from 'react';
import { Card, CardHeader, CardFooter, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FixHydration } from '@/components/wrappers/utils/fix-hydration';
import { submitLoginForm } from '../api/auth/actions/forms';
import { waitFor } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { CredentialsSignin } from 'next-auth';

const loginFormSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Invalid password.')
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>


function LoginForm() {

    const router = useRouter();  
    const loginForm = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const {register, handleSubmit, formState: {errors} } = loginForm;
    const fieldErrors = Object.values(errors);
    
    // need to be fixed
    const onFormSubmit = async ({email, password}: LoginFormSchema) => {
        loginForm.reset();
        // await waitFor(2000);
        if ( !email || !password){
            return
        };
        
        const res = await submitLoginForm({email, password});
        if (res as any){
            console.log('Dta received', res)
            try{

                await signIn('credentials', {
                    email: res.email,
                    password: password,
                    redirect: true,
                    redirectTo: '/'
                });

            } catch (err) {
                console.log('Testing')
                const error = err as CredentialsSignin;
                return error.message
            }
        } else{
            loginForm.setError('root', {message: 'Smething went wrong!'})
        }
      };
    
      const submittingForm = loginForm.formState.isSubmitting;
    

    return (
    <div className="flex justify-center items-center h-dvh ">
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Please provide your credential information for authentication
                    <div className='w-full text-center px-4 bg-red-500 text-white text-xs rounded-lg '>
                    {
                        fieldErrors.map(
                            (err, index) => err && <p key={index} className='font-semibold mt-1'>{err.message}</p>
                        )
                    }
                   </div>
                </CardDescription>
            </CardHeader>

            <CardContent> 
                <form className='space-y-4' onSubmit={handleSubmit(onFormSubmit)}>

                    <Input type='email' placeholder='abc@example.com' {...register('email')}/>    
                    <Input type='password' className='my-4' placeholder='Password' {...register('password')}/>

                    <Button type='submit' disabled={submittingForm} className={clsx(submittingForm && 'bg-green-600 text-white')}> { submittingForm ? 'Submitting...' : 'Login'} </Button>
                </form>
            </CardContent>

            <CardFooter className='flex flex-col items-start space-y-2'>
                <p>Or</p>

                <form>
                    <Button type='submit' className='bg-gray-100 text-black'>Login with google</Button>
                </form>

                <Link href='/signup' >Don't have an account? <span className='font-semibold text-blue-500'>Signup</span></Link>
                
            </CardFooter>
        </Card>
    </div>
    )
};

function LoginPage(){
    return (
        <FixHydration>
            <LoginForm></LoginForm>
        </FixHydration>
    )
}

export default LoginPage