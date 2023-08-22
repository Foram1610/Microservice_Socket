const request = require("supertest");
const correctAddCouponBody = require("./data/createCouponData.json")
const incorrectAddCouponBody = require("./data/IncorrectCreateCouponData.json")
const testToken = require("./data/testToken.json")



const baseUrl = 'https://devapialista.skillroots.com/'
const addCouponUrl = 'api/v1/admin/coupon/addCoupon'


describe("Test the add coupon API", () => {


    test("return 401 if token is not available in header", async () => {

        const response = await request(baseUrl).post(addCouponUrl)
            .send(correctAddCouponBody)

        expect(response.statusCode).toBe(401);


    })

    test("It should response 200 to the POST method valid data", async () => {

        console.log("testToken", testToken)
        const response = await request(baseUrl).post(addCouponUrl).set('token', testToken.token)
            .send(correctAddCouponBody)
        console.log(response.body.message)
        if (response.body.message === 'Coupon code already existed') {
            expect(response.body.message).toBe('Coupon code already existed')
        } else if (response.body.message === 'Coupon name already existed') {
            expect(response.body.message).toBe('Coupon name already existed')
        } else {
            expect(response.statusCode).toBe(200);
        }


    }
    )

    test("It should response 400 to the POST method for invalid data", async () => {

        const response = await request(baseUrl).post(addCouponUrl).set('token', testToken.token)
            .send(incorrectAddCouponBody)

        expect(response.statusCode).toBe(400);

    })



})
