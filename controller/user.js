const USER = require('../model/user');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


exports.CHECKJWT = async function (req, res, next) {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization
    if(!token){
      throw new Error("Token not found")
    }
    const decode = jwt.verify(token, process.env.JwtSign)
    // console.log(decode.id);
    const checkUser = await USER.findById(decode.id)
    if(!checkUser){
      throw new Error("user not found")
    }
    next()
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })

  }
};

exports.SIGNUP = async function (req, res, next) {
  try {
    // console.log(req.body);
    if (!req.body.username || !req.body.email || !req.body.password) {
      throw new Error("Please add valid field")
    }
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const data = await USER.create(req.body)
    
    var token = jwt.sign({id: data._id}, process.env.JwtSign)

    res.status(201).json({
      status: "Success",
      message: "New User Created",
      data: data,
      token
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })

  }
};

exports.LOGIN = async function (req, res, next) {
  try {
    const checkUser = await USER.findOne({ email: req.body.email })
    if (!checkUser) {
      throw new Error("Invalid Email")
    }
    const checkPass = await bcrypt.compare(req.body.password, checkUser.password)
    if (!checkPass) {
      throw new Error("Invalid Passsword")
    }
    res.status(200).json({
      status: "Success",
      message: "Login Successful",
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })

  }
};

exports.ALLUSER = async function (req, res, next) {
  try {
    const data = await USER.find()
    res.status(201).json({
      status: "Success",
      message: "Data is found",
      data: data
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })

  }
};

exports.DELETETUSER = async function (req, res, next) {
  try {
    const chekToken = (req.body.id = req.body.token)
    // console.log(chekToken);
    // console.log(req.headers);
    const token = req.headers.authorization
    if( !token   ){
      throw new Error("Token not found")
    }
    await QUESTION.findByIdAndDelete(req.query.id)
        res.status(200).json({
            status: "sucessfully",
            message: "question is deleted",})
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })

  }
};

exports.EDITUSER = async function (req, res, next) {
  try {
    await USER.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
      status: "Suceess",
      message: "user updated",
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};
