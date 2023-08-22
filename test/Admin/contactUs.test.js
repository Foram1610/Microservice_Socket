
const request = require("supertest");
const baseUrl = 'https://devapialista.skillroots.com/'

// data for status code 400 case
const data = [
    {

        limit: 10,
        sortOrder: -1,
        sortField: "name"

    },
    {

        page: 1,

        sortOrder: -1,
        sortField: "name"

    },
    {

        page: 1,
        limit: 10,

        sortField: "name"

    },
    {

        page: 1,
        limit: 10,
        sortOrder: -1,


    }

]

describe('Test the Contact us POST api', () => {
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/getContactUsWithFilter').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8').send({

            name: "yamin",
            page: 1,
            limit: 10,
            sortOrder: -1,
            sortField: "name"



        })
        expect(response.statusCode).toBe(200);
    })

    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/getContactUsWithFilter').set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8').send(singleData)
        expect(response.statusCode).toBe(400);
    })

})