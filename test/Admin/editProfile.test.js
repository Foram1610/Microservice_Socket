const request = require("supertest");
const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe('Test the edit profile post api', () => {
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/editProfile').set('token', jsonData.token).send({
            "email": "prodip@gmail.com",
            "password": jsonData.adminPassword
        })
        if (response.body.message === 'Email already exist!') {

            expect(response.body.message).toBe('Email already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    })

})