const request = require("supertest");
const path = require('path');
const imagefilee = path.join(__dirname, '../public/Sneaker-Feature-.jpg');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'
const baseUrl = 'https://devapialista.skillroots.com/'

const wrongData = [{
    name: JSON.stringify({ ar: 'Arabic' }),
    serviceId: '60e7f8d0e2584f6634ab2434',
    categoryId: '6034b2a65bbd45688c381b2c',
    status: 'active'
}, {
    name: JSON.stringify({ en: 'India' }),
    serviceId: '60e7f8d0e2584f6634ab2434',
    categoryId: '6034b2a65bbd45688c381b2c',
    status: 'active'
}, {
    name: JSON.stringify({ en: 'India', ar: 'Arabic' }),

    categoryId: '6034b2a65bbd45688c381b2c',
    status: 'active'
}, {
    name: JSON.stringify({ en: 'India', ar: 'Arabic' }),
    serviceId: '60e7f8d0e2584f6634ab2434',

    status: 'active'
}, {
    name: JSON.stringify({ en: 'India', ar: 'Arabic' }),
    serviceId: '60e7f8d0e2584f6634ab2434',
    categoryId: '6034b2a65bbd45688c381b2c',

}]
describe("Test the edit services API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/service/editService').set('token', token).send({
            name: JSON.stringify({ en: 'India', ar: 'Arabic' }),
            serviceId: '60e7f8d0e2584f6634ab2434',
            categoryId: '6034b2a65bbd45688c381b2c',
            status: 'active'
        })


        expect(response.statusCode).toBe(200);

    });
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/service/editService').set('token', token)
            .field('name', '{"en":"India","ar":"Arabic"}')
            .field('serviceId', '60e7f8d0e2584f6634ab2434')
            .field('status', 'active')
            .field('categoryId', '6034b2a65bbd45688c381b2c')
            .field('blockCountryId', JSON.stringify(["6066e1aebbe7309e0c4dd5eb"]))
            .field('blockGovernateId', JSON.stringify(["6030cc1b2e0620f34be56ba8"]))
            .field('blockCityId', JSON.stringify(["60364ab815b16b414f8e7de5"]))
            .field('blockDistrictId', JSON.stringify(["60388d141467697e676ae374"]))
            .attach('image', imagefilee)


        expect(response.statusCode).toBe(200);

    });
    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/service/editService').set('token', token)
            .field('name', '{"en":"India","ar":"Arabic"}')
            .field('status', 'active')
            .field('serviceId', '60e7f8d0e2584f6634ab2434')
            .field('categoryId', '6034b2a65bbd45688c381b2c')
            .attach('image', imagefilee)


        expect(response.statusCode).toBe(200);

    });
    // Service Id already taken
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/service/editService').set('token', token)
            .field('name', '{"en":"tyttyerqyr","ar":"rtertwet"}')
            .field('serviceId', '60e7f8d0e2584f6634ab2434')
            .field('status', 'active')
            .field('categoryId', '6034ebde5bbd45688c542bf0')
            .field('blockCountryId', JSON.stringify(["6066e1aebbe7309e0c4dd5eb"]))
            .field('blockGovernateId', JSON.stringify(["6030cc1b2e0620f34be56ba8"]))
            .field('blockCityId', JSON.stringify(["60364ab815b16b414f8e7de5"]))
            .field('blockDistrictId', JSON.stringify(["60388d141467697e676ae374"]))
            .attach('image', imagefilee)


        expect(response.statusCode).toBe(400);

    });

    test.each(wrongData)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/service/editService').set('token', token).send(singleData)


        expect(response.statusCode).toBe(400);

    });
})