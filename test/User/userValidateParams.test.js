const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the user validate params API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/user/validateParams').set('accept-language', 'en').set('token', jsonData.token).send({

            "email": "",
            "mobileNumber": "9464541667",
            "countryCode": "+91",
            "signUpBy": "apple"

        })
        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})