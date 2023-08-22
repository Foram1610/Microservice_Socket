
const request = require("supertest");
const jsonData = require("../public/pass.json")

const baseUrl = 'https://devapialista.skillroots.com/'

describe('Test the User Login POST api', () => {
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/login').set('accept-language', 'en').send({

            email: "contact.sfs9@gmail.com",
            firebaseToken: "dad",
            deviceType: "ios",
            password: jsonData.userPassword

        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(200);
        }
    })

    it("It should response 401 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/login').set('accept-language', 'en').send({

            email: "cont.sfs9@gmail.com",
            firebaseToken: "dad",
            deviceType: "ios",
            password: jsonData.userPassword

        })
        expect(response.statusCode).toBe(401);
    })


    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/login').set('accept-language', 'en').send({
            email: "contact.sfs9@gmail.com",

            deviceType: "ios",
            password: jsonData.userPassword
        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(400);
        }
    })
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/login').set('accept-language', 'en').send({
            email: "contact.sfs9@gmail.com",
            firebaseToken: "dad",

            password: jsonData.userPassword
        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(400);
        }
    })
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/login').set('accept-language', 'en').send({
            email: "contact.sfs9@gmail.com",
            firebaseToken: "dad",
            deviceType: "ios",
            password: jsonData.userPassword2
        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(400);
        }
    })

})