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
    const animals = ["jackal", "whale", "worm", "stork", "frog", "fox", "guppy", "dog"]

    animals.includes(input) ? res.json({
        status: "success, you entered an animal",
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
    res.json({
        status: "success",
        range: [floor, ceil],
        randPick: Math.floor((Math.random() * ceil) + floor)
    })
};

app.get('/random', getRandomNum)

let names = ['xavier', 'michelle', 'corey', 'reed'];
const peek = (req, res, next) => {
    res.json({
        status: "success",
        data: names[names.length - 1]
    })
}

app.get('/queue/peek', peek)

const enQueue = (req, res, next) => {
    let name = req.query.name
    names.unshift(name);
    res.json({
        status: "success",
        enqueued: name
    })
}
app.get('/queue/enqueue', enQueue)

const cutLAst = (req, res, next) => {
    let deName = names[names.length - 1]
    names.pop()
    res.json({
        status: "success",
        dequeued: deName
    })
    console.log(names);

}
const emptyArr = (req, res, next) => {
    names.length === 0 ? res.json({
        status: "success",
        dequeued: "The array is currently empty"
    }) : next()
}

app.get('/queue/dequeue', emptyArr, cutLAst)
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}/`);
})