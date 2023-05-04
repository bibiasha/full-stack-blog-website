import User from "../model/User";
import bcrypt from 'bcryptjs';

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return console.log(error);
    }
    if (!users) {
        return res.status(404).json({ message: "No users found" })
    }
    return res.status(200).json({ users });
}


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser= await User.findOne({email});
    } catch (error) {
        return res.status(500).json({status:false,message:error.message});
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exist! Login nstead"})
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user =new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]
    });
   
    try{
       await user.save();
    }catch (error) {
        return res.status(500).json({status:false,message:error.message});
    }
return res.status(201).json({user})
}


export const login= async (req, res, next)=>{
    const { email, password } = req.body;
    let exitingUser;
    try{
        exitingUser=await User.findOne({email})
    }catch (error) {
        return res.status(500).json({status:false,message:error.message});
    }
    if(!exitingUser){
        return res.status(404).json({status:false,message:"email doesn't exits"});
    }

    const isPassword=bcrypt.compareSync(password,exitingUser.password);
    if(!isPassword){
        return res.status(400).json({status:false,message:"Password is incorrect!"}); //unauthorise
    }
    return res.status(200).json({message:"Login Successful",user:exitingUser})
}