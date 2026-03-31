import jwt from 'jsonwebtoken'

export const protect=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:'not authorized'})
        }
        const decode=jwt.verify(token,'3110912')
        req.user=decode;
        next()
    } catch (error) {
         return res.status(401).json({message:'Invalid token'})
    }
}