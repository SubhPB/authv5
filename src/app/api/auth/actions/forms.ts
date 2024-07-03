// Byimaan

'use server';

import { SignUpFormSchema, signupFormSchema } from "@/app/signup/page";
import { dbConnect } from "@/lib/mongodb";
import { hash } from "bcryptjs";
import { User } from "@/models/userModel";
import { LoginFormSchema } from "@/app/login/page";
import bcrypt from 'bcryptjs';

export const submitSignupForm = async (formData:SignUpFormSchema) => {
    const allFieldsAreProvided = Object.values(formData).every(val => !!val);

    if (!allFieldsAreProvided){
        throw new Error("Please provide all fields.")
    };

    await dbConnect();

    const user = await User.findOne({ email: formData.email });
    if (user) {
        throw new Error("User already exists.")
    }
    
    const hashedPassword = await hash(formData.password, 10);
    await User.create({
        name: formData.name,
        email: formData.email,
        password: hashedPassword
    });

    return {
        name: formData.name,
        email: formData.email
    }

};

export const submitLoginForm = async (formData:LoginFormSchema) => {
    const allFieldsAreProvided = Object.values(formData).every(val => !!val);

    if (!allFieldsAreProvided){
        throw new Error("Please provide all fields.")
    };

    const {email, password} = formData;
    await dbConnect();

    const user = await User.findOne({email}).select('+password');
    if (!user) {
        throw new Error('Invalid email or password.');
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid email or password.');
    };

    return {
        email, name: user?.name || '<Unknown>'
    };
};