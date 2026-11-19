import User from "../schema/user.schema.js";
import CodingAgeError from "../utils/err.util.js";
import cloudinary from "cloudinary";
import fs from "fs";

const cookieOptions = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
} 

export const userRegistrationController = async(req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return next(new CodingAgeError(401, "All fileds are required"))
        }

        // check if email exists or not
        const checkEmail = await User.findOne({ email });

        if (checkEmail) {
            return next(new CodingAgeError(402, "User already exists"))
        }

        const user = await User.create({
            name: name,
            email: email,
            password: password,
            role: role,
            avatar: {
                public_id: email,
                secure_url: "hello"
            }
        })

        if (!user) {
            return next(new CodingAgeError(402, "Failed to create user"))
        }

        // uploading file on cloudinary
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    height: 250,
                    width: 250,
                    gravity: 'faces',
                    crop: "fill"
                })

                if (result) {
                    if (user.avatar) {
                        user.avatar.public_id = result.public_id,
                        user.avatar.secure_url = result.secure_url
                    }

                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (error) {
                return next(new CodingAgeError(401, "Failed to upload the file", error))
            }
        }

        const token = await user.generateJwtToken()
        console.log(token)

        if (!token) {
            await User.findOneAndDelete(user._id)
            return next(new CodingAgeError(400, 'Token generation failed'))
        }

        res.cookie('token', token, cookieOptions);

        await user.save()

        user.password = ""

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user
        })

    } catch (error) {
        return next(new CodingAgeError(500, `Internal server error: ${error}`))
    }
}