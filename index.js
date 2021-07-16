const express = require('express');
var cors = require('cors')
const { db: destinations } = require("./DB");
const {getRandomId} = require("./HELPERS");

const app = express()
app.use(express.json()) //parse req body(json) to object
app.use(cors())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server Listening")
})

app.get('/destinations', function (req, res) {
  res.send(destinations)
})


app.get('/', function (req, res) {
    res.send("Hello World!")
  })

app.post('/destinations', (req, res) => {
    // generate unique id
    const _id = getRandomId();

    const {name, location, url, description}= req.body;

    // go to unsplash to get a photo using name and location extended feature

    // add id as key, req.body as value    
    destinations[_id] = {_id, name, location, url, description};
    res.status(200).send({status: "success"})
})

app.put('/destinations', (req, res) => {
    const { _id } = req.query;
    // if there is no _id offerred in query, return 400 to browser
    if (_id === undefined) {
        return res.status(400).send({message: "?_id required"});
    }

    if (destinations[_id] === undefined) {
        return res.status(410).send({message: "no destination with that id to update"})
    }

    const dest = destinations[_id];
    const {name, location, url, Description} = req.body;

    if (name !== undefined) {
        dest.name = name;
    }
    
    if (location !== undefined) {
        dest.location = location;
    }

    if (url !== undefined) {
        dest.url = url;
    }

    if (Description !== undefined) {
        dest.Description = Description;
    }
    return res.status(200).send({status: "success"})
    
})

app.delete('/destinations', (req, res) => {
    const _id = req.query._id
    if (_id === undefined) {
        return res.status(400).send({message: "?_id required"});
    }

    if (destinations[_id] === undefined) {
        return res.status(410).send({message: "no destination with that id to update"})
    } else {
        delete destinations[_id];
        res.status(200).send({status: "success"})
    }
})
