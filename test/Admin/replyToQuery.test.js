const request = require("supertest");
const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for status code 400 case
const data = [
    {
        queryId: "607eb1d4f0a11ebb9c16afcd"

    },
    {

        reply: "adhskfjgfkjs"
    }
]

describe('Test the replyToQuery POST api', () => {
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/replyToQuery').set('token', token).send({
            queryId: "607eb1d4f0a11ebb9c16afcd",
            reply: "adhskfjgfkjs"
        })
        expect(response.statusCode).toBe(200);
    })

    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/replyToQuery').set('token', token).send(singleData)
        expect(response.statusCode).toBe(400);
    })

})