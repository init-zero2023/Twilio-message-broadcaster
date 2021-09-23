const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const fs = require("fs")
require('dotenv').config()
const accountSid = process.env.Sid
const authToken = process.env.Token
const client = require('twilio')(accountSid, authToken)
const { v4: uuidv4 } = require('uuid')

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
    var data = fs.readFileSync("contacts.json")
    var myObject = JSON.parse(data)
    for(const id in myObject){
        console.log(myObject[id].mobile)
        client.messages 
        .create({ 
            body:req.body.message, 
            from: 'whatsapp:+14155238886',       
            to: `whatsapp:${myObject[id].mobile}` 
        }) 
        .then(message => console.log(message.sid, message.errorMessage)) 
        .done()
    }
    res.redirect('/')
})

app.post("/addcontact", (req, res)=>{
    fs.readFile('contacts.json', 'utf8', function readFileCallback(err, olddata){
        if (err){
            console.log(err);
        } else {
            let data
            let  id = uuidv4().toString()
            if(olddata === ''){
                console.log("empty object")
                
                let obj = {}
                obj[id] = {
                    mobile: req.body.contact
                }
                data = obj
            }else{
                olddataJson = JSON.parse(olddata)
                olddataJson[id] = {
                    mobile: req.body.contact
                }
                data = olddataJson
            }
        // obj.push({mobile: req.body.contact}); //add some data
        json = JSON.stringify(data); //convert it back to json
        fs.writeFile('contacts.json', json, 'utf8', (something)=>{
            console.log(something)
        }); // write it back 
    }});

    res.redirect("/")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is starting at ${process.env.PORT}`)
})
