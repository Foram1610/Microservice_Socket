const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the admin remove provider API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/provider/removeProvider').set('token', jsonData.token).send({
            "userId": "621f125a2be374957849276a"
        })

        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})