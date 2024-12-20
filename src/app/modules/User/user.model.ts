import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<IUser, UserModel>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
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

userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

// email already exists
userSchema.statics.isUserExistsByEmail = async (email: string) => {
    return await User.findOne({ email });
};

// password Matched
userSchema.statics.isPasswordMatched = async (
    plainTextPassword: string,
    hashedPassword: string
) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};
const User = model<IUser, UserModel>('User', userSchema)
export default User