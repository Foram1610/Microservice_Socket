const request = require("supertest");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for status code 400 cases
const data = [
    {

        page: 1,
        limit: 3,
        sortField: "createdAt",
        sortOrder: -1
    }, {

        language: "en",
        limit: 3,
        sortField: "createdAt",
        sortOrder: -1
    },
    {

        language: "en",
        page: 1,
        sortField: "createdAt",
        sortOrder: -1
    },
    {

        language: "en",
        page: 1,
        limit: 3,
        sortOrder: -1
    },
    {

        language: "en",
        page: 1,
        limit: 3,
        sortField: "createdAt",

    }
]



const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the get cities with filter API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/city/getCitiesWithFilter').set('token', token)
            .send({
                country: "",
                governate: "",
                city: "",
                language: "en",
                page: 1,
                limit: 3,
                sortField: "createdAt",
                sortOrder: -1
            })



        expect(response.statusCode).toBe(200);


    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/city/getCitiesWithFilter').set('token', token)
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });




})