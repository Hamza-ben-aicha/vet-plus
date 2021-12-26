import  mongoose  from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    selectedFile:String,// convert an image into a string using base64
    //we do that declaration between { .. } because we have some additional information -> default : 
    likeCount:{
        type: Number,
        default:0
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
})

//turn schema into a model             .name       .schema type
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;