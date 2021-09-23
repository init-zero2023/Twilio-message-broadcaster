const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const fs = require("fs")

const app = express()
const publicPath = path.join(__dirname, "public")
console.log(publicPath)
app.use(express.static(publicPath))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res)=>{
    res.render("index")
})

app.post('/', (req, res)=>{
    console.log(req.body.message)
    res.redirect('/')
})

app.post("/addcontact", (req, res)=>{
   
    // var data = fs.readFileSync("contacts.json")
    // var myObject = JSON.parse(data)
    // console.log(myObject)
    // console.log(typeof(myObject))

    // let currentdata = {
    //     mobile: req.body.contact
    // }

    // // myObject.push(currentdata)

    // var newData = JSON.stringify(myObject);
    // fs.writeFile("contacts.json", newData, (err) => {
    // // Error checking
    // if (err) throw err;
    // console.log("New data added");
    // });
    // console.log(req.body.contact)


    fs.readFile('contacts.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        console.log(Object.entries(obj))
        // obj.push({mobile: req.body.contact}); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('contacts.json', json, 'utf8', callback); // write it back 
    }});

    res.redirect("/")
})

app.listen(3000, ()=>{
    console.log("Server is starting at port 3000")
})
