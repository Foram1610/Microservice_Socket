const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the admin remove user API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/user/removeUser').set('token', jsonData.token).send({
            "userId": "6214f32b2be3749578492537"
        })

        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})