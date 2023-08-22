const request = require("supertest");


// data for status code 400 cases

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'


const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the pblock category location API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/category/blockCategoryLocation').set('token', token)
            .send({
                categoryId: "604085e17508bbd77add1f89"
            })



        expect(response.statusCode).toBe(200);


    });





})