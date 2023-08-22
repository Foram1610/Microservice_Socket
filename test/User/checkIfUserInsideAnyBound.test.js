const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'



describe("Test the admin get customer query by id API", () => {


    it("It should response 200 to the get method", async () => {

        const response = await request(baseUrl).post('api/v1/user/checkIfUserInsideAnyBound').send(
            {
                userLocation: {
                    lat: 29.99651634985611,
                    lng: 31.422087591029953
                }
            }
        )


        expect(response.statusCode).toBe(200);

    });

})