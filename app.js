var express = require("express")
var bodyParser = require("body-parser")
var morgan = require("morgan")
var config = require("./config")
var mongoose = require("mongoose")
var setupController = require("./api/controllers/setupController.js")
var todoController = require("./api/controllers/todoController.js")

var app = express()
var port = process.env.port || 3000 

app.use('/assets', express.static(__dirname + "/public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(morgan("dev"))

app.set('view engine', 'ejs')

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect(config.getConnectionString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB successfully");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

setupController(app)
todoController(app)

app.get('/', function (req, res) {
    res.render('index')
})

app.listen(port, function() {
    console.log("Server listening on : ", port)
})