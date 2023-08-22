const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the user change default location API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/user/changeDefaultLocation').set('accept-language', 'en').set('token', jsonData.token).send({

            "locationId": "603f5b5d35fdc06547e83e16"
        })

        expect(response.statusCode).toBe(200);

    });

})