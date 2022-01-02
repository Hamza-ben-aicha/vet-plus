import  jwt  from "jsonwebtoken";


const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;// > 500 it mean is a google auth token // < 500 our token
        let decodedData;
        if (token && isCustomAuth) { // if we have the token and token is our cutsom token then ...
            decodedData = jwt.verify(token,'test'); // test is the same secret when we create the token 
            req.userId = decodedData?.id;
        }else {// google token
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log("from middleware/auth.js");
        console.log(error.message);
    }
};


export default auth;