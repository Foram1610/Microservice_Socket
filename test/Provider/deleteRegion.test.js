const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the delete region API", () => {

    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/region/deleteRegion').set('accept-language', 'en').set('token', jsonData.token).send({
            "regionId": "6080f9b67174e5d66d3cf2d3"
        })

        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})