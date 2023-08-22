
const request = require("supertest");
const jsonData = require("../public/pass.json")

const adminData = [{
    gender: 'Male',
    DOB: '122344',
    email: 'cldhjka@gmail.com',
    countryCode: '+91',
    mobileNumber: `43534`,
    mobileNoStatus: 'verified',
    password: jsonData.userRegPassword,
    facebookId: `345345`,
    timezone: 'asia/kolkata',
    signUpBy: 'manual',
    deviceType: 'ios',
    firebaseToken: `erer`
}, {
    name: 'Pankaj ios',
    gender: 'Male',
    email: 'cldhjka@gmail.com',
    countryCode: '+91',
    mobileNumber: `353434`,
    mobileNoStatus: 'verified',
    password: jsonData.userRegPassword,
    facebookId: `34534`,
    timezone: 'asia/kolkata',
    signUpBy: 'manual',
    deviceType: 'ios',
    firebaseToken: `rerr`
}, {
    name: 'Pankaj ios',
    gender: 'Male',
    DOB: '122344',
    countryCode: '+91',
    mobileNumber: `435345345`,
    mobileNoStatus: 'verified',
    password: jsonData.userRegPassword,
    facebookId: `345345`,
    timezone: 'asia/kolkata',
    signUpBy: 'manual',
    deviceType: 'ios',
    firebaseToken: `etye`
},
{
    name: 'Pankaj ios',
    gender: 'Male',
    DOB: '122344',
    email: 'cldhjka@gmail.com',
    countryCode: '+91',
    mobileNumber: `34534534`,
    password: jsonData.userRegPassword,
    facebookId: `3453453`,
    timezone: 'asia/kolkata',
    signUpBy: 'manual',
    deviceType: 'ios',
    firebaseToken: `erte`
},
{
    name: 'Pankaj ios',
    gender: 'Male',
    DOB: '122344',
    email: 'cldhjka@gmail.com',
    countryCode: '+91',
    mobileNumber: `345345345`,
    mobileNoStatus: 'verified',
    facebookId: `34534534`,
    timezone: 'asia/kolkata',
    signUpBy: 'manual',
    deviceType: 'ios',
    firebaseToken: `erte`
},
{
    name: 'Pankaj ios',
    gender: 'Male',
    DOB: '122344',
    email: 'cldhjka@gmail.com',
    countryCode: '+91',
    mobileNumber: `345345345`,
    mobileNoStatus: 'verified',
    password: jsonData.userRegPassword,
    timezone: 'asia/kolkata',
    signUpBy: 'manual',
    deviceType: 'ios',
    firebaseToken: `erte`
},
{
    name: 'Pankaj ios',
    gender: 'Male',
    DOB: '122344',
    email: 'cldhjka@gmail.com',
    countryCode: '+91',
    mobileNumber: `3543534`,
    mobileNoStatus: 'verified',
    password: jsonData.userRegPassword,
    facebookId: `34535345`,
    signUpBy: 'manual',
    deviceType: 'ios',
    firebaseToken: `tyer`
},
{
    name: 'Pankaj ios',
    gender: 'Male',
    DOB: '122344',
    email: 'cldhjka@gmail.com',
    countryCode: '+91',
    mobileNumber: `5645456`,
    mobileNoStatus: 'verified',
    password: jsonData.userRegPassword,
    facebookId: `6456454`,
    timezone: 'asia/kolkata',
    deviceType: 'ios',
    firebaseToken: `ttyr`

},
{
    name: 'Pankaj ios',
    gender: 'Male',
    DOB: '122344',
    email: 'cldhjka@gmail.com',
    countryCode: '+91',
    mobileNumber: `56546454`,
    mobileNoStatus: 'verified',
    password: jsonData.userRegPassword,
    facebookId: `45645645`,
    timezone: 'asia/kolkata',
    signUpBy: 'manual',
    firebaseToken: `yety`
}
]

const genderType = ["Male", "Female", "Others"];
const deviceType = ["android", "ios", "others"]
const mobileNumberStatus = ["unverified", "verified"]
const signUpBy = ["manual", "google", "apple", "facebook", "microsoft"]

const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the register provider API", () => {

    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/register').set('accept-language', 'en')
            .send({
                name: 'Pankaj ios',
                gender: 'Male',
                DOB: '122344',
                email: `tyr@gmail.com`,
                countryCode: '+91',
                mobileNumber: `56456464`,
                mobileNoStatus: 'verified',
                password: jsonData.userRegPassword,
                facebookId: `456456`,
                timezone: 'asia/kolkata',
                signUpBy: 'manual',
                deviceType: 'ios',
                firebaseToken: `yrtt`
            })

        expect(response.statusCode).toBe(200);

    });

    test.each(adminData)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/user/register').set('accept-language', 'en')
            .send(singleData)

        expect(response.statusCode).toBe(400);

    });

    // ENUMS
    for (const type of genderType) {
        it("It should response 200 to the POST method", async () => {

            const response = await request(baseUrl).post('api/v1/user/register').set('accept-language', 'en')
                .send({
                    name: 'Pankaj ios',
                    gender: `${type}`,
                    DOB: '122344',
                    email: `retert@gmail.com`,
                    countryCode: '+91',
                    mobileNumber: `565445`,
                    mobileNoStatus: 'verified',
                    password: jsonData.userRegPassword,
                    facebookId: `4565445`,
                    timezone: 'asia/kolkata',
                    signUpBy: 'manual',
                    deviceType: 'ios',
                    firebaseToken: `ettt`
                })

            expect(response.statusCode).toBe(200);

        });
    }

    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/register').set('accept-language', 'en')
            .send({
                name: 'Pankaj ios',
                gender: 'fff',
                DOB: '122344',
                email: `ertert@gmail.com`,
                countryCode: '+91',
                mobileNumber: `6756756`,
                mobileNoStatus: 'verified',
                password: jsonData.userRegPassword,
                facebookId: `567567`,
                timezone: 'asia/kolkata',
                signUpBy: 'manual',
                deviceType: 'ios',
                firebaseToken: `hhhh`
            })

        expect(response.statusCode).toBe(400);

    });

    for (const type of deviceType) {
        it("It should response 200 to the POST method", async () => {

            const response = await request(baseUrl).post('api/v1/user/register').set('accept-language', 'en')
                .send({
                    name: 'Pankaj ios',
                    gender: 'Male',
                    DOB: '122344',
                    email: `yreyer@gmail.com`,
                    countryCode: '+91',
                    mobileNumber: `45645645`,
                    mobileNoStatus: 'verified',
                    password: jsonData.userRegPassword,
                    facebookId: `4645645`,
                    timezone: 'asia/kolkata',
                    signUpBy: 'manual',
                    deviceType: `${type}`,
                    firebaseToken: `rtut`
                })

            expect(response.statusCode).toBe(200);

        });
    }
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/register').set('accept-language', 'en')
            .send({
                name: 'Pankaj ios',
                gender: 'Male',
                DOB: '122344',
                email: `rtyrty@gmail.com`,
                countryCode: '+91',
                mobileNumber: `4554645`,
                mobileNoStatus: 'verified',
                password: jsonData.userRegPassword,
                facebookId: `564545`,
                timezone: 'asia/kolkata',
                signUpBy: 'manual',
                deviceType: 'ipp',
                firebaseToken: `ttrt`
            })

        expect(response.statusCode).toBe(400);

    });
    for (const status of mobileNumberStatus) {
        it("It should response 200 to the POST method", async () => {

            const response = await request(baseUrl).post('api/v1/user/register').set('accept-language', 'en')
                .send({
                    name: 'Pankaj ios',
                    gender: 'Male',
                    DOB: '122344',
                    email: `ryryrt@gmail.com`,
                    countryCode: '+91',
                    mobileNumber: `675675656`,
                    mobileNoStatus: `${status}`,
                    password: jsonData.userRegPassword,
                    facebookId: `567444`,
                    timezone: 'asia/kolkata',
                    signUpBy: 'manual',
                    deviceType: 'ios',
                    firebaseToken: `yyyy`
                })

            expect(response.statusCode).toBe(200);

        });
    }

    for (const signUpMethod of signUpBy) {
        it("It should response 200 to the POST method", async () => {

            const response = await request(baseUrl).post('api/v1/user/register').set('accept-language', 'en')
                .send({
                    name: 'Pankaj ios',
                    gender: 'Male',
                    DOB: '122344',
                    email: `ryryr@gmail.com`,
                    countryCode: '+91',
                    mobileNumber: `67655`,
                    mobileNoStatus: 'verified',
                    password: jsonData.userRegPassword,
                    facebookId: `65756567`,
                    timezone: 'asia/kolkata',
                    signUpBy: `${signUpMethod}`,
                    deviceType: 'ios',
                    firebaseToken: `yrty`
                })

            expect(response.statusCode).toBe(200);

        });
    }
    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/user/register').set('accept-language', 'en')
            .send({
                name: 'Pankaj ios',
                gender: 'Male',
                DOB: '122344',
                email: `ryrtyr@gmail.com`,
                countryCode: '+91',
                mobileNumber: `4654646`,
                mobileNoStatus: 'verified',
                password: jsonData.userRegPassword,
                facebookId: `4654456`,
                timezone: 'asia/kolkata',
                signUpBy: 'man',
                deviceType: 'ios',
                firebaseToken: `yuyu`
            })

        expect(response.statusCode).toBe(400);

    });

})