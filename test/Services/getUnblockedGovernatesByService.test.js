const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for status code 400 cases
const data = [
    {
        serviceId: "603ce8be5f17bd23a827fcf7",
        countryId: ""

    },
    {
        serviceId: "",
        countryId: "602d039b1a998fa202983a06"
    },
    {
        serviceId: "",
        countryId: ""

    }
]



describe("Test the getServicesWithFilter API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/service/getUnblockedGovernatesByService').set('token', token).set('Accept-Language', 'en')
            .send({
                "serviceId": "603ce8be5f17bd23a827fcf7",
                "countryId": "602d039b1a998fa202983a06"
            })


        expect(response.statusCode).toBe(200);

    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/service/getUnblockedGovernatesByService').set('token', token).set('Accept-Language', 'en')
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });


})