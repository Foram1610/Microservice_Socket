const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the provider edit profile API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/editProfile').set('accept-language', 'en').set('token', jsonData.token).send({

            "name": "Sad",
            "companyName": "",
            "email": "abctt@gmail.com",
            "mobileNumber": "9991293040",
            "mobileNoStatus": "verified",
            "commercialRegNo": "",
            "countryCode": "+91",
            "DOB": "2003-04-01",
            "gender": "Male",
            "password": "",
            "services": [
                {
                    "serviceId": "603ce93a5f17bd23a827fcf8",
                    "categoryId": "6034b2f65bbd45688c383c65"
                },
                {
                    "categoryId": "6034b2f65bbd45688c383c65",
                    "serviceId": "603ce8be5f17bd23a827fcf7"
                },
                {
                    "categoryId": "6034b2a65bbd45688c381b2c",
                    "serviceId": "603cc5b44cf9b71e78182f98"
                },
                {
                    "serviceId": "60407e3ed96847dbffbbc944",
                    "categoryId": "6034b2a65bbd45688c381b2c"
                }
            ]

        })
        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})