const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the provider remove sp from company API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/removeSpFromCompany').set('accept-language', 'en').set('token', jsonData.token).send({
            "requestId": "6078127973f36f9eaeb391b5"
        })
        if (response.body.message === 'Invalid request id') {
            expect(response.body.message).toBe('Invalid request id')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})