const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the provider get service provider details API", () => {

    it("It should response 200 to the get method", async () => {

        const response = await request(baseUrl).get('api/v1/provider/getServiceProviderDetails/621f1e9a2be3749578492797').set('token', jsonData.token).set('accept-language', 'en')

        expect(response.statusCode).toBe(200);

    });

})