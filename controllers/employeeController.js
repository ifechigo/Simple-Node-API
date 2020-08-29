const Employee = require('../models/employeeModel')
const { response } = require('express')

//show list of employees
const index = (req, res, next)=>{
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured, cannot show employees list'
        })
    })
}


//show employee data
const show = (req, res, next)=>{
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured, cannot show employee info'
        })
    })
}


//create an employee
const store = (req, res, next)=>{
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    // if(req.file){
    //     employee.avatar = req.file.path
    // }
    if(req.files){
        let path = ''
        req.files.forEach(function(files, index, arr){
            path = path + files.path + ','
        });
        path = path.substring(0, path.lastIndexOf(","))
        employee.avatar = path
    }
    employee.save()
    .then(response => {
        res.json({
            message: 'employee added sucessfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured, cannot add employee'
        })
    })
}


// update an employee
const update = (req, res, next)=>{
    const employeeID = req.body.employeeID

    let updatedEmployee = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedEmployee})

    .then(response => {
        res.json({
            message: 'employee updated sucessfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured, cannot update employee'
        })
    })
}


// delete an employee
const destroy = (req, res, next)=>{
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(()=>{
        res.json({
            message: 'Employee deleted sucessfullly'
        })
    })
    .catch(error => {
        res.json({
            message: ' an error occured, cannot find emloyee to delete'
        })
    })
}


module.exports = {
    index, show, store, update, destroy
}