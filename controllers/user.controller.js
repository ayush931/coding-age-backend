import UserModel from "../schemas/user.schema.js";

export const userController = async (req, res) => {
    const { name, email, phone, password } = req.body;

    const newData = await UserModel.create({
        name,
        email,
        password,
        phone
    })

    return res.status(200).json({
        success: true,
        message: "User created successfully",
        newData
    })
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        })
    }

    const user = await UserModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    if (user.password !== password) {
        return res.status(401).json({
            success: false,
            message: "Invalid password"
        })
    }

    const userData = user.toObject()
    delete userData.password

    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: userData
    })
}