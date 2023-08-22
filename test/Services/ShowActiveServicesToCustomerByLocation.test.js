const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

describe("Test the getServicesWithFilter API", () => {

    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/showActiveServiceToCustomerByLocation').set('token', token).set('Accept-Language', 'en')
            .send({
                "latitude": 25.754853531661578,
                "longitude": 89.26691443391533,
                "page": 1,
                "limit": 10

            })

        expect(response.statusCode).toBe(200);

    });
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/showActiveServiceToCustomerByLocation').set('token', token).set('Accept-Language', 'en')
            .send({
                "latitude": 25.754853531661578,
                "longitude": 89.26691443391533

            })


        expect(response.statusCode).toBe(200);

    });
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/showActiveServiceToCustomerByLocation').set('token', token).set('Accept-Language', 'en')
            .send({
                "latitude": 25.754853531661578,


            })


        expect(response.statusCode).toBe(400);

    });
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/showActiveServiceToCustomerByLocation').set('token', token).set('Accept-Language', 'en')
            .send({

                "longitude": 89.26691443391533

            })


        expect(response.statusCode).toBe(400);

    });
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/showActiveServiceToCustomerByLocation').set('token', token).set('Accept-Language', 'en')
            .send({


            })


        expect(response.statusCode).toBe(400);

    });
})