const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the admin get cpntent by id API", () => {

    it("It should response 200 to the get method", async () => {

        const response = await request(baseUrl).get('api/v1/admin/pages/getContentById/602b98df2ece0c6e4654da5f').set('token', jsonData.token)

        expect(response.statusCode).toBe(200);

    });

})