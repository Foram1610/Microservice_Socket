const request = require("supertest");
const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for status code 400 case
const invalidData = [
    {
        subject: "Testing",
        email: "ajeet@gmail.com",
        comments: "This is testing comments",
        userType: "user"
    },
    {
        name: "Ajeet",
        email: "ajeet@gmail.com",
        comments: "This is testing comments",
        userType: "user"
    },
    {
        name: "Ajeet",
        subject: "Testing",
        comments: "This is testing comments",
        userType: "user"
    },
    {
        name: "Ajeet",
        subject: "Testing",
        email: "ajeet@gmail.com",
        userType: "user"
    },
    {
        name: "Ajeet",
        subject: "Testing",
        email: "ajeet@gmail.com",
        comments: "This is testing comments",
    },
    {
        name: "Ajeet",
        subject: "Testing",
        email: "ajeetffsg",
        comments: "This is testing comments",
        userType: "user"
    },
    {
        name: "Ajeet",
        subject: "Testing",
        email: "ajeet@gmail.com",
        comments: "This is testing comments",
        userType: "hh"
    },

]

//data for 200 cases
const validData = [
    {
        name: "Ajeet",
        subject: "Testing",
        email: "ajeet@gmail.com",
        comments: "This is testing comments",
        userType: "user"
    },
    {
        name: "Ajeet",
        subject: "Testing",
        email: "ajeet@gmail.com",
        comments: "This is testing comments",
        userType: "provider"
    },
    {
        name: "Ajeet",
        subject: "Testing",
        email: "ajeet@gmail.com",
        comments: "This is testing comments",
        userType: "company"
    },
    {
        name: "Ajeet",
        subject: "Testing",
        email: "ajeet@gmail.com",
        comments: "This is testing comments",
        userType: "individual"
    }
]

describe('Test the user Contact us POST api', () => {
    test.each(validData)("It should response 200 to the POST method", async (data) => {

        const response = await request(baseUrl).post('api/v1/user/contactUs').set('token', token).set('accept-language', 'en').send(data)

        expect(response.statusCode).toBe(200);
    })

    test.each(invalidData)("It should response 400 to the POST method", async (data) => {

        const response = await request(baseUrl).post('api/v1/user/contactUs').set('token', token).set('accept-language', 'en').send(data)
        expect(response.statusCode).toBe(400);
    })

})