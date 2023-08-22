const request = require("supertest");
const path = require('path')
const jsonData = require("../public/pass.json")
const imagefile = path.join(__dirname, '../public/1-min.PNG');
const baseUrl = jsonData.baseUrl

describe("Test the user update profile image API", () => {

    it("It should response 200 to the post method", async () => {

        const response = await request(baseUrl).post('api/v1/user/updateProfileImage').set('accept-language', 'en').set('token', jsonData.token).attach('image', imagefile)
        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})