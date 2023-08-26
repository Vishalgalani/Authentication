var express = require('express');
var router = express.Router();
var queController = require('../controller/control')
var userController = require('../controller/user')

// all questions
router.get('/all', queController.ALLQUESTIONS);

// add questions
router.post('/add', queController.ADDQUESTIONS);

// update questions
router.patch('/update/:id', queController.UPDATEQUESTION);

// delete questions
router.delete('/delete/:id', queController.DELETQUESTION);

 // search questions by category
 router.get('/search/:category', queController.SEARCH);
 
// alldata
router.get('/data', queController.ALLDATA);

module.exports = router;

