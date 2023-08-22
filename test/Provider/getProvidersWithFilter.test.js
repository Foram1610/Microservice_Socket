const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the admin get provider woth filter API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/provider/getProvidersWithFilter').set('accept-language', 'en').set('token', jsonData.token).send({
            "language": "en",
            "provider": "",
            "country": "",
            "governate": "",
            "city": "",
            "district": "",
            "sortField": "createdAt",
            "sortOrder": 1,
            "limit": 10,
            "page": 1
        })
        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})