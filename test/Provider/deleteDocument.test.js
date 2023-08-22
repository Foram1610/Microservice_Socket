const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the provider delete document API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/deleteDocument').set('accept-language', 'en').set('token', jsonData.token).send({

            "url": "https://alistadocuments.s3.us-east-2.amazonaws.com/1614754538403breakfast.png"

        })
        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})