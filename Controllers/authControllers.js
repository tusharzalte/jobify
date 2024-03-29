import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError,Unauthenticatederror} from "../errors/index.js"


const register = async (req, res) => {
     const {name,email,password} =req.body
     if(!name || !email || !password)
     {
        throw new BadRequestError('please provide all values')
     }

     const userAleradyExists = await User.findOne({email});
     if(userAleradyExists)
     {
        throw new BadRequestError('Email alerady exist')
     }
      const user = await User.create({name,email,password})
      const token =user.createJWT()
      res.status(StatusCodes.CREATED).json({user:{email:user.email,lastName:user.lastName,location:user.location,name:user.name},token,location:user.location})
}
const login = async (req, res) => {
    const {email,password}=req.body
    if(!email || !password)
    {
        throw new BadRequestError("please provide all values")
    }
    const user = await User.findOne({email}).select("+password")
     if(!user)
     {
        throw new Unauthenticatederror("Invalid Credentials")
     }
 

     const iscorrectpassword = await user.comparePassword(password);
     if(!iscorrectpassword)
     {
        throw new Unauthenticatederror("Invalid Credentials")
     }
     const token = user.createJWT()
     user.password = undefined
     res.status(StatusCodes.OK).json({user,token,location:user.location})
    res.send("Login User");
}

const updateUser =async (req, res) => {
    const {email,name,lastName,location}= req.body
    if(!email || !name || !lastName || !location)
    {
      throw new BadRequestError("please Provide All values")
    }
    const user = await User.findOne({_id:req.user.userId});

    user.email=email
    user.name=name
    user.location=location
    user.lastName=lastName
   await user.save()
   const token = user.createJWT()
   res.status(StatusCodes.OK).json({user,token,location:user.location})
}
export {updateUser,login,register};