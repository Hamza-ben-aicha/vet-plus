import  mongoose  from 'mongoose';

const UserSchema = mongoose.Schema({
    name:{type: String , required : true},
    email: {type: String , required : true},
    password:{type: String , required : true},
    isEntreprise:{type : Boolean, required : true , default : false},
    phone:{type: String, required : true, default:"none"},
    CINE:{type: String, required: true , default:"none"},
})

//turn schema into a model             .name       .schema type
const User = mongoose.model('User', UserSchema);

export default User;