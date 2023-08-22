const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the user add location API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/user/addLocation').set('accept-language', 'en').set('token', jsonData.token).send({

            "countryId": "602d039b1a998fa202983a06",
            "governateId": "602d0d0c1a998fa202983a07",
            "cityId": "6068dea0233944b2868bf124",
            "districtId": "6068dec8233944b2868bf125",
            "addressLine1": "عنوان",
            "street": "عنوان",
            "houseNumber": "عنوان",
            "appartment": "عنوان",
            "floor": "عنوان",
            "landmark": "عنوان",
            "tag": "HOME",
            "latitude": "34.4",
            "longitude": "34.8"
        })

        expect(response.statusCode).toBe(200);

    });

})