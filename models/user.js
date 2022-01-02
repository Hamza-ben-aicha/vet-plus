import  mongoose  from 'mongoose';

const UserSchema = mongoose.Schema({
    name:{type: String , required : true},
    email: {type: String , required : true},
    password:{type: String , required : true},
    id:{type: String}
})

//turn schema into a model             .name       .schema type
const User = mongoose.model('User', UserSchema);

export default User;