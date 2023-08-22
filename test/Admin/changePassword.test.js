const request = require("supertest");
const jsonData = require("../public/pass.json")

const baseUrl = jsonData.baseUrl

describe('Test the change password post api', () => {
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/changePassword').set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MjI4NzI4OGQzZDVkMTNjMzIyYTc0MjgiLCJpYXQiOjE2NjUwMzg5MDQ3NjJ9.HP5bWE4HKeEmPrl_8fP6hvJq35LbQ1UV9oWL_oHQNcI").send({

            "oldPassword": jsonData.adminPassword,
            "password": jsonData.adminPassword
        })

        expect(response.statusCode).toBe(200);


    })

})