const request = require("supertest");
const path = require('path')
const imagefilee = path.join(__dirname, '../public/Sneaker-Feature-.jpg');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'
const baseUrl = 'https://devapialista.skillroots.com/'


describe("Test the add services API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/service/addService').set('token', token)
            .field('name', '{"en":"tyttyerqyr","ar":"rtertwet"}')
            .field('status', 'active')
            .field('categoryId', '6034ebde5bbd45688c542bf0')
            .field('blockCountryId', JSON.stringify(["6066e1aebbe7309e0c4dd5eb"]))
            .field('blockGovernateId', JSON.stringify(["6030cc1b2e0620f34be56ba8"]))
            .field('blockCityId', JSON.stringify(["60364ab815b16b414f8e7de5"]))
            .field('blockDistrictId', JSON.stringify(["60388d141467697e676ae374"]))
            .attach('image', imagefilee)

        if (response.body.message === 'Service already exist!') {
            expect(response.body.message).toBe('Service already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/service/addService').set('token', token)
            .field('name', '{"en":"wqerwtrt","ar":"qtgfhytty"}')
            .field('status', 'active')
            .field('categoryId', '6034ebde5bbd45688c542bf0')
            .attach('image', imagefilee)

        if (response.body.message === 'Service already exist!') {
            expect(response.body.message).toBe('Service already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

})