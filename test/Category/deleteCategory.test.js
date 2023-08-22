const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'


describe("Test the delete Catagory API", () => {

    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).delete('api/v1/admin/category/deleteCategory/61c30519ab379626d501c0b0').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8')



        if (response.body.message === 'No records found!') {
            expect(response.body.message).toBe('No records found!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).delete('api/v1/admin/category/deleteCategory/61bd2229ab379626d51dd0c1').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8')


        expect(response.statusCode).toBe(400);

    });

})