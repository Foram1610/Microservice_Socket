const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'


describe("Test the add Category API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/category/addCategory').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8')
            .send({
                name: {
                    ar: "new2"

                },
                status: "active"

            })


        if (response.body.message === 'Category already exist!') {

            expect(response.body.message).toBe('Category already exist!')
        } else {

            expect(response.statusCode).toBe(200);
        }

    });

    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/category/addCategory').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8')
            .send({
                name: {


                },
                status: "active"

            })


        expect(response.statusCode).toBe(400);

    });


    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/category/addCategory').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8')
            .send({
                name: {
                    da: "Danish"
                }


            })


        expect(response.statusCode).toBe(400);

    });
})