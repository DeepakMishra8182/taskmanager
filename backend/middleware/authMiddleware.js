import jwt from 'jsonwebtoken'

export const protect=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:'not authorized'})
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        // we are adding a new field in req object that is user
        req.user=decode;
        next()
    } catch (error) {
         return res.status(401).json({message:'Invalid token'})
    }
}


// req = request object
// 👉 Isme already hota hai:

// req.body
// req.headers
// req.params

// ab ek extra field add hoga jo ki hai user aaur decode me wohi hoga jo hamne token banate samay diya tha ko ki id tha 
// console.log(req.user); // { userId: 101 }
// const userId = req.user.userId;  userId nikal ke database me se un sabhi task nikal lenge jime ye user hai niche wohi code hai 

// export const getTasks = async (req, res) => {
//   try {
//     const task = await Task.find({ userId: req.user.id });
//     return res.status(200).json(task);
//   } catch (error) {
//     return res.status(500).json({ message: "server error" });
//   }
// };