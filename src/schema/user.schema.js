import { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Atleast 3 character is required"],
        maxLength: [128, "More than 128 character is not allowed"],
        trim: true,  // remove extra spaces from both the sides
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,  // keeps the data always in lowercase
        trim: true,
        unique: true,  // always keeps the unique value
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"]
    },
    phone: {
        type: String,
        required: false,
        match: [/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be atleast 8 character"],
        maxLength: [128, "Password cannot exceed more than 128 character"],
        trim: true,
        select: false   // by default it does not select or give the password
    },
    avatar: {
        public_id: String,
        secure_id: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: String,
    subscription: {
        id: String,
        status: String
    }
}, {
    timestamps: true  // automatically creates the createdAt and updatedAt value in each data with datetime format
})

// this function runs before saving the user data to check and hash the password if not done or password is updated
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods = {
    generateJwtToken: async function() {
        return await jwt.sign({
            id: this._id,
            email: this.email,
            role: this.role
        }, 
            process.env.JWT_SECRET, 
        {
           expiresIn: process.env.JWT_EXPIRY 
        })
    }
}