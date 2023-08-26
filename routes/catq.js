var express = require('express');
var router = express.Router();
var categoryController = require('../controller/control')


// all content
router.get('/all', categoryController.ALLCONTENT);

// Add category //
router.post('/category', categoryController.ADDCONTENT);

// update //
router.patch('/update',categoryController.UPDATECONTENT);

// delet
router.delete('/delete',categoryController.DELETCONTENT);



module.exports = router;
