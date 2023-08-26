const CATEGORY = require('../model/category')
const QUESTION = require('../model/question')

exports.ALLCONTENT = async function(req, res, next) {
    try {
        const allContent = await CATEGORY.find()
        res.status(200).json({
            status : "sucessfully",
            message : "data is found",
            data : allContent
        })
    } catch (error) {
        res.status(404).json({
            status : "No any content",
            message : error.message
        })
    }
};


exports.ADDCONTENT= async function(req, res, next) {
    try {
        if(!req.body.name || !req.body.image){
            throw new error("Please add field")
        }
        const data = await CATEGORY.create(req.body)
        res.status(201).json({
            status : "sucessfully",
            message : "content is added",
            content : data
        })
    } catch (error) {
        res.status(401).json({
            status : "Unauthenticated",
            message : error.message
    })
  }
};

exports.UPDATECONTENT =  async function(req, res, next) {
    try {
      await CATEGORY.findByIdAndUpdate(req.query.id,req.body)
        res.status(200).json({
            status : "sucessfully",
            message : "Content is updated",
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
    })
  }
};

exports.DELETCONTENT = async function(req, res, next) {
    try {
      await CATEGORY.findByIdAndDelete(req.query.id)
        res.status(200).json({
            status : "sucessfully",
            message : "Content is deleted",
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
    })
  }
};

exports.ADDQUESTIONS = async function (req, res, next) {
    try {
        console.log(req.body);
        if (!req.body.question || !req.body.options || !req.body.answer) {
            throw new Error("please enter valid field")
        }
        var ops = req.body.options
        if (ops.length < 1) {
            throw new Error("please enter minimum two options")
        }
        const checkCat = await CATEGORY.findById(req.body.category)
        if (!checkCat) {
            throw new Error("content in not allow")
        }
        const checkAns = ops.includes(req.body.answer)
        if (checkAns === false) {
            throw new Error("please enter valid answer from options")
        }
        const data = await QUESTION.create(req.body)
        res.status(200).json({
            status: "Done",
            message: "Thank you",
            data : data
        })
    } catch (error) {
        res.status(401).json({
            status: "Unauthenticated",
            message: error.message
        })
    }
};

exports.ALLQUESTIONS = async function (req, res, next) {
    try {
        const allQuestion = await QUESTION.find()
        res.status(200).json({
            status: "sucessfully",
            message: "data is found",
            data: allQuestion
        })
    } catch (error) {
        res.status(404).json({
            status: "No any data",
            message: error.message
        })
    }
};

exports.UPDATEQUESTION = async function (req, res, next) {
    try {
        const getData = await QUESTION.findById(req.params.id)
        var data = {...getData._doc, ...req.body}
        // console.log("ops", data);
        const ops = data.options
        // console.log(ops, data.answer);
        // return res.send("test")
        if (ops.length < 1) {
            throw new Error("please enter minimum two options")
        }
        const checkCat = await CATEGORY.findById(data.category)
        if (!checkCat) {
            throw new Error("content in not allow")
        }
        const checkAns = ops.includes(data.answer)
        if (checkAns === false) {
            throw new Error("please enter valid answer from options")
        }
        await QUESTION.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            status: "sucessfully",
            message: "question is updated",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};

exports.DELETQUESTION = async function (req, res, next) {
    try {
        await QUESTION.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "sucessfully",
            message: "question is deleted",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};

exports.SEARCH = async function (req, res, next) {
    try {
        const data = await QUESTION.find({category: {$eq:req.params.category}})
        res.status(200).json({
            status: "sucessfully",
            message: "Data is found",
            data : data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};



exports.ALLDATA = async function (req, res, next) {
    try {
        const allQuestion = await QUESTION.find().populate('category')
        res.status(200).json({
            status: "sucessfully",
            message: "data is   found",
            data: allQuestion
        })
    } catch (error) {
        res.status(404).json({
            status: "No any data",
            message: error.message
        })
    }
};
