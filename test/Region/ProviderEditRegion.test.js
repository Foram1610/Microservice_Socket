const request = require("supertest");



const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the provider edit region API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/region/editRegion').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8').set('accept-language', 'en')
            .send({
                countryId: "602d039b1a998fa202983a06",
                governateId: "602d0d0c1a998fa202983a07",
                cityId: "6068dea0233944b2868bf124",
                districtId: "60388d141467697e676ae374",
                regionId: "606ed91388f9538ed7ea8cdd",

            })


        expect(response.statusCode).toBe(200);

    });


})