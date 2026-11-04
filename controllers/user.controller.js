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