const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the list services API", () => {

    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/listService').set('accept-language', 'en').set('token', jsonData.token)
            .send({
                "categoryId": [
                    "604248077508bbd77aa31545",
                    "6034b2f65bbd45688c383c65"
                ],
                "category": "",
                "service": "",
                "sortField": "serviceName",
                "sortOrder": -1,
                "limit": 10,
                "page": 1
            })

        expect(response.statusCode).toBe(200);

    });

})