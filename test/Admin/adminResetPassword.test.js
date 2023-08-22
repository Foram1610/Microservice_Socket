const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'


describe("Test the admin Reset Password API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/resetPassword')
            .send({
                email: 'kcRbmlITMT@gmail.com'
            })


        expect(response.statusCode).toBe(200);

    });
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/resetPassword')
            .send({
                email: "dfggkj@gmail.com"
            })


        expect(response.statusCode).toBe(400);

    });
})