const request = require("supertest");

// data for status code 400 cases
const data = [
    {
        "warrantyId": "635e4fd300acaf24b84c1888",
        "periodType": "date_time",
        "locations": [{
            "countryId": "602cf6c61a998fa202983a05",
            "governateId": "6030ada1a74127eb0670f24d",
            "cityId": "60364ab815b16b414f8e7de5",
            "districtId": "60364af915b16b414f8e7de6"
        }],
        "tasks": [{
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc3ffdf04506dde34b759"

        },
        {
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc40cdf04506dde34b76d"

        }],
        "serviceProviders": [
            "605daad71b5bbb0032172c28"
        ],
        "schedule": {
            "startDate": "",
            "endDate": "",
            "startTime": "",
            "endTime": "",
            "defaultWarrantyAfterScheduleEnds": ""
        },
        "period": {
            "startDate": "2022-10-18",
            "endDate": "2022-10-18",
            "startTime": "20:09",
            "endTime": "20:09"

        }
    },
    {
        "warrantyId": "635e4fd300acaf24b84c1888",
        "warrantyName": "testUpff",

        "locations": [{
            "countryId": "602cf6c61a998fa202983a05",
            "governateId": "6030ada1a74127eb0670f24d",
            "cityId": "60364ab815b16b414f8e7de5",
            "districtId": "60364af915b16b414f8e7de6"
        }],
        "tasks": [{
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc3ffdf04506dde34b759"

        },
        {
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc40cdf04506dde34b76d"

        }],
        "serviceProviders": [
            "605daad71b5bbb0032172c28"
        ],
        "schedule": {
            "startDate": "",
            "endDate": "",
            "startTime": "",
            "endTime": "",
            "defaultWarrantyAfterScheduleEnds": ""
        },
        "period": {
            "startDate": "2022-10-18",
            "endDate": "2022-10-18",
            "startTime": "20:09",
            "endTime": "20:09"

        }
    },
    {
        "warrantyId": "635e4fd300acaf24b84c1888",
        "warrantyName": "testUpff",
        "periodType": "date_time",

        "tasks": [{
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc3ffdf04506dde34b759"

        },
        {
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc40cdf04506dde34b76d"

        }],
        "serviceProviders": [
            "605daad71b5bbb0032172c28"
        ],
        "schedule": {
            "startDate": "",
            "endDate": "",
            "startTime": "",
            "endTime": "",
            "defaultWarrantyAfterScheduleEnds": ""
        },
        "period": {
            "startDate": "2022-10-18",
            "endDate": "2022-10-18",
            "startTime": "20:09",
            "endTime": "20:09"

        }
    },
    {
        "warrantyId": "635e4fd300acaf24b84c1888",
        "warrantyName": "testUpff",
        "periodType": "date_time",
        "locations": [{
            "countryId": "602cf6c61a998fa202983a05",
            "governateId": "6030ada1a74127eb0670f24d",
            "cityId": "60364ab815b16b414f8e7de5",
            "districtId": "60364af915b16b414f8e7de6"
        }],

        "serviceProviders": [
            "605daad71b5bbb0032172c28"
        ],
        "schedule": {
            "startDate": "",
            "endDate": "",
            "startTime": "",
            "endTime": "",
            "defaultWarrantyAfterScheduleEnds": ""
        },
        "period": {
            "startDate": "2022-10-18",
            "endDate": "2022-10-18",
            "startTime": "20:09",
            "endTime": "20:09"

        }
    },
    {
        "warrantyId": "635e4fd300acaf24b84c1888",
        "warrantyName": "testUpff",
        "periodType": "date_time",
        "locations": [{
            "countryId": "602cf6c61a998fa202983a05",
            "governateId": "6030ada1a74127eb0670f24d",
            "cityId": "60364ab815b16b414f8e7de5",
            "districtId": "60364af915b16b414f8e7de6"
        }],
        "tasks": [{
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc3ffdf04506dde34b759"

        },
        {
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc40cdf04506dde34b76d"

        }],

        "schedule": {
            "startDate": "",
            "endDate": "",
            "startTime": "",
            "endTime": "",
            "defaultWarrantyAfterScheduleEnds": ""
        },
        "period": {
            "startDate": "2022-10-18",
            "endDate": "2022-10-18",
            "startTime": "20:09",
            "endTime": "20:09"

        }
    },
    {
        "warrantyId": "635e4fd300acaf24b84c1888",
        "warrantyName": "testUpff",
        "periodType": "date_time",
        "locations": [{
            "countryId": "602cf6c61a998fa202983a05",
            "governateId": "6030ada1a74127eb0670f24d",
            "cityId": "60364ab815b16b414f8e7de5",
            "districtId": "60364af915b16b414f8e7de6"
        }],
        "tasks": [{
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc3ffdf04506dde34b759"

        },
        {
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc40cdf04506dde34b76d"

        }],
        "serviceProviders": [
            "605daad71b5bbb0032172c28"
        ],

        "period": {
            "startDate": "2022-10-18",
            "endDate": "2022-10-18",
            "startTime": "20:09",
            "endTime": "20:09"

        }
    },
    {
        "warrantyId": "635e4fd300acaf24b84c1888",
        "warrantyName": "testUpff",
        "periodType": "date_time",
        "locations": [{
            "countryId": "602cf6c61a998fa202983a05",
            "governateId": "6030ada1a74127eb0670f24d",
            "cityId": "60364ab815b16b414f8e7de5",
            "districtId": "60364af915b16b414f8e7de6"
        }],
        "tasks": [{
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc3ffdf04506dde34b759"

        },
        {
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc40cdf04506dde34b76d"

        }],
        "serviceProviders": [
            "605daad71b5bbb0032172c28"
        ],
        "schedule": {
            "startDate": "",
            "endDate": "",
            "startTime": "",
            "endTime": "",
            "defaultWarrantyAfterScheduleEnds": ""
        }

    },
    {

        "warrantyName": "testUpff",
        "periodType": "date_time",
        "locations": [{
            "countryId": "602cf6c61a998fa202983a05",
            "governateId": "6030ada1a74127eb0670f24d",
            "cityId": "60364ab815b16b414f8e7de5",
            "districtId": "60364af915b16b414f8e7de6"
        }],
        "tasks": [{
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc3ffdf04506dde34b759"

        },
        {
            "categoryId": "6034b2f65bbd45688c383c65",
            "serviceId": "603cc5b44cf9b71e78182f98",
            "taskId": "62dbc40cdf04506dde34b76d"

        }],
        "serviceProviders": [
            "605daad71b5bbb0032172c28"
        ],
        "schedule": {
            "startDate": "",
            "endDate": "",
            "startTime": "",
            "endTime": "",
            "defaultWarrantyAfterScheduleEnds": ""
        },
        "period": {
            "startDate": "2022-10-18",
            "endDate": "2022-10-18",
            "startTime": "20:09",
            "endTime": "20:09"

        }
    }

]

const baseUrl = 'https://devapialista.skillroots.com/'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"

describe("Test the edit warranty API", () => {

    it("It should response 200 to the Patch method", async () => {

        const response = await request(baseUrl).patch('api/v1/admin/warranty/editWarranty').set('token', token)
            .send({
                "warrantyId": "635e4fd300acaf24b84c1888",
                "warrantyName": "testUpff",
                "periodType": "date_time",
                "locations": [{
                    "countryId": "602cf6c61a998fa202983a05",
                    "governateId": "6030ada1a74127eb0670f24d",
                    "cityId": "60364ab815b16b414f8e7de5",
                    "districtId": "60364af915b16b414f8e7de6"
                }],
                "tasks": [{
                    "categoryId": "6034b2f65bbd45688c383c65",
                    "serviceId": "603cc5b44cf9b71e78182f98",
                    "taskId": "62dbc3ffdf04506dde34b759"

                },
                {
                    "categoryId": "6034b2f65bbd45688c383c65",
                    "serviceId": "603cc5b44cf9b71e78182f98",
                    "taskId": "62dbc40cdf04506dde34b76d"

                }],
                "serviceProviders": [
                    "605daad71b5bbb0032172c28"
                ],
                "schedule": {
                    "startDate": "",
                    "endDate": "",
                    "startTime": "",
                    "endTime": "",
                    "defaultWarrantyAfterScheduleEnds": ""
                },
                "period": {
                    "startDate": "2022-10-18",
                    "endDate": "2022-10-18",
                    "startTime": "20:09",
                    "endTime": "20:09"

                }
            }
            )

        if (response.body.message === 'WARRANTY_ALREADY_EXIST') {
            expect(response.body.message).toBe('WARRANTY_ALREADY_EXIST')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });
    test.each(data)("It should response 400 to the PATCH method", async (singleData) => {

        const response = await request(baseUrl).patch('api/v1/admin/warranty/editWarranty').set('token', token)
            .send(singleData)

        expect(response.statusCode).toBe(400);

    });

})