const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the provider add employee to company request API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/addEmployeeToCompany').set('accept-language', 'en').set('token', jsonData.token).send({
            "individualId": "621f19ae2be3749578492789"
        })

        if (response.body.message === 'Already requested!') {
            expect(response.body.message).toBe('Already requested!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})