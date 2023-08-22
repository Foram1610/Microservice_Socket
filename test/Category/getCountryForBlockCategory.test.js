const request = require("supertest");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for status code 400 cases
const data = [
    {

        limit: 2
    },
    {

        page: 1,

    }
]



const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the get Country for blocked category API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/category/getCountryForBlockCategory').set('token', token)
            .send({
                searchValue: "",
                page: 1,
                limit: 2
            })



        expect(response.statusCode).toBe(200);


    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/category/getCountryForBlockCategory').set('token', token)
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });



})