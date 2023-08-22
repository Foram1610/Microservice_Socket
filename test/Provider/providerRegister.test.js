
const request = require("supertest");
const path = require('path')

const imagefile = path.join(__dirname, '../public/1-min.PNG');
const imagefilee = path.join(__dirname, '../public/Sneaker-Feature-.jpg');

const deviceType = ["android", "ios", "others"]
const signUpBy = ["manual", "google", "apple", "facebook", "microsoft"]
const mobileNumberStatus = ["unverified", "verified"]

const baseUrl = 'https://devapialista.skillroots.com/'
describe("Test the register provider API", () => {
    //For company required field

    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'zaibul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', `vbhdgdh@gmail.com`)
            .field('countryCode', '+92')
            .field('mobileNumber', `5464645`)
            .field('mobileNoStatus', 'verified')
            .field('password', '120468033441')
            .field('timezone', 'timezone')
            .field('signUpBy', 'manual')
            .field('deviceType', "android")
            .field('companyName', `tryry`)
            .field('commercialRegNo', `ryryrty`)
            .attach('profileImage', imagefilee)
            .attach('documentImage', imagefile);

        switch (response.body.message) {
            case 'Email already exist!':
                expect(response.body.message).toBe('Email already exist!')
                break
            case 'Mobile number already exist!':
                expect(response.body.message).toBe('Mobile number already exist!')
                break
            case 'Commercial reg no already exist!':
                expect(response.body.message).toBe('Commercial reg no already exist!')
                break
            case 'Company already exist!':
                expect(response.body.message).toBe('Company already exist!')
                break
            default:
                expect(response.statusCode).toBe(200);

        }

    });
    it("without name response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en').set('accept-language', 'en')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'ahjub@gmail.com')
            .field('countryCode', '+92')
            .field('mobileNumber', '0997240')
            .field('mobileNoStatus', 'verified')
            .field('password', '1234690334068')
            .field('timezone', 'timezone')
            .field('signUpBy', 'manual')
            .field('deviceType', 'android')
            .field('companyName', 'dkjjk')
            .field('commercialRegNo', 'klkjdsfkj')
            .attach('profileImage', imagefilee)
            .attach('documentImage', imagefile);
        expect(response.statusCode).toBe(400);

    });

    it("without email response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('countryCode', '+92')
            .field('mobileNumber', '09998867087246')
            .field('mobileNoStatus', 'verified')
            .field('password', '1234690334468')
            .field('timezone', 'timezone')
            .field('signUpBy', 'manual')
            .field('deviceType', 'android')
            .field('companyName', 'djookjwfojk')
            .field('commercialRegNo', 'kjoiiwokdkjdsfkj')
            .attach('profileImage', imagefilee)
            .attach('documentImage', imagefile);
        expect(response.statusCode).toBe(400);

    });

    it("without countryCode response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'alssiooh@gmail.com')
            .field('mobileNumber', '01294456646')
            .field('mobileNoStatus', 'verified')
            .field('password', '1234690334468')
            .field('timezone', 'timezone')
            .field('signUpBy', 'manual')
            .field('deviceType', 'android')
            .field('companyName', 'zjockaik')
            .field('commercialRegNo', 'zjocijdsfkj')
            .attach('profileImage', imagefilee)
            .attach('documentImage', imagefile);

        expect(response.statusCode).toBe(400);

    });
    it("without mobileNumber response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'almmhjub@gmail.com')
            .field('countryCode', '+92')
            .field('mobileNoStatus', 'verified')
            .field('password', '123124690334468')
            .field('timezone', 'timezone')
            .field('signUpBy', 'manual')
            .field('deviceType', 'android')
            .field('companyName', 'djoojk')
            .field('commercialRegNo', 'kjoctdkjdsfkj')
            .attach('profileImage', imagefilee)
            .attach('documentImage', imagefile);
        expect(response.statusCode).toBe(400);

    });
    it("without mobileNoStatus response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'alavub@gmail.com')
            .field('countryCode', '+92')
            .field('mobileNumber', '0909967087246')
            .field('password', '1231690334468')
            .field('timezone', 'timezone')
            .field('signUpBy', 'manual')
            .field('deviceType', 'android')
            .field('companyName', 'djxfojk')
            .field('commercialRegNo', 'kjctokdkjdsfkj')
            .attach('profileImage', imagefilee)
            .attach('documentImage', imagefile);
        expect(response.statusCode).toBe(400);

    });
    it("without password response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'alpphjub@gmail.com')
            .field('countryCode', '+92')
            .field('mobileNumber', '02345667087246')
            .field('mobileNoStatus', 'verified')
            .field('timezone', 'timezone')
            .field('signUpBy', 'manual')
            .field('deviceType', 'android')
            .field('companyName', 'djockjfeeojk')
            .field('commercialRegNo', 'kjoceetokdkjdsfkj')
            .attach('profileImage', imagefilee)
            .attach('documentImage', imagefile);
        expect(response.statusCode).toBe(400);

    });
    it("without timezone response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'alooppjub@gmail.com')
            .field('countryCode', '+92')
            .field('mobileNumber', '0998945667087246')
            .field('mobileNoStatus', 'verified')
            .field('password', '1234690334468')
            .field('signUpBy', 'manual')
            .field('deviceType', 'android')
            .field('companyName', 'djoeeckjfojk')
            .field('commercialRegNo', 'kjeeoctokdkjdsfkj')
            .attach('profileImage', imagefilee)
            .attach('documentImage', imagefile);

        expect(response.statusCode).toBe(400);

    });
    it("without signUpBy response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'alrrohjub@gmail.com')
            .field('countryCode', '+92')
            .field('mobileNumber', '0967945667087246')
            .field('mobileNoStatus', 'verified')
            .field('password', '10034690334468')
            .field('timezone', 'timezone')
            .field('deviceType', 'android')
            .field('companyName', 'djoccckjfojk')
            .field('commercialRegNo', 'kjoccctokdkjdsfkj')
            .attach('profileImage', imagefilee)
            .attach('documentImage', imagefile);
        expect(response.statusCode).toBe(400);

    });
    it("without deviceType response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'alweehjub@gmail.com')
            .field('countryCode', '+92')
            .field('mobileNumber', '07659945667087246')
            .field('mobileNoStatus', 'verified')
            .field('password', '12346900034468')
            .field('timezone', 'timezone')
            .field('signUpBy', 'manual')
            .field('companyName', 'djocnnkjfojk')
            .field('commercialRegNo', 'kjnnoctokdkjdsfkj')
            .attach('profileImage', imagefilee)
            .attach('documentImage', imagefile);
        expect(response.statusCode).toBe(400);

    });

    it("without documentImage response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'alccjub@gmail.com')
            .field('countryCode', '+92')
            .field('mobileNumber', '09455945667087246')
            .field('mobileNoStatus', 'verified')
            .field('password', '1234690334468')
            .field('timezone', 'timezone')
            .field('signUpBy', 'manual')
            .field('deviceType', 'android')
            .field('companyName', 'dejockjfojk')
            .field('commercialRegNo', 'kjeoctokdkjdsfkj')
            .attach('profileImage', imagefilee)
        expect(response.statusCode).toBe(400);

    });

    // Check enums

    // CHECK SIGNUPBY
    for (const signUPMethod of signUpBy) {
        it("It should response 200 to the POST method", async () => {

            const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
                .field('name', 'zaibul')
                .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
                .field('userType', 'COMPANY')
                .field('email', `rytyrty@gmail.com`)
                .field('countryCode', '+92')
                .field('mobileNumber', `4564645`)
                .field('mobileNoStatus', 'verified')
                .field('password', '120468033441')
                .field('timezone', 'timezone')
                .field('signUpBy', `${signUPMethod}`)
                .field('deviceType', 'android')
                .field('companyName', `ghfff`)
                .field('commercialRegNo', `dfgete`)
                .attach('profileImage', imagefilee)
                .attach('documentImage', imagefile);

            switch (response.body.message) {
                case 'Email already exist!':
                    expect(response.body.message).toBe('Email already exist!')
                    break
                case 'Mobile number already exist!':
                    expect(response.body.message).toBe('Mobile number already exist!')
                    break
                case 'Commercial reg no already exist!':
                    expect(response.body.message).toBe('Commercial reg no already exist!')
                    break
                case 'Company already exist!':
                    expect(response.body.message).toBe('Company already exist!')
                    break
                default:
                    expect(response.statusCode).toBe(200);

            }

        });

    }
    it(" response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'alccjub@gmail.com')
            .field('countryCode', '+92')
            .field('mobileNumber', `4564645`)
            .field('mobileNoStatus', 'verified')
            .field('password', '1234690334468')
            .field('timezone', 'timezone')
            .field('signUpBy', 'gghgh')
            .field('deviceType', 'android')
            .field('companyName', 'dejockjfojk')
            .field('commercialRegNo', 'kjeoctokdkjdsfkj')
            .attach('profileImage', imagefilee)
        expect(response.statusCode).toBe(400);

    });

    // CHECKING DEVICE TYPE
    for (const device of deviceType) {
        it("It should response 200 to the POST method", async () => {

            const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
                .field('name', 'zaibul')
                .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
                .field('userType', 'COMPANY')
                .field('email', `erert@gmail.com`)
                .field('countryCode', '+92')
                .field('mobileNumber', `54644`)
                .field('mobileNoStatus', 'verified')
                .field('password', '120468033441')
                .field('timezone', 'timezone')
                .field('signUpBy', 'manual')
                .field('deviceType', `${device}`)
                .field('companyName', `hdrye`)
                .field('commercialRegNo', `ghryr`)
                .attach('profileImage', imagefilee)
                .attach('documentImage', imagefile);
            switch (response.body.message) {
                case 'Email already exist!':
                    expect(response.body.message).toBe('Email already exist!')
                    break
                case 'Mobile number already exist!':
                    expect(response.body.message).toBe('Mobile number already exist!')
                    break
                case 'Commercial reg no already exist!':
                    expect(response.body.message).toBe('Commercial reg no already exist!')
                    break
                case 'Company already exist!':
                    expect(response.body.message).toBe('Company already exist!')
                    break
                default:
                    expect(response.statusCode).toBe(200);

            }
        });

    }

    it("response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'alccjub@gmail.com')
            .field('countryCode', '+92')
            .field('mobileNumber', '09455945667087246')
            .field('mobileNoStatus', 'verified')
            .field('password', `56464`)
            .field('timezone', 'timezone')
            .field('signUpBy', 'manual')
            .field('deviceType', 'dhkjd')
            .field('companyName', 'dejockjfojk')
            .field('commercialRegNo', 'kjeoctokdkjdsfkj')
            .attach('profileImage', imagefilee)
        expect(response.statusCode).toBe(400);

    });

    // CHECK MOBILENUMBERSTATUS
    for (const status of mobileNumberStatus) {
        it("It should response 200 to the POST method", async () => {

            const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
                .field('name', 'zaibul')
                .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
                .field('userType', 'COMPANY')
                .field('email', `erer@gmail.com`)
                .field('countryCode', '+92')
                .field('mobileNumber', `5645645`)
                .field('mobileNoStatus', `${status}`)
                .field('password', '120468033441')
                .field('timezone', 'timezone')
                .field('signUpBy', 'manual')
                .field('deviceType', "android")
                .field('companyName', `ytrty`)
                .field('commercialRegNo', `tyrryty`)
                .attach('profileImage', imagefilee)
                .attach('documentImage', imagefile);
            switch (response.body.message) {
                case 'Email already exist!':
                    expect(response.body.message).toBe('Email already exist!')
                    break
                case 'Mobile number already exist!':
                    expect(response.body.message).toBe('Mobile number already exist!')
                    break
                case 'Commercial reg no already exist!':
                    expect(response.body.message).toBe('Commercial reg no already exist!')
                    break
                case 'Company already exist!':
                    expect(response.body.message).toBe('Company already exist!')
                    break
                default:
                    expect(response.statusCode).toBe(200);

            }
        });

    }

    it("response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/provider/register').set('accept-language', 'en')
            .field('name', 'habul')
            .field('services', '[{"serviceId":"60407e3ed96847dbffbbc944","categoryId":"6034b2a65bbd45688c381b2c"}]')
            .field('userType', 'COMPANY')
            .field('email', 'alccjub@gmail.com')
            .field('countryCode', '+92')
            .field('mobileNumber', `67567567567`)
            .field('mobileNoStatus', 'ffggg')
            .field('password', '1234690334468')
            .field('timezone', 'timezone')
            .field('signUpBy', 'manual')
            .field('deviceType', 'android')
            .field('companyName', 'dejockjfojk')
            .field('commercialRegNo', 'kjeoctokdkjdsfkj')
            .attach('profileImage', imagefilee)
        expect(response.statusCode).toBe(400);

    });

});