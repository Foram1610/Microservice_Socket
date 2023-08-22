const request = require("supertest");



// data for status code 400 cases
const data = [
    {
        countryId: "",
        governateId: "602a5ecdc069a3796cbaa914",
        cityId: "602a5ecdc069a3796cbaa914",
        districtId: "602a5ecdc069a3796cbaa914",
        status: "active"
    },
    {
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "",
        cityId: "602a5ecdc069a3796cbaa914",
        districtId: "602a5ecdc069a3796cbaa914",
        status: "active"
    },
    {
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",
        cityId: "",
        districtId: "602a5ecdc069a3796cbaa914",
        status: "active"
    },
    {
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",
        cityId: "602a5ecdc069a3796cbaa914",
        districtId: "",
        status: "active"
    },
    {
        countryId: "602a4698e51c0b0afa4804f7",
        governateId: "602a5ecdc069a3796cbaa914",
        cityId: "602a5ecdc069a3796cbaa914",
        districtId: "602a5ecdc069a3796cbaa914",
        status: "",
    },
    {
        countryId: "602d0d0c1a998fa000083a07",
        governateId: "602d0d0c1a998fa202983a07",
        cityId: "60364ab815b16b414f8e7de5",
        districtId: "60364af915b16b414f8e7de6",
        status: "active"
    },
    {
        countryId: "602cf6c61a998fa202983a05",
        governateId: "602d0d0c1a998fa000083a07",
        cityId: "60364ab815b16b414f8e7de5",
        districtId: "60364af915b16b414f8e7de6",
        status: "active"
    },
    {
        countryId: "602cf6c61a998fa202983a05",
        governateId: "602d0d0c1a998fa202983a07",
        cityId: "602d0d0c1a998fa000083a07",
        districtId: "60364af915b16b414f8e7de6",
        status: "active"
    },
    {
        countryId: "602cf6c61a998fa202983a05",
        governateId: "602d0d0c1a998fa202983a07",
        cityId: "60364ab815b16b414f8e7de5",
        districtId: "602d0d0c1a998fa000083a07",
        status: "active"
    },

]



const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the add region API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/region/addRegion').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8')
            .send({
                countryId: "60312e1f8d04f4f97ac9decc",
                governateId: "60387e2a11572d7c757eeefc",
                cityId: "6066e222bbe7309e0c4dd5ed",
                districtId: "604207368e169e830cdc37d8",
                status: "active"
            })


        if (response.body.message === 'Region already exist!') {
            expect(response.body.message).toBe('Region already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/region/addRegion').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8')
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });




})