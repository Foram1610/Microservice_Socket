const request = require("supertest");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for status code 400 cases
const data = [
    {
        name: {

            ar: "الصين"
        },
        status: "active"

    },
    {
        name: {
            en: "China",

        },
        status: "active"
    },
    {
        name: {
            en: "China",
            ar: "الصين"
        }

    }
]



const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the add country API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/country/addCountry').set('token', token)
            .send({
                name: {
                    en: "China",
                    ar: "الصين"
                },
                status: "active"
            })


        if (response.body.message === 'Country already exist!') {
            expect(response.body.message).toBe('Country already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/country/addCountry').set('token', token)
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });

    //enum testing


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/country/addCountry').set('token', token)
            .send({
                name: {
                    en: "China",
                    ar: "الصين"
                },
                status: "inactive"
            })


        if (response.body.message === 'Country already exist!') {
            expect(response.body.message).toBe('Country already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/country/addCountry').set('token', token)
            .send({
                name: {
                    en: "China",
                    ar: "الصين"
                },
                status: "ghhh"
            })


        expect(response.statusCode).toBe(400);

    });



})