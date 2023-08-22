const request = require("supertest");

const baseUrl = 'https://devapialista.skillroots.com/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for status code 400 cases
const wrongData = [
    {
        serviceId: "603ce8be5f17bd23a827fcf7",
        countryId: "",
        governateId: "",
        cityId: "",
        districtId: "",

    },
    {
        serviceId: "",
        countryId: "602d039b1a998fa202983a06",
        governateId: "",
        cityId: "",
        districtId: "",
    },
    {
        serviceId: "",
        countryId: "",
        governateId: "",
        cityId: "",
        districtId: "",

    }
]
// data for status code 200 cases
const rightData = [
    {
        serviceId: "603ce8be5f17bd23a827fcf7",
        countryId: "602d039b1a998fa202983a06",
        governateId: "",
        cityId: "",
        districtId: "",

    },
    {
        serviceId: "603ce8be5f17bd23a827fcf7",
        countryId: "",
        governateId: "60312ec18d04f4f97ac9decd",
        cityId: "",
        districtId: "",
    },
    {
        serviceId: "603ce8be5f17bd23a827fcf7",
        countryId: "",
        governateId: "",
        cityId: "6037eac36b88dc725a10063d",
        districtId: "",

    },
    {
        serviceId: "603ce8be5f17bd23a827fcf7",
        countryId: "",
        governateId: "",
        cityId: "",
        districtId: "604207858e169e830cdc37d9",

    }

]



describe("Test the getServicesWithFilter API", () => {


    test.each(rightData)("It should response 200 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/user/getUserByServiceLocation').set('token', token).set('Accept-Language', 'en')
            .send(singleData)


        expect(response.statusCode).toBe(200);

    });

    test.each(wrongData)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/user//getUserByServiceLocation').set('token', token).set('Accept-Language', 'en')
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });


})