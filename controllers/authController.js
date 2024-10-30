import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const registerController = async (req, res, next) => {   //Here we use the async bcs the we are making the req for the mongodb which is in another server so we need to make it async
    try {
        const { name, email, password } = req.body;

        //validation on fileds
        if (!name) {
            // return res.status(400).send({
            //     success: false,
            //     message: "Please provide the name"
            // });
            next("Please provide the name");
        }
        if (!email) {
            // return res.status(400).send({
            //     succes: false,
            //     message: "Please provide the email"
            // });
            next("Please provide the emsil");
        }
        if (!password) {
            // return res.status(400).send({
            //     success: false,
            //     message: "Please provide the password"
            // });
            next("Passwors is required and greater thena 6 character");
        }

        //Validate existing user on email
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            // return res.status(200).send({
            //     success: false,
            //     message: "Email Allready Register Please Login"
            // });
            next("Email Allready Register Please Login");
        }

        //hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        //If all the validation is pass then create the user 
        const user = await userModel.create({ name, email, password: hashedPassword });

        //Create token
        // const token = user.createJWT();

        //Create token
        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });


        res.status(201).send({
            success: true,
            message: "User Created Succssfully",
            user: {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                location: user.location
            },
            token
        });

    } catch (error) {
        // console.log(error);
        // res.status(400).send({
        //     message: "Error In Reqgister Controller",
        //     success: false,
        //     error
        // });
        next(error);
    }
};



// LOGIN Controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validation 
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All Fields"
            });
        }

        //email validation from user
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(500).send({
                success: false,
                message: "Invalid Username or Password"
            });
        }

        //For comaparing  password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid Username or Password"
            });
        }
        user.password = undefined;

        //Create token
        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        //if all condition is true then send this
        return res.status(200).send({
            success: true,
            message: "Login Successfull",
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Login Controller",
        });
    }
};