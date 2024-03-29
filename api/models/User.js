import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true}//(1)
);

export default mongoose.model("User", UserSchema);

/**
 * (1) this will give the creaated at and updated at timestamps.
 */