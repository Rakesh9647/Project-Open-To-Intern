const collegeModel = require('../Models/collegeModel')

const College = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status:false ,message:'The request is not valid as the data are required.'})
        if(!data.name) return res.status(400).send({ status:false ,message:'name is required.'})
        if(!data.fullName) return res.status(400).send({status:false ,message: 'fullName is required'})
        if(!data.logoLink) return res.status(400).send({status: false , message: 'logoLink is required'})
       
        const saveData = await collegeModel.create(data)
        res.status(201).send({ status: true, message: saveData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}


module.exports.College = College