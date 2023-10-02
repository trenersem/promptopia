const { Schema, models, model } = require("mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        unique: [true, 'Username already exists!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]

    },
    image: {
        type: String,
    }
});

// for Node js //
// const User = model('User', UserSchema);
// export default User;
const User = models.User || model('User', UserSchema);

export default User;