const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'


describe("Test the admin get customer query by id API", () => {


    it("It should response 200 to the get method", async () => {

        const response = await request(baseUrl).get('api/v1/admin/getCustomerQueryById/607eb1d4f0a11ebb9c16afcd')


        expect(response.statusCode).toBe(200);

    });

})