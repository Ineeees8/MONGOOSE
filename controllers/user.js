  const User = require ('../Model/User')
  const bcrypt = require ('bcrypt');
  const jwt= require ("jsonwebtoken");
  
  exports.register = async(req,res)=> {
    try {
        const {firstname , name , email , password} = req.body;
        const foundUser = await User.findOne({email})
        if (foundUser) {
        return res.status(400).send({ errors : [{msg : "email alrady in use ..."}]})
      }
      const saltRounds = 10
      const hashPassword = await bcrypt.hash(password , saltRounds);
        const newUser = new User({...req.body});
        newUser.password = hashPassword;
        await newUser.save()  
        const token= jwt.sign({
          id : newUser._id
        }, process.env.SCRT_KEY , { expiresIn : "48h"})
        res.status(200).send({ success : [{ msg : "Thanks for signing up ..."}] , user : newUser , token})

    } catch (error) {
        res.status(400).send({ errors : [{msg:" User registration failed. Please try again ..."}] })
      }

    }

 exports.login = async (req,res)=>{
  try {
    const { email , password } = req.body;
    const foundUser = await User.findOne({email});
    if (!foundUser) {
      return res.status(400).send({ errors : [{msg : "User not found, please try again"}]})
    }
    const checkPassword = await bcrypt.compare(password , foundUser.password)
    if (!checkPassword) {
      return res.status(400).send({ errors : [{msg : "Please check your login informations again!"}]})

    }
    
    const token= jwt.sign({
      id : foundUser._id
    }, process.env.SCRT_KEY , { expiresIn : "48h"})
     
     res.status(200).send({ success : [{msg : "Welcome back"}] , user : foundUser , token})
  }
  catch (error) {
   return res.status(400).send({ errors : [{msg:"Please check your login informations again"}] })
  }}


  exports.updateUserPassword= async (req,res)=>{
    const{oldPassword, password,confirmedpassword} = req.body;
    const{_id}= req.params;
    try {
       const user = await User.findById(req.params)
       if (!user) {
        return res.status(400).send("User not found")}

       const isValidPassword = await bcrypt.compare(oldPassword , user.password)
        if (!isValidPassword) {
           return res.status (400).send({ errors : [{msg : "Please check your old password again"}]})}

       if(password !== confirmedpassword) {
        return res.status(400).send({ errors : [{msg : "Please check your new password again"}]})
       }

       const hashedPassword = await bcrypt.hash(password, 10); 

       user.password = hashedPassword
       const updateUserPassword= await user.save()


       return res.json({ success : [{msg : "Your password has been updated successfully!"}] , user : updateUserPassword})

        }
 catch (error) {
  return res.status(400).send({ errors : [{msg:"Something went wrong , cannot update password"}] })
    }
}
    

