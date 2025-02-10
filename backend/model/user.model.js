import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"Password must be atleast 6 characters long"]
    },
    cartItems:[
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products"
            }
        }
    ],
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true})

const User = mongoose.model("Users",userSchema);

userSchema.pre("save",async(next)=>{
    if(!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password,this.password);
}

export default User;