const express = require('express')
const bodyParser = require('body-parser')
const app = express();

const handleCors = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
}

const port = 8080;
app.use(handleCors)

const isAnimal = (req, res, next) => {
    let input = req.params.input
    const animals = ["jackal", "whale", "worm", "stork", "frog", "fox", "guppy"]

    animals.includes(input) ? res.json({
        status: "sucess,you entered an animal",
        message: true
    }) : next()
}

const errorMessage = (req, res, next) => {
    res.json({
        status: "Are you sure this is an animal ?",
        message: false
    })
}

app.get('/animal/:input', isAnimal, errorMessage)


const getRandomNum = (req, res, next) => {
    let floor = req.query.floor;
    let ceil = req.query.ceil
    // return Math.floor((Math.random() * max) + floor)

    res.json({
        status: "success",
        range: [floor, ceil],
        randPick: Math.floor((Math.random() * ceil) + floor)
    })
};

app.get('/random', getRandomNum)

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}/`);
})