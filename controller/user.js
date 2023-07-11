// const storedData = []

// const dotenv = require('dotenv')
// dotenv.config()

// const bcrypt = require('bcrypt')
// const jwt = require("jsonwebtoken")

// const saltNumber = process.env.salt_round
// const saltRound = parseFloat(saltNumber)
// const secretKey = process.env.secret_key



// const signup = (req,res)=>{
//  const data = req.body    
//  const user = storedData.find((item)=>{
//    return item.email=== data.email
//  })
// //  console.log(user);
//  if(user){
//     res.send({msg: "user already exist"})
//  }else{

// const {name,phone,email,password}= data
// const salt = bcrypt.genSaltSync(saltRound)
// const hashedPassword = bcrypt.hashSync(password,salt)
// const token = jwt.sign({user:email},secretKey,{expiresIn:3600})
//     const tempObj = {
//       _id:new Date().getTime().toString(),
//         name : name,
//         phone:phone,
//         email:email,
//         password:hashedPassword,
//         token:token
//     }
//     const options = {
//       expires: new Date(
//          Date.now()+5*24*60*60
//       )
//     }
//     storedData.push(tempObj)

//     res.status(200).cookie("tokenName",token,options).send(tempObj)
//    //  res.status(200).cookie("tokenName",token,options).send(storedData)
//  }

// }


// const login =(req,res)=>{
//    const data = req.body
//    const user = storedData.find((item)=>item.email===data.email)
//    if(user){
//       const validate = bcrypt.compareSync(data.password,user.password)
//       const token = jwt.sign({user:user.email},secretKey,{expiresIn:3600})
//       if(validate){
//          const userInfo = {
//             _id:user.id,
//             email:user.email,
//             password:user.password ,
//             token:token
//          }
//          const options = {
//             expires: new Date(
//                Date.now()+5*24*60*60
//             )
//           }
//          res.status(200).cookie("tokenName",token,options).send(userInfo)
//       } else{
//          res.send("Invalid Password")
//       }
//    }else{
//       res.send("user has not registered")
//    }

// }

// const logout =(req,res)=>{
//    res.cookie("tokenName",{
//       expires:new Date(Date.now())
//   })
//   res.status(200).json({
//       msg:"user LogedOut"
//   })
//    // res.clearCookie("tokenName")
//    //  res.status(200).json({
//    //    msg:"user logged out"
//    //  })
// }

// const auth = (req,res)=>{
//    if(storedData){
//   res.send({storedData})
//    }else{
//       res.send({
//          msg:"no users registered"
//       })
//    }
// }



// module.exports = {signup, login, logout,auth}



const storedData = []

const dotenv = require('dotenv')
dotenv.config()

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const saltNumber = process.env.salt_round
const saltRound = parseFloat(saltNumber)
const secretKey = process.env.secret_key



const signup = (req,res)=>{
 const data = req.body    
 const user = storedData.find((item)=>{
   return item.email=== data.email
 })

 if(user){
    res.send({msg: "user already exist"})
 }else{

const {name,phone,email,password}= data
const salt = bcrypt.genSaltSync(saltRound)
const hashedPassword = bcrypt.hashSync(password,salt)
const token = jwt.sign({user:email},secretKey,{expiresIn:3600})
    const tempObj = {
      _id:new Date().getTime().toString(),
        name : name,
        phone:phone,
        email:email,
        password:hashedPassword,
        token:token
    }
    const options = {
      expires: new Date(
         Date.now()+5*24*60*60
      )
    }
    storedData.push(tempObj)


    res.status(200).cookie("tokenName",token,options).send(tempObj)
  
 }

}


const login =(req,res)=>{
   const data = req.body
//  console.log("the user data",storedData);
   const {email, password}=data;
   // console.log("data from front end",data);

   const user = storedData.find((item)=>{
// console.log("items of user",item.email, email);
return item.email===email
   
   })

   if(user){
      const validate = bcrypt.compareSync(data.password,user.password)
      
      if(validate){
         const token = jwt.sign({user:user.email},secretKey,{expiresIn:3600})
         const userInfo = {
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password ,
            token:token
         }

         const options = {
            expires: new Date(
               Date.now()+5*24*60*60
            )
          }
         res.status(200).cookie("tokenName",token,options).send(userInfo)
      } else{
         res.send("Invalid Password")
      }
   }
   else{
      res.send("user has not registered")
   }

}

const logout =(req,res)=>{
 
   res.cookie("tokenName",{
      expires:new Date(Date.now())
  })
  res.status(200).json({
      msg:"user LogedOut"
  })

}

const auth = (req,res)=>{
   if(storedData){
  res.send({storedData})
   }else{
      res.send({
         msg:"no users registered"
      })
   }
}



module.exports = {signup, login, logout,auth}