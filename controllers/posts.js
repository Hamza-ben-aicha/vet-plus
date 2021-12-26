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