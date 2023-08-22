const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the get geo location API", () => {

    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/district/getGeolocationDetails').set('token', jsonData.token)
            .send({
                googleMapDistrictName: "Al Mamurah",
                type: "add"
            })

        expect(response.statusCode).toBe(200);

    });

})