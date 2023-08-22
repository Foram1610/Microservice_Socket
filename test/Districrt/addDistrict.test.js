const request = require("supertest");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8'

// data for status code 400 cases
const data = [
    {
        name: {

            ar: "lfdfjhkpp"
        },
        googleMapDistrictName: "District No 5 الحى الخامس Al Hay Al Asher Nasr City Cairo Governorate Egypt",
        countryId: "602cf6c61a998fa202983a05",
        cityId: "6066e222bbe7309e0c4dd5ed",
        governateId: "602f812bf270f1d2feaa9037",
        status: "active",
        geometryBounds: {
            "northeast": {
                "lat": 23.8366885,
                "lng": 90.42012919999999
            },
            "southwest": {
                "lat": 23.8266713,
                "lng": 90.4142115
            }
        }

    },
    {
        name: {
            en: "dfuikk",

        },
        googleMapDistrictName: "District No 5 الحى الخامس Al Hay Al Asher Nasr City Cairo Governorate Egypt",
        countryId: "602cf6c61a998fa202983a05",
        cityId: "6066e222bbe7309e0c4dd5ed",
        governateId: "602f812bf270f1d2feaa9037",
        status: "active",
        geometryBounds: {
            "northeast": {
                "lat": 23.8366885,
                "lng": 90.42012919999999
            },
            "southwest": {
                "lat": 23.8266713,
                "lng": 90.4142115
            }
        }

    },
    {
        name: {
            en: "dfuikk",
            ar: "lfdfjhkpp"
        },

        countryId: "602cf6c61a998fa202983a05",
        cityId: "6066e222bbe7309e0c4dd5ed",
        governateId: "602f812bf270f1d2feaa9037",
        status: "active",
        geometryBounds: {
            "northeast": {
                "lat": 23.8366885,
                "lng": 90.42012919999999
            },
            "southwest": {
                "lat": 23.8266713,
                "lng": 90.4142115
            }
        }

    },
    {
        name: {
            en: "dfuikk",
            ar: "lfdfjhkpp"
        },
        googleMapDistrictName: "District No 5 الحى الخامس Al Hay Al Asher Nasr City Cairo Governorate Egypt",

        cityId: "6066e222bbe7309e0c4dd5ed",
        governateId: "602f812bf270f1d2feaa9037",
        status: "active",
        geometryBounds: {
            "northeast": {
                "lat": 23.8366885,
                "lng": 90.42012919999999
            },
            "southwest": {
                "lat": 23.8266713,
                "lng": 90.4142115
            }
        }

    },
    {
        name: {
            en: "dfuikk",
            ar: "lfdfjhkpp"
        },
        googleMapDistrictName: "District No 5 الحى الخامس Al Hay Al Asher Nasr City Cairo Governorate Egypt",
        countryId: "602cf6c61a998fa202983a05",

        governateId: "602f812bf270f1d2feaa9037",
        status: "active",
        geometryBounds: {
            "northeast": {
                "lat": 23.8366885,
                "lng": 90.42012919999999
            },
            "southwest": {
                "lat": 23.8266713,
                "lng": 90.4142115
            }
        }

    },
    {
        name: {
            en: "dfuikk",
            ar: "lfdfjhkpp"
        },
        googleMapDistrictName: "District No 5 الحى الخامس Al Hay Al Asher Nasr City Cairo Governorate Egypt",
        countryId: "602cf6c61a998fa202983a05",
        cityId: "6066e222bbe7309e0c4dd5ed",

        status: "active",
        geometryBounds: {
            "northeast": {
                "lat": 23.8366885,
                "lng": 90.42012919999999
            },
            "southwest": {
                "lat": 23.8266713,
                "lng": 90.4142115
            }
        }

    },
    {
        name: {
            en: "dfuikk",
            ar: "lfdfjhkpp"
        },
        googleMapDistrictName: "District No 5 الحى الخامس Al Hay Al Asher Nasr City Cairo Governorate Egypt",
        countryId: "602cf6c61a998fa202983a05",
        cityId: "6066e222bbe7309e0c4dd5ed",
        governateId: "602f812bf270f1d2feaa9037",
        geometryBounds: {
            "northeast": {
                "lat": 23.8366885,
                "lng": 90.42012919999999
            },
            "southwest": {
                "lat": 23.8266713,
                "lng": 90.4142115
            }
        },


    },
    {
        name: {
            en: "dfuikk",
            ar: "lfdfjhkpp"
        },
        googleMapDistrictName: "District No 5 الحى الخامس Al Hay Al Asher Nasr City Cairo Governorate Egypt",
        countryId: "602cf6c61a998fa202983a05",
        cityId: "6066e222bbe7309e0c4dd5ed",
        governateId: "602f812bf270f1d2feaa9037",
        status: "active",


    },

]



const baseUrl = 'https://devapialista.skillroots.com/'

describe("Test the add district API", () => {


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/district/addDistrict').set('token', token)
            .send({
                name: {
                    en: "dfuikki",
                    ar: "lfdfjhkppi"
                },
                googleMapDistrictName: "District No 5 الحى الخامس Al Hay Al Asher Nasr City Cairo Governorate Egypt",
                countryId: "602cf6c61a998fa202983a05",
                cityId: "6066e222bbe7309e0c4dd5ed",
                governateId: "602f812bf270f1d2feaa9037",
                status: "active",
                geometryBounds: {
                    "northeast": {
                        "lat": 23.8366885,
                        "lng": 90.42012919999999
                    },
                    "southwest": {
                        "lat": 23.8266713,
                        "lng": 90.4142115
                    }
                }

            }
            )


        if (response.body.message === 'District already exist!') {
            expect(response.body.message).toBe('District already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });
    test.each(data)("It should response 400 to the POST method", async (singleData) => {

        const response = await request(baseUrl).post('api/v1/admin/district/addDistrict').set('token', token)
            .send(singleData)


        expect(response.statusCode).toBe(400);

    });

    //enum testing


    it("It should response 200 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/district/addDistrict').set('token', token)
            .send({
                name: {
                    en: "dfuikki",
                    ar: "lfdfjhkppi"
                },
                googleMapDistrictName: "District No 5 الحى الخامس Al Hay Al Asher Nasr City Cairo Governorate Egypt",
                countryId: "602cf6c61a998fa202983a05",
                cityId: "6066e222bbe7309e0c4dd5ed",
                governateId: "602f812bf270f1d2feaa9037",
                status: "inactive",
                geometryBounds: {
                    "northeast": {
                        "lat": 23.8366885,
                        "lng": 90.42012919999999
                    },
                    "southwest": {
                        "lat": 23.8266713,
                        "lng": 90.4142115
                    }
                }

            })


        if (response.body.message === 'District already exist!') {
            expect(response.body.message).toBe('District already exist!')
        } else {
            expect(response.statusCode).toBe(200);
        }

    });

    it("It should response 400 to the POST method", async () => {

        const response = await request(baseUrl).post('api/v1/admin/district/addDistrict').set('token', token)
            .send({
                name: {
                    en: "dfuikk",
                    ar: "lfdfjhkpp"
                },
                googleMapDistrictName: "District No 5 الحى الخامس Al Hay Al Asher Nasr City Cairo Governorate Egypt",
                countryId: "602cf6c61a998fa202983a05",
                cityId: "6066e222bbe7309e0c4dd5ed",
                governateId: "602f812bf270f1d2feaa9037",
                status: "ghgh",
                geometryBounds: {
                    "northeast": {
                        "lat": 23.8366885,
                        "lng": 90.42012919999999
                    },
                    "southwest": {
                        "lat": 23.8266713,
                        "lng": 90.4142115
                    }
                }

            })


        expect(response.statusCode).toBe(400);

    });



})