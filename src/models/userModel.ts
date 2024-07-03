// Byimaan

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,  required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        // with the select attr when we try to fetch data from this model then `password field will not be included`
        // & `required` is false because if user choose oAuth then it do ont make sense to keep password required
        type: String, select: false
    },
    googleId: {
        type:  String
    }
});


export const User = mongoose.models?.User || mongoose.model('User', userSchema)