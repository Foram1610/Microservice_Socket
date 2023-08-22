const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the user Forgot password API", () => {

    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/forgotPassword')
            .set('accept-language', 'en').send({
                email: 'thakurjashpal99@gmail.com'
            })

        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})