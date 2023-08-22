const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the admin get categories API", () => {

    it("It should response 200 to the get method", async () => {

        const response = await request(baseUrl).get('api/v1/admin/category/getCategories').set('token', jsonData.token)

        expect(response.statusCode).toBe(200);

    });

})