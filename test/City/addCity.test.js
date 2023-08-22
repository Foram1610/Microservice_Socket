const request = require("supertest");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for status code 400 cases
const data = [
    {
        name: {

            ar: "موهاليz"
        },
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",
        status: "active"
    },
    {
        name: {
            en: "Mohaliz",

        },
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",
        status: "active"
    },
    {
        name: {
            en: "Mohaliz",
            ar: "موهاليz"
        },

        governateId: "602a5ecdc069a3796cbaa914",
        status: "active"
    },
    {
        name: {
            en: "Mohaliz",
            ar: "موهاليz"
        },
        countryId: "602a4698e51c0b0afa4804f7",

        status: "active"
    },
    {
        name: {
            en: "Mohaliz",
            ar: "موهاليz"
        },
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",

    },
]



const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the add city API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/city/addCity').set('token', token)
            .send({
                name: {
                    en: "Mohali",
                    ar: "موهالي"
                },
                countryId: "602a4698e51c0b0afa4804f7",
                governateId: "602a5ecdc069a3796cbaa914",
                status: "active"
            })


        if (response.body.message === 'City already exist!') {
            expect(response.body.message).toBe('City already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/city/addCity').set('token', token)
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });

    //enum testing


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/city/addCity').set('token', token)
            .send({
                name: {
                    en: "Mohalix",
                    ar: "موهاليx"
                },
                countryId: "602a4698e51c0b0afa4804f7",
                governateId: "602a5ecdc069a3796cbaa914",
                status: "inactive"
            })


        if (response.body.message === 'City already exist!') {
            expect(response.body.message).toBe('City already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/city/addCity').set('token', token)
            .send({
                name: {
                    en: "Mohalip",
                    ar: "موهاليt"
                },
                countryId: "602a4698e51c0b0afa4804f7",
                governateId: "602a5ecdc069a3796cbaa914",
                status: "ahhh"
            })


        expect(response.statusCode).toBe(400);

    });



})