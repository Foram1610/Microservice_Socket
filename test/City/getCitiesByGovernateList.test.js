const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'


describe("Test the admin get cities by governate id API", () => {


    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/city/getCitiesByGovernateIdList').set('token', token).send({
            "governateId": ["6030ada1a74127eb0670f24d", "60312ec18d04f4f97ac9decd"]
        })


        expect(response.statusCode).toBe(200);

    });

})