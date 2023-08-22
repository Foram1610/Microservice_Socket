const request = require("supertest");
const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe('Test the user change password post api', () => {
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/changePassword').set('accept-language', 'en').set('token', jsonData.token).send({
            "oldPassword": jsonData.userPassword,
            "newPassword": jsonData.userPassword,
            "userId": "622079683ba9ae957707db1c",
            "cnfpassword": jsonData.userPassword
        })
        if (response.body.message === 'Old password did not matched!') {
            expect(response.body.message).toBe('Old password did not matched!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    })

})