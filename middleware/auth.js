import jwt from 'jsonwebtoken'


//This auth will be called before any action that requires authentication
const auth =async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(' ')[1];//It is saved as `Bearer TokenNo`
        const isCustomAuth=token.length<500;
        let decodeData
        if(token && isCustomAuth){
            decodeData=jwt.verify(token,process.env.JWT_Secret)
            req.userId=decodeData?.id;
        }
        else{
            //For google's Authentication
            decodeData==jwt.verify(token);
            //sub=Google unique id for all user
            req.userId=decodeData?.sub;
        }
        next()
    } catch (err) {
        console.log(err)
    }
}

export default auth;