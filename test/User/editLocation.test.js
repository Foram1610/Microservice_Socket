const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the user edit location API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/user/editLocation').set('accept-language', 'en').set('token', jsonData.token).send({

            "locationId": "603f5833f4cd2a5fa594cf6c",
            "countryId": "602d039b1a998fa202983a06",
            "governateId": "602d0d0c1a998fa202983a07",
            "cityId": "6068dea0233944b2868bf124",
            "districtId": "6068dec8233944b2868bf125",
            "countryName": "indiawww",
            "governateName": "punjab",
            "cityName": "mohali",
            "districtName": "mohali",
            "addressLine1": "asdfasd",
            "street": "asf",
            "houseNumber": "asdfsdf",
            "appartment": "asdfasdf",
            "floor": "asfa",
            "landmark": "asdf",
            "tag": "safasf",
            "latitude": "34.4",
            "longitude": "34.8"
        })

        expect(response.statusCode).toBe(200);

    });

})