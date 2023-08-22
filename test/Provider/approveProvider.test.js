const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the admin approve provider API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/provider/approveProvider').set('token', jsonData.token).send({
            "accountStatus": "approved",
            "userId": "6359194daaa897545c48f5bd"
        })

        if (response.body.message === 'ALREADY_APPROVED') {
            expect(response.body.message).toBe('ALREADY_APPROVED')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})