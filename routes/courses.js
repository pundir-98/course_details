const express = require('express')
const router = express.Router()
const  Course= require('../models/course')



router.get('/:id', getCourse, (req, res) => {
    res.send(res.course)
})


router.post('/', async (req, res) => {
    const course = new Course({
        name: req.body.name,
        price: req.body.price
    })
    try{
        const newCourse = await course.save()
        res.status(201).json(newCourse)
    }catch (err){
        res.status(400).json({'message': err.message})
    }
})

router.patch('/:id',getCourse, async(req, res) => {
    if (res.body.name != null){
        res.course.name = res.body.name
    }
    if (res.body.price != null){
        res.course.price = res.body.price
    }try{
        const updatedCourse = await res.course.save()
        res.json(updatedCourse)
    }catch{
        res.status(404).json({message: err.message})
    }
})

router.delete('/:id',getCourse, async(req, res) => {
    try{
        await res.course.remove()
        res.json({message: 'Deleted course'})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

async function getCourse(req, res, next){
    let course
    try{
        course = await Course.findById(req.params.id)
        if (course == null){
            return res.status(404).json({message: 'cannot find course'})
        }
    }catch (err){
        res.status(500).json({'message': err.message})
    }
    res.course = course
    next()
}

module.exports = router