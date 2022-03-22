const express = require('express');
const { Router } = require('express');
const collegeController = require('../Controller/collegeController')
const internController = require('../Controller/internController')
const router = express.Router();

const collegeModel = require('../Models/collegeModel')

router.post("/colleges", collegeController.College) 

router.post('/interns', internController.Intern)

router.get('/collegeDetail', internController.getDetail)




module.exports = router;