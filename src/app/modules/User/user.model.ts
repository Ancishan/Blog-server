import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<IUser>(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:['user', 'admin'],
            default: 'user',
        },
        isBlocked:{
            type:Boolean,
            default:false,
        },
    },
    {
        timestamps:true,
    },
);

// hashing password into db  

userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password, Number(config.bcrypt_salt_rounds)
    );
    next();
})

// set after saving password

userSchema.post('save', function(doc, next){
    doc.password = '';
    next();
});


export const User = model<IUser>('User', userSchema)