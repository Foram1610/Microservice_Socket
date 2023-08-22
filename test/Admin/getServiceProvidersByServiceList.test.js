const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'


describe("Test the admin get service providers by service id API", () => {


    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/user/getServiceProviderByServiceIdList').set('token', token).send({
            "serviceId": ["603ce93a5f17bd23a827fcf8", "603cc5b44cf9b71e78182f98"]
        })


        expect(response.statusCode).toBe(200);

    });

})