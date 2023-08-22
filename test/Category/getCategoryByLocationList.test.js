const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'
// false data for status code 400
const data = [{

    "governateId": [
        "6030ada1a74127eb0670f24d"
    ],
    "cityId": [
        "60364ab815b16b414f8e7de5"
    ],
    "countryId": [
        "602cf6c61a998fa202983a05"
    ]
}, {
    "districtId": [
        "604207158e169e830cdc37d7"
    ],

    "cityId": [
        "60364ab815b16b414f8e7de5"
    ],
    "countryId": [
        "602cf6c61a998fa202983a05"
    ]
}, {
    "districtId": [
        "604207158e169e830cdc37d7"
    ],
    "governateId": [
        "6030ada1a74127eb0670f24d"
    ],

    "countryId": [
        "602cf6c61a998fa202983a05"
    ]
}, {
    "districtId": [
        "604207158e169e830cdc37d7"
    ],
    "governateId": [
        "6030ada1a74127eb0670f24d"
    ],
    "cityId": [
        "60364ab815b16b414f8e7de5"
    ]

}
]

describe("Test the admin get category by locationList API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/category/getCategoryByLocationList').set('token', token).send({
            "districtId": [
                "604207158e169e830cdc37d7"
            ],
            "governateId": [
                "6030ada1a74127eb0670f24d"
            ],
            "cityId": [
                "60364ab815b16b414f8e7de5"
            ],
            "countryId": [
                "602cf6c61a998fa202983a05"
            ]
        })

        expect(response.statusCode).toBe(200);

    });

    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/category/getCategoryByLocationList').set('token', token)
            .send(singleData)

        expect(response.statusCode).toBe(400);

    });

})