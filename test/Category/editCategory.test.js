const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'

// false data for status code 400
const data = [{
    name: {

    },
    status: "active",
    categoryId: "61bd8569ab379626d51dd0c1"
}, {
    name: {
        en: "India",
        ar: "الهند"
    },

    categoryId: "61bd8569ab379626d51dd0c1"
}, {
    name: {
        en: "India",
        ar: "الهند"
    },
    status: "active",

},]
describe("Test the edit Category API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/category/editCategory').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8')
            .send({
                name: {
                    en: "India",
                    ar: "الهند"
                },
                status: "active",
                categoryId: "6034ebde5bbd45688c542bf0"
            })

        expect(response.statusCode).toBe(200);

    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/category/editCategory').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8')
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });

})