import  mongoose  from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts= async (req,res)=>{
    try {
    //  take some time that we have to add await async function
        const postMessages = await PostMessage.find(); // find() finding somthings inside a model ( postMessages ) .. take time to run so for that reson we have to make a async function 
        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message})        
    };
} 

export const createPost=  async (req,res)=>{
    //req.body need to crete form for making posts
    const post= req.body;  
    const newpost= new PostMessage(post);
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

    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send('No post with that id');


    // to update post we have to call  our model which is the PostMessage
    // second parameter we have to pass the whole updating post 
    const updatedPost= await PostMessage.findByIdAndUpdate(_id, {...post, _id} ,{new: true});
    
    res.json(updatedPost);
}