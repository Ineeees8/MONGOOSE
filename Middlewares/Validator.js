const {check , validationResult} = require('express-validator');

exports.registerValidator=()=>[
check ("firstname" , "Please check your first name!").not().isEmpty(),
check ( "name" , "Please check your name!").not().isEmpty(),
check ( "email" , "Please check your email!").isEmail(),
check ( "password", "Please check your password!").isLength({min:6})


]

exports.loginValidator=()=>[
check ( "email" , "Please check your email!").isEmail(),
check ( "password", "Please check your password!").isLength({min:6}) 
]

exports.validation = (req , res , next) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next()
}