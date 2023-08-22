const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for 400 cases
const data = [
    {

        country: "",
        governate: "",
        district: "",
        page: 1,
        limit: 10
    },
    {
        language: "en",
        country: "",
        governate: "",
        district: "",

        limit: 10
    },
    {
        language: "en",
        country: "",
        governate: "",
        district: "",
        page: 1,

    }
]
describe("Test the admin get districts with filter API", () => {


    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/district/getDistrictWithFilter').set('token', token).send({
            language: "en",
            country: "",
            governate: "",
            district: "",
            page: 1,
            limit: 10
        })


        expect(response.statusCode).toBe(200);

    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/district/getDistrictWithFilter').set('token', token)
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });


})