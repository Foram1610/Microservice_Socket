const request = require("supertest");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for status code 400 cases
const data = [
    {
        name: {

            ar: "موهاليttz"
        },
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",
        cityId: "602a5ecdc069a3796cbaa914",
        status: "active"
    },
    {
        name: {
            en: "Mohalittz",

        },
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",
        cityId: "602a5ecdc069a3796cbaa914",
        status: "active"
    },
    {
        name: {
            en: "Mohalittz",
            ar: "موهاليttz"
        },

        governateId: "602a5ecdc069a3796cbaa914",
        cityId: "602a5ecdc069a3796cbaa914",
        status: "active"
    },
    {
        name: {
            en: "Mohalittz",
            ar: "موهاليttz"
        },
        countryId: "602a4698e51c0b0afa4804f7",

        cityId: "602a5ecdc069a3796cbaa914",
        status: "active"
    },
    {
        name: {
            en: "Mohalittz",
            ar: "موهاليttz"
        },
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",

        status: "active"
    },
    {
        name: {
            en: "Mohalittz",
            ar: "موهاليttz"
        },
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",
        cityId: "602a5ecdc069a3796cbaa914",

    },
]



const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the edit city API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/city/editCity').set('token', token)
            .send({
                name: {
                    en: "Mohalitt",
                    ar: "موهاليtt"
                },
                countryId: "602a4698e51c0b0afa4804f7",
                governateId: "602a5ecdc069a3796cbaa914",
                cityId: "602a5ecdc069a3796cbaa914",
                status: "active"
            })


        if (response.body.message === 'City already exist!') {
            expect(response.body.message).toBe('City already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/city/editCity').set('token', token)
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });



})