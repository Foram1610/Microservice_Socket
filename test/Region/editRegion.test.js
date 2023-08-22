const request = require("supertest");

const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe("Test the edit region API", () => {

    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/region/editRegion').set('token', jsonData.token)
            .send({
                countryId: "602d039b1a998fa202983a06",
                governateId: "602d0d0c1a998fa202983a07",
                cityId: "6068dea0233944b2868bf124",
                districtId: "60364af915b16b414f8e7de6",
                regionId: "606ed8f488f9538ed7ea8cdc",
                status: "active"
            })

        expect(response.statusCode).toBe(200);

    });

})