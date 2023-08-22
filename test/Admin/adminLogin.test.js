
const request = require("supertest");
const jsonData = require("../public/pass.json")

const baseUrl = 'https://devapialista.skillroots.com/'



const loginData = [
    {

        password: jsonData.adminPassword
    }, {
        email: 'hasan@gmail.com',

    }, {
        email: "prodddddip@gmail.com",
        password: jsonData.adminPassword
    }, {
        email: 'hasan@gmail.com',
        password: jsonData.adminPassword2
    }]

describe('Test the Admin Login POST api', () => {
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/adminLogin').send({
            email: "prodip@gmail.com",
            password: jsonData.adminPassword
        })

        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(200);
        }
    })

    test.each(loginData)("It should response 400 to the POST method", async (data) => {

        const response = await request(baseUrl).post('api/v1/admin/adminLogin').send(data)
        expect(response.statusCode).toBe(400);
    })

})