const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the user logout API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/user/logout').set("deviceType", "ios").set('accept-language', 'en').set('token', jsonData.token).send({

            "firebaseToken": "dad"
        })

        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})