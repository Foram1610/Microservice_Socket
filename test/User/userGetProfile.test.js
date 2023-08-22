const request = require("supertest");
const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the user get user profile API", () => {

    it("It should response 200 to the get method", async () => {

        const response = await request(baseUrl).get('api/v1/user/getUserProfile').set('token', jsonData.token).set('accept-language', 'en')

        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})