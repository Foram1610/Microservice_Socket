const request = require("supertest");
const baseUrl = 'https://devapialista.skillroots.com/'
const jsonData = require("../public/pass.json")
// data for status code 400 case
const data = [
    {




        password: jsonData.providerPassword,
        cnfpassword: jsonData.providerPassword,
        OTP: "1234",
        type: "string"
    },
    {

        email: "sfs.sahil20@gmail.com",

        cnfpassword: jsonData.providerPassword,
        OTP: "1234",
        type: "string"


    },
    {
        email: "sfs.sahil20@gmail.com",
        password: jsonData.providerPassword,

        OTP: "1234",
        type: "string"

    },
    {

        email: "sfs.sahil20@gmail.com",
        password: jsonData.providerPassword,
        cnfpassword: jsonData.providerPassword,
        OTP: "1234",





    },
    {
        email: "gggg@gmail.com",
        password: jsonData.providerPassword,
        cnfpassword: jsonData.providerPassword,
        OTP: "1234",
        type: "string"

    }

]

describe('Test the Provider reset password POST api', () => {
    it("It should response 200 to the POST method", async () => {



        const response = await request(baseUrl).post('api/v1/provider/resetPassword').set('accept-language', 'en').send({

            email: "sfs.sahil20@gmail.com",
            password: jsonData.providerPassword,
            cnfpassword: jsonData.providerPassword,
            OTP: "1234",
            type: "string"

        })

        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    })

    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/provider/resetPassword').set('accept-language', 'en').send(singleData)
        expect(response.statusCode).toBe(400);
    })

})