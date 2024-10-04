const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjI1ZmY4NWNhLWFlNTUtNDhmNi1hMWFlLWRhY2JjOWM1MmU3YS0xNzI2OTQ2MjUwNDIyIiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiODczODdjZjEtM2NmMi00NzkwLTk1MTItNjU4NTMxNzkzMjk3IiwidHlwZSI6InQifQ.9-Q3K-EfiNM7McuAXKhO7yhQBeXoqCyeHXcpvofFApU'

cypress.run({
  // specs to run here
})
.then((results) => {
  const args = {
    target: TOKEN,
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})