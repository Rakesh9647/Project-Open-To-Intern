const internModel = require("../Models/internModel")
const collegeModel = require("../Models/collegeModel")
const express = require('express');
const { Router } = require('express');
const router = express.Router();

//CREATE INTERN-
const Intern = async function (req, res) {
    try {
        let data = req.body
        let collegeId = req.body.collegeId
        if (Object.keys(data).length == 0) return res.status(400).send({ status:false ,message:'The request is not valid as the data are required.'})
        if(!collegeId) return res.status(400).send({ status:false ,message:'collegeId is required.'})
        if(!data.name) return res.status(400).send({ status:false ,message:'name is required.'})
        let collegeDetail = await collegeModel.findById(collegeId)
        if (!collegeDetail) return res.status(404).send({status:false, message:'The request is not valid as no intern is present with  given collage id'})
        let createNewIntern = await internModel.create(data)
        res.status(201).send({ status:true , data:createNewIntern })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({status:false , message: err.message })
    }
}

const getDetail = async function (req, res) {
    try {
        let coll_name = req.query.collegeName
        if(!coll_name){
            return res.status(400).send({status:false,  msg: "college name must be persent"})
        }
        let dataOne = await collegeModel.findOne({ name: coll_name })
        if (!dataOne) {
           return res.status(404).send({ status: false, message: "collage is not present" });
        }
        let data = JSON.parse(JSON.stringify(dataOne))
        const C_id = dataOne._id
        let interns = await internModel.find({ collegeId:C_id}).select({_id:true,name:true,email:true,mobile:true})
         data = {name:dataOne.name,fullName:dataOne.fullName,logoLink:dataOne.logoLink}
        data.interest = [...interns]
        res.status(200).send({status:true,data:data});
    }
        catch (err) {
            console.log(err)
            res.status(500).send({status:false , message: err.message })
        }
    }





module.exports.Intern = Intern
 module.exports.getDetail = getDetail

