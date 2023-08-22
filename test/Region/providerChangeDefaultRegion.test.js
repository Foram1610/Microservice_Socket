const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'


describe("Test the provider change default region API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/region/changeDefaultRegion').set('token', token).set('accept-language', 'en')
            .send({
                regionId: "606ed8f488f9538ed7ea8cdc"
            })


        expect(response.statusCode).toBe(200);

    });

})