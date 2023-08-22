const request = require("supertest");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for status code 400 cases
const data = [
    {
        name: {

            ar: "Nikunja"
        },
        googleMapDistrictName: "Mirpur মিরপুর Dhaka",
        countryId: "602cf6c61a998fa202983a05",
        cityId: "60364ab815b16b414f8e7de5",
        governateId: "6030ada1a74127eb0670f24d",
        districtId: "61d93f47bf9c9469eb97021d",
        status: "active"

    },
    {
        name: {
            en: "Nikunja 3",

        },
        googleMapDistrictName: "Mirpur মিরপুর Dhaka",
        countryId: "602cf6c61a998fa202983a05",
        cityId: "60364ab815b16b414f8e7de5",
        governateId: "6030ada1a74127eb0670f24d",
        districtId: "61d93f47bf9c9469eb97021d",
        status: "active"

    },
    {
        name: {
            en: "Nikunja 3",
            ar: "Nikunja"
        },

        countryId: "602cf6c61a998fa202983a05",
        cityId: "60364ab815b16b414f8e7de5",
        governateId: "6030ada1a74127eb0670f24d",
        districtId: "61d93f47bf9c9469eb97021d",
        status: "active"

    },
    {
        name: {
            en: "Nikunja 3",
            ar: "Nikunja"
        },
        googleMapDistrictName: "Mirpur মিরপুর Dhaka",

        cityId: "60364ab815b16b414f8e7de5",
        governateId: "6030ada1a74127eb0670f24d",
        districtId: "61d93f47bf9c9469eb97021d",
        status: "active"

    },
    {
        name: {
            en: "Nikunja 3",
            ar: "Nikunja"
        },
        googleMapDistrictName: "Mirpur মিরপুর Dhaka",
        countryId: "602cf6c61a998fa202983a05",

        governateId: "6030ada1a74127eb0670f24d",
        districtId: "61d93f47bf9c9469eb97021d",
        status: "active"

    },
    {
        name: {
            en: "Nikunja 3",
            ar: "Nikunja"
        },
        googleMapDistrictName: "Mirpur মিরপুর Dhaka",
        countryId: "602cf6c61a998fa202983a05",
        cityId: "60364ab815b16b414f8e7de5",

        districtId: "61d93f47bf9c9469eb97021d",
        status: "active"

    },
    {
        name: {
            en: "Nikunja 3",
            ar: "Nikunja"
        },
        googleMapDistrictName: "Mirpur মিরপুর Dhaka",
        countryId: "602cf6c61a998fa202983a05",
        cityId: "60364ab815b16b414f8e7de5",
        governateId: "6030ada1a74127eb0670f24d",

        status: "active"

    },
    {
        name: {
            en: "Nikunja 3",
            ar: "Nikunja"
        },
        googleMapDistrictName: "Mirpur মিরপুর Dhaka",
        countryId: "602cf6c61a998fa202983a05",
        cityId: "60364ab815b16b414f8e7de5",
        governateId: "6030ada1a74127eb0670f24d",
        districtId: "61d93f47bf9c9469eb97021d",


    },
]



const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the edit district API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/district/editDistrict').set('token', token)
            .send({
                name: {
                    en: "Nikunja 3",
                    ar: "Nikunja"
                },
                googleMapDistrictName: "Mirpur মিরপুর Dhaka",
                countryId: "602cf6c61a998fa202983a05",
                cityId: "60364ab815b16b414f8e7de5",
                governateId: "6030ada1a74127eb0670f24d",
                districtId: "61d93f47bf9c9469eb97021d",
                status: "active"

            }

            )


        if (response.body.message === 'District already exist!') {
            expect(response.body.message).toBe('District already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/district/editDistrict').set('token', token)
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });





})