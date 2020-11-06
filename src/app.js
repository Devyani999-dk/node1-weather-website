const path = require('path')
const express = require('express')    //this variable for loading libraries of npm express
const hbs = require('hbs')
const { response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()       //new variable 'app' to store Express application

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public') //public path
const viewPath = path.join(__dirname,'../templates/views')  //custmising directory location
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')//setup process,need to do tell express which templating engine installed by using this method
app.set('views', viewPath)  //customising the dirctory name from 'views' to 'templates' 
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static( publicDirectoryPath )) //'use' is way to costomize your server


app.get('',(req, res) =>  {
    res.render('index', {
        title: 'Weather',
        name: 'Devyani Kale'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About ',
        name: 'Devyani Kale'
    })

})
app.get('/help',(req, res) => {
    res.render('help' ,{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Devyani Kale'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
     geocode(req.query.address,(error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error })
        }
    forecast(latitude, longitude, (error,forecastData) => {
         if (error) {
            return res.send({ error })
        }
            res.send({
            forecast: forecastData,
            location,
            address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is raining',
    //     location: 'india',
    //     address: req.query.address
    // })
})
app.get('/products',(req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide search term'
        })
    } 

    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req,res) => {
    res.render('4O4', {
        title:'4O4',
        name: 'Devyani kale',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req,res) => {  
    res.render('4O4', {
        title: '4O4',
        name: 'Devyani Kale', 
        errorMessage: 'Page not found'
    })
})//wildcard character '*'for generic 4O4 pg

//app.com 
 //app.com/help
 //app.com/about
 
 app.listen(3000, () => {
     console.log('Server is up on port 3000.')
 })