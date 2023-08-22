const request = require("supertest");
const correctUpdateCouponBody = require("./data/updateCouponData.json")
const incorrectAddCouponBody = require("./data/IncorrectCreateCouponData.json")
const testToken = require("./data/testToken.json")



const baseUrl = 'https://devapialista.skillroots.com/'
const updateCouponUrl = 'api/v1/admin/coupon/updateCoupon/6365798213449f36c049dd33'


describe("Test the update coupon API", () => {


    test("return 401 if token is not available in header", async () => {

        const response = await request(baseUrl).post(updateCouponUrl)
            .send(correctUpdateCouponBody)

        expect(response.statusCode).toBe(401);


    })

    test("It should response 200 to the POST method valid data", async () => {

        console.log("testToken", testToken)
        const response = await request(baseUrl).post(updateCouponUrl).set('token', testToken.token)
            .send(correctUpdateCouponBody)

        expect(response.statusCode).toBe(200);

    }
    )

    test("It should response 400 to the POST method for invalid data", async () => {

        const response = await request(baseUrl).post(updateCouponUrl).set('token', testToken.token)
            .send(incorrectAddCouponBody)

        expect(response.statusCode).toBe(400);

    })



})
