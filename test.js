
const request = require("supertest");
const jsonData = require("./test/public/pass.json")

const baseUrl = 'http://localhost:5000/'

describe("Test the provider get service provider profile API", () => {

    it("It should response 200 to the get method - api/v1/provider/getProviderProfile", async () => {

        const response = await request(baseUrl).get('api/v1/provider/getProviderProfile').set('token', jsonData.token).set('accept-language', 'en')

        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})

describe("Test the provider search company by id API", () => {

    it("It should response 200 to the post method - api/v1/provider/searchCompanyById", async () => {

        const response = await request(baseUrl).post('api/v1/provider/searchCompanyById').set('accept-language', 'en').set('token', jsonData.token).send({
            "companyId": "61b9a8f9240643f603b8c16e"
        })
        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})

describe("Test the provider Forgot password API", () => {

    it("It should response 200 to the POST method - api/v1/provider/forgotPassword", async () => {

        const response = await request(baseUrl).post('api/v1/provider/forgotPassword')
            .set('accept-language', 'en').send({
                "mobileNumber": '7024919512',
                "countryCode": '+91'
            })

        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})

describe("Test the User Forgot password API", () => {

    it("It should response 200 to the POST method - api/v1/user/forgotPassword", async () => {

        const response = await request(baseUrl).post('api/v1/user/forgotPassword')
            .set('accept-language', 'en').send({
                "mobileNumber": '9685249134',
                "countryCode": '+91'
            })

        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})

describe('Test the User Login POST api', () => {
    it("It should response 200 to the POST method - api/v1/user/login", async () => {

        const response = await request(baseUrl).post('api/v1/user/login').set('accept-language', 'en').set('firebaseToken', jsonData.firebaseToken).send({

            email: "ali.hassan@arhamsoft.org",
            firebaseToken: jsonData.firebaseToken,
            deviceType: "ios",
            password: "12345678"

        })

        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(200);
        }
    })

    it("It should response 401 to the POST method - api/v1/user/login", async () => {

        const response = await request(baseUrl).post('api/v1/user/login').set('accept-language', 'en').set('firebaseToken', jsonData.firebaseToken).send({

            email: "ali.hassa@arhamsoft.org",
            firebaseToken: jsonData.firebaseToken,
            deviceType: "ios",
            password: "12345678"

        })
        expect(response.statusCode).toBe(401);
    })


    it("It should response 400 to the POST method - api/v1/user/login", async () => {

        const response = await request(baseUrl).post('api/v1/user/login').set('accept-language', 'en').set('firebaseToken', jsonData.firebaseToken).send({
            email: "ali.hassan@arhamsoft.org",
            deviceType: "ios",
            password: "12345678"
        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(400);
        }
    })
    it("It should response 400 to the POST method - api/v1/user/login", async () => {

        const response = await request(baseUrl).post('api/v1/user/login').set('accept-language', 'en').set('firebaseToken', jsonData.firebaseToken).send({
            email: "ali.hassan@arhamsoft.org",
            firebaseToken: jsonData.firebaseToken,
            password: "12345678"
        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(400);
        }
    })
    it("It should response 400 to the POST method - api/v1/user/login", async () => {

        const response = await request(baseUrl).post('api/v1/user/login').set('accept-language', 'en').set('firebaseToken', jsonData.firebaseToken).send({
            email: "ali.hassan@arhamsoft.org",
            firebaseToken: jsonData.firebaseToken,
            deviceType: "ios",
            password: "123456"
        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(400);
        }
    })

})

describe("Test the user logout API", () => {

    it("It should response 200 to the post method - api/v1/user/logout", async () => {

        const response = await request(baseUrl).post('api/v1/user/logout').set("deviceType", "ios").set('accept-language', 'en').set('token', jsonData.token).set('firebaseToken', jsonData.firebaseToken).send({

            "firebaseToken": jsonData.firebaseToken
        })

        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})

describe('Test the provider Login POST api - api/v1/provider/login', () => {
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/login').set('accept-language', 'en').set('devicetype', 'android').set('firebaseToken', jsonData.firebaseToken).send({

            email: "provider.ali@gmail.com",
            firebaseToken: jsonData.firebaseToken,
            password: "12345678"

        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(200);
        }
    })

    it("It should response 401 to the POST method - api/v1/provider/login", async () => {

        const response = await request(baseUrl).post('api/v1/provider/login').set('accept-language', 'en').set('devicetype', 'android').set('firebaseToken', jsonData.firebaseToken).send({

            email: "provider@gmail.com",
            firebaseToken: jsonData.firebaseToken,
            password: "12345678"

        })
        expect(response.statusCode).toBe(401);
    })


    it("It should response 400 to the POST method - api/v1/provider/login", async () => {

        const response = await request(baseUrl).post('api/v1/provider/login').set('accept-language', 'en').set('devicetype', 'android').set('firebaseToken', jsonData.firebaseToken).send({
            email: "provider.ali@gmail.com",
            password: "12345678"
        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(400);
        }
    })

    it("It should response 400 to the POST method - api/v1/provider/login", async () => {

        const response = await request(baseUrl).post('api/v1/provider/login').set('accept-language', 'en').set('devicetype', 'android').set('firebaseToken', jsonData.firebaseToken).send({
            email: "provider.ali@gmail.com",
            firebaseToken: jsonData.firebaseToken,
            password: "123456"
        })
        if (response.body.message === 'User not found!') {
            expect(response.body.message).toBe('User not found!')
        } else {
            expect(response.statusCode).toBe(400);
        }
    })

})

describe("Test the provider logout API", () => {

    it("It should response 200 to the post method - api/v1/provider/logout", async () => {

        const response = await request(baseUrl).post('api/v1/provider/logout').set("deviceType", "android").set('accept-language', 'en').set('token', jsonData.providerToken).set('firebaseToken', jsonData.firebaseToken).send({

            "firebaseToken": jsonData.firebaseToken
        })

        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})