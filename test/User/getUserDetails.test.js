const request = require("supertest");
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'
const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the get user details API", () => {
    it("It should response 200 to the GET method", async () => {

        const response = await request(baseUrl).get('api/v1/user/getUserDetails/6034e578a9eb7c1dd90664cd').set('token', token).set('accept-language', 'en')

        expect(response.statusCode).toBe(200);


    });


})