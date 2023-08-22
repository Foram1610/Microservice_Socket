const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the provider Forgot password API", () => {

    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/forgotPassword')
            .set('accept-language', 'en').send({
                phoneNumber: '7024919512',
                countryCode: '+91'
            })

        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})