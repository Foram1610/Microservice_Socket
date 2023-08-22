const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'


describe("Test the register provider API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/region/getAllRegionsWithFilter').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8')
            .send({
                language: 'en',
                country: "",
                governate: "INDIA",
                city: "",
                district: "",
                sortField: "createdAt",
                sortOrder: 1,
                limit: 10,
                page: 1

            })


        expect(response.statusCode).toBe(200);

    });
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/region/getAllRegionsWithFilter').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8')
            .send({

                country: "",
                governate: "INDIA",
                city: "",
                district: "",
                sortField: "createdAt",
                sortOrder: 1,
                limit: 10,
                page: 1
            })


        expect(response.statusCode).toBe(400);

    });
})