const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

describe("Test the getServicesWithFilter API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/service/getUnblockedCountriesByServiceId').set('token', token).set('Accept-Language', 'en')
            .send({
                serviceId: "603ce8be5f17bd23a827fcf7"
            })


        expect(response.statusCode).toBe(200);

    });
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/service/getUnblockedCountriesByServiceId').set('token', token).set('Accept-Language', 'en')
            .send({
                serviceId: ""

            })


        expect(response.statusCode).toBe(400);

    });

})