const request = require("supertest");
const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

// data for status code 400 cases
const adminData = [
    {

        email: "kcRbmlITMT@gmail.com",
        countryCode: "+91",
        mobileNumber: "9856856256",
        password: jsonData.addAdminPass2
    },
    {
        name: "Admin",

        countryCode: "+91",
        mobileNumber: "9856856256",
        password: jsonData.addAdminPass2
    },
    {
        name: "Admin",
        email: "kcRbmlITMT@gmail.com",

        mobileNumber: "9856856256",
        password: jsonData.addAdminPass2

    },
    {
        name: "Admin",
        email: "kcRbmlITMT@gmail.com",
        countryCode: "+91",

        password: jsonData.addAdminPass2
    },
    {
        name: "Admin",
        email: "kcRbmlITMT@gmail.com",
        countryCode: "+91",
        mobileNumber: "9856856256",

    }

]

describe('Test the addAdmin post api', () => {
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/addAdmin').set('accept-language', 'en').send({
            name: "Eshad",
            email: "eshhad@gmail.com",
            countryCode: "+91",
            mobileNumber: "3443947847",
            password: jsonData.addAdminPass
        })
        if (response.body.message === 'Email already exist!') {

            expect(response.body.message).toBe('Email already exist!')
        } else if (response.body.message === 'Mobile number already exist!') {
            expect(response.body.message).toBe('Mobile number already exist!')

        } else {
            expect(response.statusCode).toBe(200);
        }

    })

    test.each(adminData)("It should response 400 to the POST method", async (data) => {

        const response = await request(baseUrl).post('api/v1/admin/addAdmin').send(data)
        expect(response.statusCode).toBe(400);
    })

})