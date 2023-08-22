const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'


describe("Test the admin get district by city id API", () => {


    it("It should response 200 to the get method", async () => {

        const response = await request(baseUrl).get('api/v1/admin/district/getDistrictsByCity/60364ab815b16b414f8e7de5').set('token', token)


        expect(response.statusCode).toBe(200);

    });

})