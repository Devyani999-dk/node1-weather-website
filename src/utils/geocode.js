const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGV2eWFuaWthbGUiLCJhIjoiY2tnOTZ3NmQxMGtnNDJ3bzNlcWdpNnJxeiJ9.3O-DYosTT3zgzE4Ka2aRlw'
   
   request({ url: url,json: true}, (error, {}) => {
      if (error) {
          callback('Unable to connect to location services!',undefined)
         
      } else if (body.features.length === 0) {
         callback('Unable to find location.Try another search.', undefined)

      } else {
          callback(undefined,{
              latitude: body.features[0].center[0],
              longitude: body.features[0].center[1],
              location: body.features[0].place_name
          })
      }
   })
}
module.exports = geocode