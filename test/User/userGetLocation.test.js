const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the user get location API", () => {

    it("It should response 200 to the get method", async () => {

        const response = await request(baseUrl).get('api/v1/user/getLocation').set('accept-language', 'en').set('token', jsonData.token)
        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})