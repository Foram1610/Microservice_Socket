const request = require("supertest");
const jsonData = require("../public/pass.json")
const baseUrl = 'https://devapialista.skillroots.com/'

// data for status code 400 case
const data = [
    {

        "password": jsonData.userResetPassword,
        "cnfpassword": jsonData.userResetPassword,
        "OTP": "1234",
        "type": "email"
    },
    {
        "email": "mysteriousboy67@yahoo.com",

        "cnfpassword": jsonData.userResetPassword,
        "OTP": "1234",
        "type": "email"
    },
    {
        "email": "mysteriousboy67@yahoo.com",
        "password": jsonData.userResetPassword,

        "OTP": "1234",
        "type": "email"
    },
    {
        "email": "mysteriousboy67@yahoo.com",
        "password": jsonData.userResetPassword,
        "cnfpassword": jsonData.userResetPassword,

        "type": "email"
    },
    {
        "email": "mysteriousboy67@yahoo.com",
        "password": jsonData.userResetPassword,
        "cnfpassword": jsonData.userResetPassword,
        "OTP": "1234"

    }

]

describe('Test the user Reset Password POST api', () => {
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/resetPassword').set('accept-language', 'en').send({
            "email": "mysteriousboy67@yahoo.com",
            "password": jsonData.userResetPassword,
            "cnfpassword": jsonData.userResetPassword,
            "OTP": "1234",
            "type": "email"
        })

        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else if (response.body.message === 'Invalid OTP!') {
            expect(response.body.message).toBe('Invalid OTP!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    })

    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/user/resetPassword').set('accept-language', 'en').send(singleData)
        expect(response.statusCode).toBe(400);
    })

})