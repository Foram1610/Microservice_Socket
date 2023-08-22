const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the user remove location API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/user/removeLocation').set('accept-language', 'en').set('token', jsonData.token).send({

            "locationId": "6040da40e6db6a60f10f13c5"
        })

        expect(response.statusCode).toBe(200);

    });

})