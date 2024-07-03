// Byimaan


import React from 'react';
import { Card, CardHeader, CardFooter, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
function LoginPage() {
  return (
    <div className="flex justify-center items-center h-dvh ">
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Please provide your credential information for authentication</CardDescription>
            </CardHeader>

            <CardContent> 
                <form >

                    <Input type='email' placeholder='abc@example.com'/>    
                    <Input type='password' className='my-4' placeholder='Password'/>

                    <Button type='submit'> Login </Button>
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
}

export default LoginPage