import  mongoose  from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts= async (req,res)=>{
    try {
    //  take some time that we have to add await async function
        const postMessages = await PostMessage.find(); // find() finding somthings inside a model ( postMessages ) .. take time to run so for that reson we have to make a async function 

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message})        
    };
} 

export const createPost=  async (req,res)=>{
    //req.body need to create form for making posts
    const post= req.body;  
    const newpost= new PostMessage({...post, creator: req.userId, createdAt : new Date()});
    try {
        await newpost.save();
        res.status(201).json(newpost);
      } catch (error) {
        res.status(409).json({message: error.message});
      }  
}

export const updatePost=  async (req,res)=>{
    //how we konw that we going to recieve the id param bellow -> because we set our route /id 
    const {id: _id}= req.params; // rename our prop id to _id 
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send('No post with that id to update');


    // to update post we have to call  our model which is the PostMessage
    // second parameter we have to pass the whole updating post 
    const updatedPost= await PostMessage.findByIdAndUpdate(_id, {...post, _id} ,{new: true});
    
    res.json(updatedPost);
}

export const deletePost=  async (req,res)=>{
    //how we konw that we going to recieve the id param bellow -> because we set our route /id 
    const {id :_id}= req.params;

    //this lane bellow is for test if that id valid or not 
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndDelete(_id);
    
    res.json({message : 'Post deleted successfully '});
}

export const likePost = async (req,res)=>{
    //how we konw that we going to recieve the id param bellow -> because we set our route /id 
    const {id : _id}= req.params;
    if(!req.userId) return res.json({message : 'Unauthenticated '});// the user in not authenticated
    
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send('No post with that id');
   
    const post= await PostMessage.findById(_id);
    
    const index = post.likes.findIndex((_id)=> _id === String(req.userId)); // if the user already like the post so it will be a dislike not like 

    if (index === -1) {
        //like the post 
        post.likes.push(req.userId);
    }else{
        //dislike the post : remove his id from the likes array
        post.likes = post.likes.filter((id)=> id !== String(req.userId));// retrun array of all the likes beside the current person's like 
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new: true});
    res.json(updatedPost);
}