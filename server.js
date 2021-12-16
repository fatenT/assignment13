var express = require('express')
var bodyParser = require('body-parser')

//Listen to requests in server
var app = express()


var http = require('http').Server(app)
var mongoose = require('mongoose')

var dbUrl = 'mongodb+srv://prodesigner:mimididi@inventorymanagementsyst.hruta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//app.use(express.static(__dirname))
app.use(express.static(__dirname))
app.use(bodyParser.json()) //here we are stating what type of data expected to be - in this case JSON
app.use(bodyParser.urlencoded({extended:false})) //we need this line to make sure the object we are passing using post is not returning empty

app.use(express.static(__dirname + '/product/get'))


//to add cors to prevent 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
 


//create a Product variable with capital P to indicate it is a model
var Product = mongoose.model('data', {
    id: Number,
    product: [{
        productid: Number,
        category: String,
        price: Number,
        name: String,
        instock: Boolean
    }]
})


app.get('/', (req, res) => {
   res.send("Express is getting products information!")
})


app.get('/product/get', (req, res) => {
    Product.find({}, (err, data) => { 
        //res.send("Express is getting products information!")
    
        if(err){  
            res.send(err);  
        }  
        else{                
            res.json(data);  
        }
    })
})


app.post('/product/create', async (req, res) => {
    
    try {
    
        var product = new Product(req.body)
        var savedProduct = await product.save() 
        console.log('saved')        
    
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    }
})
          
app.put('/product/update/:id', function(req, res) {
    //console.log(req.params.id)
    //console.log("UPDATE done")
    //console.log(req.body)

   /* Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).then(function(){   console.log("found " + req.params.id)
        //Product.findOne({_id: req.params.id}).then(function(productId){  console.log("found One")
           // res.send() 
            //res.json() 
            //console.log("Updated")
       // })
    })  */ 
    
})


app.delete('/product/delete/:id', async (req, res) => {
    //console.log(req.params.id)
    console.log("deletion done")
    try {
        var deletedProduct = await Product.findByIdAndRemove({_id: req.params.id}).then(function(productId){
            res.send(productId)
            //res.redirect('/');
        })       
    
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    }
    
})



mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log("MongoDB database connection", err)
})

var server = http.listen(5000, () => {
    console.log('Server is listening on port', server.address().port)
})

