import jwt from 'jsonwebtoken';

const authMiddleware=(req,res,next)=>{
    const {token}=req.header
    if(!token){
        return res.json({success:false,message:"token not found"})
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export default authMiddleware