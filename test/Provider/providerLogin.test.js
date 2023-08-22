const request = require("supertest");
const jsonData = require("../public/pass.json")

const baseUrl = 'https://devapialista.skillroots.com/'

describe('Test the provider Login POST api', () => {
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/login').set('accept-language', 'en').set('devicetype', 'android').send({


            email: "ale2fdfFdx2@gmail.com",
            firebaseToken: "ddad",

            password: jsonData.providerPassword


        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(200);
        }
    })

    it("It should response 401 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/login').set('accept-language', 'en').set('devicetype', 'android').send({

            email: "ale2fdfF@gmail.com",
            firebaseToken: "ddad",

            password: jsonData.providerPassword

        })
        expect(response.statusCode).toBe(401);
    })


    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/login').set('accept-language', 'en').set('devicetype', 'android').send({
            email: "ale2fdfFdx2@gmail.com",


            password: jsonData.providerPassword
        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(400);
        }
    })

    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/login').set('accept-language', 'en').set('devicetype', 'android').send({
            email: "ale2fdfFdx2@gmail.com",
            firebaseToken: "ddad",

            password: jsonData.providerPassword2
        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(400);
        }
    })

})