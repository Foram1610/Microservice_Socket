const request = require("supertest");


// data for status code 400 cases




const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the provider get Categories API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/getCategories').set('accept-language', 'en')
            .send({
                category: "",
                sortField: "categoryName",
                sortOrder: 1,
                limit: 10,
                page: 1
            })



        expect(response.statusCode).toBe(200);


    });





})