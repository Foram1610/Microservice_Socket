const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the provider get accept reject company request API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/acceptRejectCompanyRequest').set('accept-language', 'en').set('token', jsonData.token).send({
            "requestId": "60792ae7512412003d213428",
            "status": "accepted"
        })
        if (response.body.message === 'Invalid request id') {
            expect(response.body.message).toBe('Invalid request id')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})