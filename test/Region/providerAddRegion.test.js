const request = require("supertest");



// data for status code 400 cases
const data = [
    {
        countryId: "",
        governateId: "602a5ecdc069a3796cbaa914",
        cityId: "602a5ecdc069a3796cbaa914",
        districtId: "602a5ecdc069a3796cbaa914",

    },
    {
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "",
        cityId: "602a5ecdc069a3796cbaa914",
        districtId: "602a5ecdc069a3796cbaa914",

    },
    {
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",
        cityId: "",
        districtId: "602a5ecdc069a3796cbaa914",

    },
    {
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",
        cityId: "602a5ecdc069a3796cbaa914",
        districtId: ""


    },

    {
        countryId: "602d0d0c1a998fa000083a07",
        governateId: "602d0d0c1a998fa202983a07",
        cityId: "60364ab815b16b414f8e7de5",
        districtId: "60364af915b16b414f8e7de6",

    },
    {
        countryId: "602cf6c61a998fa202983a05",
        governateId: "602d0d0c1a998fa000083a07",
        cityId: "60364ab815b16b414f8e7de5",
        districtId: "60364af915b16b414f8e7de6",

    },
    {
        countryId: "602cf6c61a998fa202983a05",
        governateId: "602d0d0c1a998fa202983a07",
        cityId: "602d0d0c1a998fa000083a07",
        districtId: "60364af915b16b414f8e7de6",

    },
    {
        countryId: "602cf6c61a998fa202983a05",
        governateId: "602d0d0c1a998fa202983a07",
        cityId: "60364ab815b16b414f8e7de5",
        districtId: "602d0d0c1a998fa000083a07",

    }

]



const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the provider add region API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/region/addRegion').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8').set('accept-language', 'en')
            .send({
                countryId: "602cf6c61a998fa202983a05",
                governateId: "6030ada1a74127eb0670f24d",
                cityId: "60364ab815b16b414f8e7de5",
                districtId: "60364af915b16b414f8e7de6"
            })


        if (response.body.message === 'Region already exist!') {
            expect(response.body.message).toBe('Region already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/provider/region/addRegion').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8').set('accept-language', 'en')
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });







})