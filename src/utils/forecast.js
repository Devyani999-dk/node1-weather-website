
const request = require('request')


const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=97efe25673cd71b0b9d20830bf2c25c4&query=' + latitude + ',' + longitude + '&units=f'

        request({url: url, json: true}, (error, { body }) => {
           
          if(error) {
             callback('Unable to connect to weather service!', undefined)
           } else if (body.error) {
              callback('Unable to find location', undefined)
           } else {
              callback(undefined, body.current.weather_descriptions[0] + ", It is currently " + body.current.temperature + " degreesout. It feels Like " + body.current.temperature + " degrees out ")
           }
         })
        }
         module.exports = forecast    