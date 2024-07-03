// Byimaan

'use client'
import React from 'react';
import { Card, CardHeader, CardFooter, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FixHydration } from '@/components/wrappers/utils/fix-hydration';
import clsx from 'clsx';
import { submitSignupForm } from '../api/auth/actions/forms';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const signupFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 characters long. ')
});

export type SignUpFormSchema = z.infer<typeof signupFormSchema>

function Signup() {

  const router = useRouter();  
  const signupForm = useForm<SignUpFormSchema>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onChange',
    defaultValues: {
        name: '',
        email: '',
        password: ''
    }
  });

  const {register, handleSubmit, formState: {errors} } = signupForm;
  const fieldErrors = Object.values(errors);
  
  const onFormSubmit = async ({name, email, password}: SignUpFormSchema) => {
    signupForm.reset();
    if (!name || !email || !password){
        return
    };
    const res = await submitSignupForm({name, email, password});
    console.log('After submiting form', res)
    if (res){
        signIn('credentials', {
            ...res,
            redirect: true,
            redirectTo: '/'
        })
    };
    signupForm.setError('root', {message: 'Smething went wrong!'})
  };

  const submittingForm = signupForm.formState.isSubmitting;

  return (
    <div className="flex justify-center items-center h-dvh ">
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription className='space-y-2'>
                   <h2> Please create your profile </h2>
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
                    
                    <Input type='name' placeholder='Name' {...register('name')}/>
                    <Input type='email' placeholder='abc@example.com'  {...register('email')}/>    
                    <Input type='password' placeholder='Password'  {...register('password')}/>

                    <Button type='submit' disabled={submittingForm} className={clsx(submittingForm && 'bg-green-600 text-white')}> { submittingForm ? 'Submitting...' : 'Sign Up'} </Button>
                </form>
            </CardContent>

            <CardFooter className='flex flex-col items-start space-y-2'>
                <Link href='/login' >Already have an account? <span className='font-semibold text-blue-500'>Login</span></Link>
            </CardFooter>
        </Card>
    </div>
  )
};

function SignupPage(){

    return (
        <FixHydration>
            <Signup/>
        </FixHydration>
    )
}

export {signupFormSchema}

export default SignupPage