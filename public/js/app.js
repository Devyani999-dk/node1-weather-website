console.log('Client side javascript file is loaded!')

//Goal:fetch weather!-->

const weatherForm = document.querySelector('form') //i/p represatation 'weatherform'
const search = document.querySelector('input')    //i/p represatation 'search'     
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From JavaScript'



weatherForm.addEventListener('Submit', (e) => {
    e.preventDefault()

    const location = search.value //value extracts the i/p value which is whatever typed in & just string it in 

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
               
            } 
        })
    })
})

//Goal:Use input value to get weather

