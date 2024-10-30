import mongoose from "mongoose";
import validator from "validator";
// import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"] //with the error message
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        require: [true, "Password is required"],
        minLength: [5, "Password length should be greater than 6 characters"],
        // select: true  //this is the default behavior but when make it false then this field wont come inside the query
    },
    location: {
        type: String,
        default: "India"
    }
}, { timestamps: true });


//middlewar for hashing(encrypt) the password
// userSchema.pre("save", async function(){
//     const salt = await bcrypt.genSalt(10);
//     this.passowrd = await bcrypt.hash(this,password, salt)
// })

//Create JSON webtoken 
// userSchema.methods.createJWT = function(){
//     return JWT.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn : "1d"})
// }

export default mongoose.model("User", userSchema); //in mongodb the "User" table is becomes "users" that it automatiaclly added the "S" and makes it into the lowercase

