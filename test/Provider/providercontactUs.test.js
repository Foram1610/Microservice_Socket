const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the provider comtact us API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/providerContactUs').set('accept-language', 'en').set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MzJhZDMwYjA4MWIyYWExMmZlMzllMTMiLCJpYXQiOjE2NjM3NTA5ODM0NjF9.57d4ho2rSID9_jcSH46v2WIFAx_fJsE5QezPGHBM1nE").send({

            "name": "Ajeet",
            "subject": "Testing",
            "companyName": "This is not my Company",
            "comments": "This is testing comments"

        })

        expect(response.statusCode).toBe(200);

    });

})