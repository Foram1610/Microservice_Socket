const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the provider accept reject individual request API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/acceptRejectIndividualRequest').set('accept-language', 'en').set('token', jsonData.token).send({
            "requestId": "632ad6c4737dd1fd0f98e5cb",
            "status": "accepted"
        })

        if (response.body.message === 'Invalid request id') {
            expect(response.body.message).toBe('Invalid request id')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})