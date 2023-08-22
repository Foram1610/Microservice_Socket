const swaggerDocument = {
    "openapi": "3.0.0",
    "servers": [
        {
            "url": "http://192.168.100.89:5000",
            "description": "",
            "variables": {}
        }
    ],
    "info": {
        "version": "cb4a1b3e-3a5d-4efa-966a-ed4c95724f8a",
        "title": "Alista",
        "description": "",
        "termsOfService": "",
        "contact": {},
        "license": {
            "name": ""
        }
    },
    "paths": {
        "/api/v1/user/addLocation": {
            "post": {
                "summary": "Add User Location",
                "operationId": "AddUserLocation",
                "parameters": [
                    {
                        "$ref": "#/components/parameters/Content-Type"
                    },
                    {
                        "$ref": "#/components/parameters/Accept-Language"
                    },
                    {
                        "$ref": "#/components/parameters/deviceType"
                    },
                    {
                        "$ref": "#/components/parameters/deviceModel"
                    },
                    {
                        "$ref": "#/components/parameters/appVersion"
                    },
                    {
                        "$ref": "#/components/parameters/osVersion"
                    },
                    {
                        "$ref": "#/components/parameters/token"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "countryId": "602d039b1a998fa202983a06",
                                    "governateId": "602d0d0c1a998fa202983a07",
                                    "cityId": "6068dea0233944b2868bf124",
                                    "districtId": "6068dec8233944b2868bf125",
                                    "addressLine1": "عنوان",
                                    "street": "عنوان",
                                    "houseNumber": "عنوان",
                                    "appartment": "عنوان",
                                    "floor": "عنوان",
                                    "landmark": "عنوان",
                                    "tag": "HOME",
                                    "latitude": "",
                                    "longitude": ""
                                }
                            },
                            "example": "{\n   \"countryId\":\"602d039b1a998fa202983a06\",\n   \"governateId\":\"602d0d0c1a998fa202983a07\",\n   \"cityId\":\"6068dea0233944b2868bf124\",\n   \"districtId\":\"6068dec8233944b2868bf125\",\n   \"addressLine1\":\"عنوان\",\n   \"street\":\"عنوان\",\n   \"houseNumber\":\"عنوان\",\n   \"appartment\":\"عنوان\",\n   \"floor\":\"عنوان\",\n   \"landmark\":\"عنوان\",\n   \"tag\":\"HOME\",\n   \"latitude\":\"\",\n   \"longitude\":\"\"\n}"
                        }
                    }
                },
                "tags": [
                    "Location"
                ]
            }
        },
        "/api/v1/user/editLocation": {
            "post": {
                "summary": "Edit User Location",
                "operationId": "EditUserLocation",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "locationId": "603f5833f4cd2a5fa594cf6c",
                                    "countryId": "602cf6c61a998fa202983a05",
                                    "governateId": "6030ada1a74127eb0670f24d",
                                    "cityId": "60364ab815b16b414f8e7de5",
                                    "districtId": "60364af915b16b414f8e7de6",
                                    "countryName": "indiawww",
                                    "governateName": "punjab",
                                    "cityName": "mohali",
                                    "districtName": "mohali",
                                    "addressLine1": "asdfasd",
                                    "street": "asf",
                                    "houseNumber": "asdfsdf",
                                    "appartment": "asdfasdf",
                                    "floor": "asfa",
                                    "landmark": "asdf",
                                    "tag": "safasf"
                                }
                            },
                            "example": "{\n    \"locationId\":\"603f5833f4cd2a5fa594cf6c\",\n    \"countryId\":\"602cf6c61a998fa202983a05\",\n   \"governateId\":\"6030ada1a74127eb0670f24d\",\n   \"cityId\":\"60364ab815b16b414f8e7de5\",\n   \"districtId\":\"60364af915b16b414f8e7de6\",\n   \"countryName\":\"indiawww\",\n   \"governateName\":\"punjab\",\n   \"cityName\":\"mohali\",\n   \"districtName\":\"mohali\",\n    \"addressLine1\":\"asdfasd\",\n    \"street\":\"asf\",\n    \"houseNumber\":\"asdfsdf\",\n    \"appartment\":\"asdfasdf\",\n    \"floor\":\"asfa\",\n    \"landmark\":\"asdf\",\n    \"tag\":\"safasf\"\n}"
                        }
                    }
                },
                "tags": [
                    "Location"
                ]
            }
        },
        "/api/v1/user/changeDefaultLocation": {
            "post": {
                "summary": "Change default Location",
                "operationId": "ChangedefaultLocation",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "locationId": "603f5b5d35fdc06547e83e16"
                                }
                            },
                            "example": "{\n    \"locationId\":\"603f5b5d35fdc06547e83e16\"\n}"
                        }
                    }
                },
                "tags": [
                    "Location"
                ]
            }
        },
        "/api/v1/user/getLocation": {
            "get": {
                "summary": "Get User Location",
                "operationId": "GetUserLocation",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Location"
                ]
            }
        },
        "/api/v1/user/removeLocation": {
            "post": {
                "summary": "Remove User Location",
                "operationId": "RemoveUserLocation",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "locationId": "6040da40e6db6a60f10f13c5"
                                }
                            },
                            "example": "{\n    \"locationId\":\"6040da40e6db6a60f10f13c5\"\n}"
                        }
                    }
                },
                "tags": [
                    "Location"
                ]
            }
        },
        "/api/v1/user/country/getActiveCountries": {
            "get": {
                "summary": "Get country",
                "operationId": "Getcountry",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM2MTIxNjBlZDUxMzM1MjFhM2EyOTkiLCJpYXQiOjE2MTQyNDQxMjA2NTV9.AY5UrQpMgp51U6BrByGNrntKLgI5v_hCV-5jqrNOrtE"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "country"
                ]
            }
        },
        "/api/v1/user/governate/getActiveGovernates/602cf6c61a998fa202983a05": {
            "get": {
                "summary": "Get Governate",
                "operationId": "GetGovernate",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM2MTIxNjBlZDUxMzM1MjFhM2EyOTkiLCJpYXQiOjE2MTQyNDQxMjA2NTV9.AY5UrQpMgp51U6BrByGNrntKLgI5v_hCV-5jqrNOrtE"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Governate"
                ]
            }
        },
        "/api/v1/user/district/getActiveDistricts/60387e3e11572d7c757eeefd": {
            "get": {
                "summary": "Get District",
                "operationId": "GetDistrict",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM2MTIxNjBlZDUxMzM1MjFhM2EyOTkiLCJpYXQiOjE2MTQyNDQxMjA2NTV9.AY5UrQpMgp51U6BrByGNrntKLgI5v_hCV-5jqrNOrtE"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "District"
                ]
            }
        },
        "/api/v1/user/city/getActivecities/60387e2a11572d7c757eeefc": {
            "get": {
                "summary": "Get City",
                "operationId": "GetCity",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "City"
                ]
            }
        },
        "/api/v1/user/userContactUs": {
            "post": {
                "summary": "Contact Us after login",
                "operationId": "ContactUsafterlogin",
                "parameters": [
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "android"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": "Ajeet",
                                    "subject": "Testing",
                                    "comments": "This is testing comments"
                                }
                            },
                            "example": "{\n    \"name\":\"Ajeet\",\n    \"subject\":\"Testing\",\n    \"comments\":\"This is testing comments\"\n}"
                        }
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/contactUs": {
            "post": {
                "summary": "Contact Us before login",
                "operationId": "ContactUsbeforelogin",
                "parameters": [
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "android"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": "Ajeet",
                                    "subject": "Testing",
                                    "email": "ajeet@gmail.com",
                                    "comments": "This is testing comments",
                                    "userType": "user"
                                }
                            },
                            "example": "{\n    \"name\":\"Ajeet\",\n    \"subject\":\"Testing\",\n    \"email\":\"ajeet@gmail.com\",\n    \"comments\":\"This is testing comments\",\n    \"userType\":\"user\"\n}"
                        }
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/register": {
            "post": {
                "summary": "User register",
                "operationId": "Userregister",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "multipart/form-data"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "firebaseToken",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "qwerty"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/x-www-form-urlencoded": {
                            "schema": {
                                "type": "object",
                                "required": [
                                    "name",
                                    "gender",
                                    "DOB",
                                    "email",
                                    "countryCode",
                                    "mobileNumber",
                                    "mobileNoStatus",
                                    "timezone",
                                    "signUpBy",
                                    "deviceType"
                                ],
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "example": "Pankaj ios"
                                    },
                                    "gender": {
                                        "type": "string",
                                        "example": "Male"
                                    },
                                    "DOB": {
                                        "type": "string",
                                        "example": "2020-12-12"
                                    },
                                    "email": {
                                        "type": "string",
                                        "example": "contact.sfs9@gmail.com"
                                    },
                                    "countryCode": {
                                        "type": "string",
                                        "example": "+91"
                                    },
                                    "mobileNumber": {
                                        "type": "string",
                                        "example": "9464541667"
                                    },
                                    "mobileNoStatus": {
                                        "type": "string",
                                        "example": "verified"
                                    },
                                    "password": {
                                        "type": "string",
                                        "example": "123456"
                                    },
                                    "facebookId": {
                                        "type": "string",
                                        "example": "856856325456546"
                                    },
                                    "timezone": {
                                        "type": "string",
                                        "example": "asia/kolkata"
                                    },
                                    "signUpBy": {
                                        "type": "string",
                                        "example": "manual"
                                    },
                                    "deviceType": {
                                        "type": "string",
                                        "example": "ios"
                                    }
                                }
                            },
                            "example": [
                                {
                                    "key": "name",
                                    "value": "Pankaj ios",
                                    "type": "text"
                                },
                                {
                                    "key": "gender",
                                    "value": "Male",
                                    "type": "text"
                                },
                                {
                                    "key": "DOB",
                                    "value": "2020-12-12",
                                    "type": "text"
                                },
                                {
                                    "key": "referalCode",
                                    "value": "12121",
                                    "type": "text",
                                    "disabled": true
                                },
                                {
                                    "key": "email",
                                    "value": "contact.sfs9@gmail.com",
                                    "type": "text"
                                },
                                {
                                    "key": "countryCode",
                                    "value": "+91",
                                    "type": "text"
                                },
                                {
                                    "key": "mobileNumber",
                                    "value": "9464541667",
                                    "type": "text"
                                },
                                {
                                    "key": "mobileNoStatus",
                                    "value": "verified",
                                    "type": "text"
                                },
                                {
                                    "key": "password",
                                    "value": "123456",
                                    "type": "text"
                                },
                                {
                                    "key": "googleId",
                                    "value": "",
                                    "type": "text",
                                    "disabled": true
                                },
                                {
                                    "key": "facebookId",
                                    "value": "856856325456546",
                                    "type": "text"
                                },
                                {
                                    "key": "appleId",
                                    "value": "9464541667",
                                    "type": "text",
                                    "disabled": true
                                },
                                {
                                    "key": "microsoftId",
                                    "value": "",
                                    "type": "text",
                                    "disabled": true
                                },
                                {
                                    "key": "timezone",
                                    "value": "asia/kolkata",
                                    "type": "text"
                                },
                                {
                                    "key": "signUpBy",
                                    "value": "manual",
                                    "type": "text"
                                },
                                {
                                    "key": "deviceType",
                                    "value": "ios",
                                    "type": "text"
                                },
                                {
                                    "key": "image",
                                    "type": "file",
                                    "src": [],
                                    "disabled": true
                                }
                            ]
                        }
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/validateParams": {
            "post": {
                "summary": "Validate Params",
                "operationId": "ValidateParams",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "email": "",
                                    "mobileNumber": "9464541667",
                                    "countryCode": "+91",
                                    "signUpBy": "apple"
                                }
                            },
                            "example": "{\n    \"email\":\"\",\n    \"mobileNumber\":\"9464541667\",\n    \"countryCode\":\"+91\",\n    \"signUpBy\":\"apple\"\n}"
                        }
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/getUserProfile": {
            "get": {
                "summary": "Get User Profile",
                "operationId": "GetUserProfile",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM0ZDY2MDViOGVjODhhMzU5NTQ4ZmQiLCJpYXQiOjE2MTQwNzU0ODg2MDZ9.i0rV6ZirOZOxLgbKbXwMUC5_da1n2shoYrOjLDY76z4"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/getUserDetails/602bc4b024c4341944980cd2": {
            "get": {
                "summary": "Get User Details",
                "operationId": "GetUserDetails",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/login": {
            "post": {
                "summary": "Login",
                "operationId": "Login",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "firebaseToken",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "qwerty"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "$ref": "#/components/parameters/timezone"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "email": "contact.sfs9@gmail.com",
                                    "firebaseToken": "dad",
                                    "deviceType": "ios",
                                    "password": "123456"
                                }
                            },
                            "example": "{\n    \"email\":\"contact.sfs9@gmail.com\",\n    \"firebaseToken\":\"dad\",\n    \"deviceType\":\"ios\",\n    \"password\":\"123456\"\n}"
                        }
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/revokeFirebaseRefreshTokens": {
            "post": {
                "summary": "revokeFirebaseRefreshTokens",
                "operationId": "revokeFirebaseRefreshTokens",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "firebaseToken",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "qwerty"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "firebaseToken": "dad",
                                    "deviceType": "ios",
                                    "firebaseUid": 123456
                                }
                            },
                            "example": "{\n   \"firebaseToken\":\"dad\",\n    \"deviceType\":\"ios\",\n    \"firebaseUid\":\"123456\"\n}"
                        }
                    }
                },
                "tags": [
                    "revokeFirebaseRefreshTokens"
                ]
            }
        },
        "/api/v1/user/forgotPassword": {
            "post": {
                "summary": "Forgot Password",
                "operationId": "ForgotPassword",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "email": "chitesh444@gmail.com"
                                }
                            },
                            "example": "{\n    \"email\":\"chitesh444@gmail.com\"\n}"
                        }
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/resetPassword": {
            "post": {
                "summary": "Reset Password",
                "operationId": "ResetPassword",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "email": "mysteriousboy67@yahoo.com",
                                    "password": "123456",
                                    "cnfpassword": "123456",
                                    "OTP": "1234",
                                    "type": "email"
                                }
                            },
                            "example": "{\n    \"email\":\"mysteriousboy67@yahoo.com\",\n    \"password\":\"123456\",\n    \"cnfpassword\":\"123456\",\n    \"OTP\":\"1234\",\n  \"type\":\"email\"\n}"
                        }
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/logout": {
            "post": {
                "summary": "Logout",
                "operationId": "Logout",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmF5QGdtYWlsLmNvbSIsInVzZXJJZCI6MSwiaWF0IjoxNjA2ODE4ODYwfQ.F9QhiWlYq58pjZAvg-xQxQqdsxp6dF8sQzjCl5mWavc"
                        }
                    },
                    {
                        "name": "firebaseToken",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "qwerty"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/editProfile": {
            "post": {
                "summary": "Edit Profile",
                "operationId": "EditProfile",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": "Abhay2",
                                    "email": "test4@gmail.com",
                                    "mobileNumber": "",
                                    "mobileNoStatus": "",
                                    "countryCode": "",
                                    "DOB": "",
                                    "gender": "",
                                    "password": ""
                                }
                            },
                            "example": "{\n    \"name\":\"Abhay2\",\n    \"email\":\"test4@gmail.com\",\n    \"mobileNumber\":\"\",\n    \"mobileNoStatus\":\"\",\n    \"countryCode\":\"\",\n    \"DOB\":\"\",\n    \"gender\":\"\",\n    \"password\":\"\"\n}"
                        }
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/updateProfileImage": {
            "post": {
                "summary": "Update Profile Image",
                "operationId": "UpdateProfileImage",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "multipart/form-data"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/x-www-form-urlencoded": {
                            "schema": {
                                "type": "object",
                                "required": [
                                    "file"
                                ],
                                "properties": {
                                    "file": {
                                        "type": "string",
                                        "format": "binary"
                                    }
                                }
                            },
                            "example": [
                                {
                                    "key": "image",
                                    "type": "file",
                                    "src": "/home/ajeet/Downloads/image/pexels-photo-863963.jpeg"
                                }
                            ]
                        }
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/changePassword": {
            "post": {
                "summary": "Change Password",
                "operationId": "ChangePassword",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/x-www-form-urlencoded": {
                            "schema": {
                                "type": "object",
                                "required": [
                                    "oldPassword",
                                    "newPassword",
                                    "userId"
                                ],
                                "properties": {
                                    "oldPassword": {
                                        "type": "string",
                                        "example": "Admin@123"
                                    },
                                    "newPassword": {
                                        "type": "string",
                                        "example": "Check@45a"
                                    },
                                    "userId": {
                                        "type": "string",
                                        "example": "4"
                                    }
                                }
                            }
                        }
                    }
                },
                "tags": [
                    "Contact us"
                ]
            }
        },
        "/api/v1/user/showActiveServiceToCustomerByLocation": {
            "post": {
                "summary": "show Active Service To Customer By Location",
                "operationId": "showActiveServiceToCustomerByLocation",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "latitude": 25.754853531661578,
                                    "longitude": 89.26691443391533,
                                    "page": 1,
                                    "limit": 10
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/user/checkIfUserInsideAnyBound": {
            "post": {
                "summary": "check If User Inside Any Bound",
                "operationId": "checkIfUserInsideAnyBound",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "userLocation": {
                                        "lat": 29.99651634985611,
                                        "lng": 31.422087591029953
                                    }
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/user/getServiceProviderByServiceIdList": {
            "post": {
                "summary": "get Service Provider By ServiceId List",
                "operationId": "getServiceProviderByServiceIdList",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "serviceId": [
                                        "603ce93a5f17bd23a827fcf8",
                                        "603cc5b44cf9b71e78182f98"
                                    ]
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/addAdmin": {
            "post": {
                "summary": "Add Admin",
                "operationId": "AddAdmin",
                "parameters": [
                    {
                        "$ref": "#/components/parameters/"
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ar"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": "Admin",
                                    "email": "alista@gmail.com",
                                    "countryCode": "+91",
                                    "mobileNumber": "9856856256",
                                    "password": "Alista@#000"
                                }
                            },
                            "example": "{\n    \"name\":\"Admin\",\n    \"email\":\"alista@gmail.com\",\n    \"countryCode\":\"+91\",\n    \"mobileNumber\":\"9856856256\",\n    \"password\":\"Alista@#000\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/replyToQuery": {
            "post": {
                "summary": "reply to query",
                "operationId": "replyToQuery",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "queryId": "607eb1d4f0a11ebb9c16afcd",
                                    "reply": "adhskfjgfkjs"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/resetPassword": {
            "post": {
                "summary": "admin reset password",
                "operationId": "adminresetPassword",
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "email": "kcRbmlITMT@gmail.com"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/getCustomerQueryById/607eb1d4f0a11ebb9c16afcd": {
            "get": {
                "summary": "get customer query By Id",
                "operationId": "getCustomerQueryById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/adminLogin": {
            "post": {
                "summary": "Admin Login",
                "operationId": "AdminLogin",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "email": "alista@gmail.com",
                                    "password": "Alista@#321"
                                }
                            },
                            "example": "{\n    \"email\":\"alista@gmail.com\",\n    \"password\":\"Alista@#321\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/editProfile": {
            "post": {
                "summary": "Edit Profile",
                "operationId": "EditProfile5",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "email": "alista@gmail.com",
                                    "password": "123456"
                                }
                            },
                            "example": "{\n    \"email\":\"alista@gmail.com\",\n    \"password\":\"123456\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/adminLogout": {
            "post": {
                "summary": "Admin Logout",
                "operationId": "AdminLogout",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": ""
                            },
                            "example": ""
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/changePassword": {
            "post": {
                "summary": "admin Change Password",
                "operationId": "adminChangePassword",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MjI4NzI4OGQzZDVkMTNjMzIyYTc0MjgiLCJpYXQiOjE2NjUwMzg5MDQ3NjJ9.HP5bWE4HKeEmPrl_8fP6hvJq35LbQ1UV9oWL_oHQNcI"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "oldPassword": "eyueio@#000",
                                    "password": "eyueio@#000"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/user/getUsersWithFilter": {
            "post": {
                "summary": "Get All User With Filter",
                "operationId": "GetAllUserWithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{sadminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "language": "en",
                                    "user": "",
                                    "country": "",
                                    "governate": "",
                                    "city": "",
                                    "district": "",
                                    "sortField": "createdAt",
                                    "sortOrder": 1,
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\n    \"language\": \"en\",\n    \"user\":\"\",\n    \"country\": \"\",\n    \"governate\": \"\",\n    \"city\": \"\",\n    \"district\": \"\",\n    \"sortField\": \"createdAt\",\n    \"sortOrder\": 1,\n    \"limit\": 10,\n    \"page\": 1\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/user/blockUser": {
            "post": {
                "summary": "Block User by id",
                "operationId": "BlockUserbyid",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "userId": "",
                                    "status": "blocked"
                                }
                            },
                            "example": "{\r\n    \"userId\":\"\",\r\n    \"status\":\"blocked\"\r\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/user/removeUser": {
            "post": {
                "summary": "Delete User by id",
                "operationId": "DeleteUserbyid",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "userId": ""
                                }
                            },
                            "example": "{\r\n    \"userId\":\"\"\r\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/user/getUserByServiceLocation": {
            "post": {
                "summary": "get User By Service Location",
                "operationId": "getUserByServiceLocation",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "countryId": "",
                                    "governateId": "602d0d0c1a998fa202983a07",
                                    "cityId": "",
                                    "districtId": "",
                                    "serviceId": "603cc5b44cf9b71e78182f98"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/provider/getProvidersWithFilter": {
            "post": {
                "summary": "Get Provider With Filter",
                "operationId": "GetProviderWithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "language": "en",
                                    "provider": "test",
                                    "country": "",
                                    "governate": "",
                                    "city": "",
                                    "district": "",
                                    "sortField": "createdAt",
                                    "sortOrder": 1,
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\n    \"language\": \"en\",\n    \"provider\":\"test\",\n    \"country\": \"\",\n    \"governate\": \"\",\n    \"city\": \"\",\n    \"district\": \"\",\n    \"sortField\": \"createdAt\",\n    \"sortOrder\": 1,\n    \"limit\": 10,\n    \"page\": 1\n}"
                        }
                    }
                },
                "tags": [
                    "provider"
                ]
            }
        },
        "/api/v1/admin/provider/removeProvider": {
            "post": {
                "summary": "Delete Provider by id",
                "operationId": "DeleteProviderbyid",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "userId": ""
                                }
                            },
                            "example": "{\r\n    \"userId\":\"\"\r\n}"
                        }
                    }
                },
                "tags": [
                    "provider"
                ]
            }
        },
        "/api/v1/admin/provider/approveProvider": {
            "post": {
                "summary": "Approve provider By Id",
                "operationId": "ApproveproviderById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "accountStatus": "approved",
                                    "userId": "6041bc2cd96847dbffbbc978"
                                }
                            },
                            "example": "{\n    \"accountStatus\":\"approved\",\n    \"userId\":\"6041bc2cd96847dbffbbc978\"\n}"
                        }
                    }
                },
                "tags": [
                    "provider"
                ]
            }
        },
        "/api/v1/admin/provider/blockProvider": {
            "post": {
                "summary": "Block Provider by id",
                "operationId": "BlockProviderbyid",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "userId": "",
                                    "status": "blocked"
                                }
                            },
                            "example": "{\r\n    \"userId\":\"\",\r\n    \"status\":\"blocked\"\r\n}"
                        }
                    }
                },
                "tags": [
                    "provider"
                ]
            }
        },
        "/api/v1/admin/pages/addContent": {
            "post": {
                "summary": "Add Privacy policy",
                "operationId": "AddPrivacypolicy",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{sadminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": {
                                        "en": "Terms an Condition",
                                        "ar": "شروط شرط"
                                    },
                                    "type": "TERMS_CONDITIONS",
                                    "status": "active",
                                    "content": {
                                        "en": "<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width'><title>Terms &amp; Conditions</title><style>body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding:1em; } </style></head><body><strong>Terms &amp; Conditions</strong> <p>By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to skillroot.</p><p> skillroot is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.</p> <p> The Alist app stores and processes personal data that you have provided to us, in order to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the Alist app won’t work properly or at all.</p><p> You should be aware that there are certain things that skillroot will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but skillroot cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.</p> <p></p> <p> If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app. </p> <p> Along the same lines, skillroot cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, skillroot cannot accept responsibility. </p> <p> With respect to skillroot’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. skillroot accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app. </p> <p> At some point, we may wish to update the app. The app is currently available on Android &amp; iOS – the requirements for both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. skillroot does not promise that it will always update the app so that it is relevant to you and/or works with the Android &amp; iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.   </p> <p><strong>Changes to This Terms and Conditions</strong></p> <p>   We may update our Terms and Conditions  from time to time. Thus, you are advised to review this page  periodically for any changes. We will  notify you of any changes by posting the new Terms and  Conditions on this page.  </p> <p>  These terms and conditions are effective as of 2021-03-05  </p> <p><strong>Contact Us</strong></p> <p> If you have any questions or suggestions about our   Terms and Conditions, do not hesitate to contact us  at alista@gmail.com. </p></body></html>",
                                        "ar": "<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width'><title>Terms &amp; Conditions</title><style>body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding:1em; } </style></head><body><strong>Terms &amp; Conditions</strong> <p>By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to skillroot.</p><p> skillroot is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.</p> <p> The Alist app stores and processes personal data that you have provided to us, in order to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the Alist app won’t work properly or at all.</p><p> You should be aware that there are certain things that skillroot will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but skillroot cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.</p> <p></p> <p> If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app. </p> <p> Along the same lines, skillroot cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, skillroot cannot accept responsibility. </p> <p> With respect to skillroot’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. skillroot accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app. </p> <p> At some point, we may wish to update the app. The app is currently available on Android &amp; iOS – the requirements for both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. skillroot does not promise that it will always update the app so that it is relevant to you and/or works with the Android &amp; iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.   </p> <p><strong>Changes to This Terms and Conditions</strong></p> <p>   We may update our Terms and Conditions  from time to time. Thus, you are advised to review this page  periodically for any changes. We will  notify you of any changes by posting the new Terms and  Conditions on this page.  </p> <p>  These terms and conditions are effective as of 2021-03-05  </p> <p><strong>Contact Us</strong></p> <p> If you have any questions or suggestions about our   Terms and Conditions, do not hesitate to contact us  at alista@gmail.com. </p></body></html>"
                                    }
                                }
                            },
                            "example": "{\n    \"name\":{\n        \"en\":\"Terms an Condition\",\n        \"ar\":\"شروط شرط\"\n    },\n    \"type\":\"TERMS_CONDITIONS\",\n    \"status\":\"active\",\n    \"content\":{\n        \"en\":\"<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width'><title>Terms &amp; Conditions</title><style>body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding:1em; } </style></head><body><strong>Terms &amp; Conditions</strong> <p>By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to skillroot.</p><p> skillroot is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.</p> <p> The Alist app stores and processes personal data that you have provided to us, in order to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the Alist app won’t work properly or at all.</p><p> You should be aware that there are certain things that skillroot will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but skillroot cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.</p> <p></p> <p> If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app. </p> <p> Along the same lines, skillroot cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, skillroot cannot accept responsibility. </p> <p> With respect to skillroot’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. skillroot accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app. </p> <p> At some point, we may wish to update the app. The app is currently available on Android &amp; iOS – the requirements for both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. skillroot does not promise that it will always update the app so that it is relevant to you and/or works with the Android &amp; iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.   </p> <p><strong>Changes to This Terms and Conditions</strong></p> <p>   We may update our Terms and Conditions  from time to time. Thus, you are advised to review this page  periodically for any changes. We will  notify you of any changes by posting the new Terms and  Conditions on this page.  </p> <p>  These terms and conditions are effective as of 2021-03-05  </p> <p><strong>Contact Us</strong></p> <p> If you have any questions or suggestions about our   Terms and Conditions, do not hesitate to contact us  at alista@gmail.com. </p></body></html>\",\n        \"ar\":\"<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width'><title>Terms &amp; Conditions</title><style>body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding:1em; } </style></head><body><strong>Terms &amp; Conditions</strong> <p>By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to skillroot.</p><p> skillroot is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.</p> <p> The Alist app stores and processes personal data that you have provided to us, in order to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the Alist app won’t work properly or at all.</p><p> You should be aware that there are certain things that skillroot will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but skillroot cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.</p> <p></p> <p> If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app. </p> <p> Along the same lines, skillroot cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, skillroot cannot accept responsibility. </p> <p> With respect to skillroot’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. skillroot accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app. </p> <p> At some point, we may wish to update the app. The app is currently available on Android &amp; iOS – the requirements for both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. skillroot does not promise that it will always update the app so that it is relevant to you and/or works with the Android &amp; iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.   </p> <p><strong>Changes to This Terms and Conditions</strong></p> <p>   We may update our Terms and Conditions  from time to time. Thus, you are advised to review this page  periodically for any changes. We will  notify you of any changes by posting the new Terms and  Conditions on this page.  </p> <p>  These terms and conditions are effective as of 2021-03-05  </p> <p><strong>Contact Us</strong></p> <p> If you have any questions or suggestions about our   Terms and Conditions, do not hesitate to contact us  at alista@gmail.com. </p></body></html>\"\n    }\n}"
                        }
                    }
                },
                "tags": [
                    "Pages"
                ]
            }
        },
        "/api/v1/admin/pages/editContent": {
            "post": {
                "summary": "Edit Privacy policy",
                "operationId": "EditPrivacypolicy",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{sadminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/x-www-form-urlencoded": {
                            "schema": {
                                "type": "object",
                                "required": [
                                    "contentId",
                                    "content"
                                ],
                                "properties": {
                                    "contentId": {
                                        "type": "string",
                                        "example": "602c9e8a7d1a7d7e0b5d43b8"
                                    },
                                    "content": {
                                        "type": "string",
                                        "example": "<!DOCTYPE html>\n    <html>\n    <head>\n      <meta charset='utf-8'>\n      <meta name='viewport' content='width=device-width'>\n      <title>Privacy Policy</title>\n      <style> body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding:1em; } </style>\n    </head>\n    <body>\n    <p><strong>Privacy Policy</strong></p>\n<p>Skillroot built the Alista app as a Commercial app. This SERVICE is provided by Skillroot and is intended for use as is.</p>\n<p>This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</p>\n<p>If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p>\n<p>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Alista unless otherwise defined in this Privacy Policy.</p>\n<p><strong>Information Collection and Use</strong></p>\n<p>For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Alista corporation. The information that we request will be retained by us and used as described in this privacy policy.</p>\n<p><strong>Log Data</strong></p>\n<p>We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (&ldquo;IP&rdquo;) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</p>\n<p><strong>Cookies</strong></p>\n<p>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.</p>\n<p>This Service does not use these &ldquo;cookies&rdquo; explicitly. However, the app may use third party code and libraries that use &ldquo;cookies&rdquo; to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.</p>\n<p><strong>Service Providers</strong></p>\n<p>We may employ third-party companies and individuals due to the following reasons:</p>\n<ul>\n<li>To facilitate our Service;</li>\n<li>To provide the Service on our behalf;</li>\n<li>To perform Service-related services; or</li>\n<li>To assist us in analyzing how our Service is used.</li>\n</ul>\n<p>We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p>\n<p><strong>Security</strong></p>\n<p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>\n<p><strong>Links to Other Sites</strong></p>\n<p>This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>\n<p><strong>Children&rsquo;s Privacy</strong></p>\n<p>These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</p>\n<p><strong>Changes to This Privacy Policy</strong></p>\n<p>We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.</p>\n<p>This policy is effective as of 2021-03-02</p>\n<p><strong>Contact Us</strong></p>\n<p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at alista@gmail.com.</p>\n    </body>\n    </html>\n      "
                                    }
                                }
                            }
                        }
                    }
                },
                "tags": [
                    "Pages"
                ]
            }
        },
        "/api/v1/admin/pages/deleteContent": {
            "post": {
                "summary": "Delete Privacy policy",
                "operationId": "DeletePrivacypolicy",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{sadminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "contentId": "603894225435374e2eb4cd8b",
                                    "status": "suspended"
                                }
                            },
                            "example": "{\n    \"contentId\":\"603894225435374e2eb4cd8b\",\n    \"status\":\"suspended\"\n}"
                        }
                    }
                },
                "tags": [
                    "Pages"
                ]
            }
        },
        "/api/v1/admin/pages/getAllContents": {
            "get": {
                "summary": "Get All Contents",
                "operationId": "GetAllContents",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{sadminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Pages"
                ]
            }
        },
        "/api/v1/admin/pages/getPrivacyPolicyContent": {
            "get": {
                "summary": "Get Privacy Policy",
                "operationId": "GetPrivacyPolicy0",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/pages/getContentById/602b98df2ece0c6e4654da5f": {
            "get": {
                "summary": "Get contents by id",
                "operationId": "Getcontentsbyid",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Pages"
                ]
            }
        },
        "/api/v1/admin/pages/getTermsCondition": {
            "get": {
                "summary": "Get Terms and condition",
                "operationId": "GetTermsandcondition",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/pages/getPaymentAndRefundPolicies": {
            "get": {
                "summary": "Get Payment and Refund Policy",
                "operationId": "GetPaymentandRefundPolicy",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/language/addLanguage": {
            "post": {
                "summary": "Add Language",
                "operationId": "AddLanguage",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{sadminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "localeCode": "ar-AE"
                                }
                            },
                            "example": "{\n    \"localeCode\":\"ar-AE\"\n}"
                        }
                    }
                },
                "tags": [
                    "Language"
                ]
            }
        },
        "/api/v1/admin/language/editLanguage": {
            "post": {
                "summary": "Edit Language",
                "operationId": "EditLanguage",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "localeCode": "ar-AE",
                                    "languageId": "602a1517e6aa025ad5c34aef"
                                }
                            },
                            "example": "{\n    \"localeCode\":\"ar-AE\",\n    \"languageId\":\"602a1517e6aa025ad5c34aef\"\n}"
                        }
                    }
                },
                "tags": [
                    "Language"
                ]
            }
        },
        "/api/v1/admin/language/getLanguageList": {
            "get": {
                "summary": "Get Languages",
                "operationId": "GetLanguages",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Language"
                ]
            }
        },
        "/api/v1/admin/language/getEnabledLanguageList": {
            "get": {
                "summary": "Get Active Languages",
                "operationId": "GetActiveLanguages",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Language"
                ]
            }
        },
        "/api/v1/admin/language/getLanguageDetailsById/602a1517e6aa025ad5c34aef": {
            "get": {
                "summary": "Get Active Languages Copy",
                "operationId": "GetActiveLanguagesCopy",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Language"
                ]
            }
        },
        "/api/v1/admin/region/addRegion": {
            "post": {
                "summary": "Add Region",
                "operationId": "AddRegion",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "countryId": "602a4698e51c0b0afa4804f7",
                                    "governateId": "602a5ecdc069a3796cbaa914",
                                    "cityId": "602a5ecdc069a3796cbaa914",
                                    "districtId": "602a5ecdc069a3796cbaa914",
                                    "status": "active"
                                }
                            },
                            "example": "{\n    \"countryId\":\"602a4698e51c0b0afa4804f7\",\n    \"governateId\":\"602a5ecdc069a3796cbaa914\",\n    \"cityId\":\"602a5ecdc069a3796cbaa914\",\n    \"districtId\":\"602a5ecdc069a3796cbaa914\",\n    \"status\":\"active\"\n}"
                        }
                    }
                },
                "tags": [
                    "Region"
                ]
            }
        },
        "/api/v1/admin/region/editRegion": {
            "post": {
                "summary": "Edit Region",
                "operationId": "EditRegion",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "countryId": "602a4698e51c0b0afa4804f7",
                                    "governateId": "602a5ecdc069a3796cbaa914",
                                    "cityId": "602a5ecdc069a3796cbaa914",
                                    "districtId": "602a5ecdc069a3796cbaa914",
                                    "regionId": "602e0b2bb0b7f0a36f38583e",
                                    "status": "active"
                                }
                            },
                            "example": "{\n    \"countryId\":\"602a4698e51c0b0afa4804f7\",\n    \"governateId\":\"602a5ecdc069a3796cbaa914\",\n    \"cityId\":\"602a5ecdc069a3796cbaa914\",\n    \"districtId\":\"602a5ecdc069a3796cbaa914\",\n    \"regionId\":\"602e0b2bb0b7f0a36f38583e\",\n    \"status\":\"active\"\n}"
                        }
                    }
                },
                "tags": [
                    "Region"
                ]
            }
        },
        "/api/v1/admin/region/getRegions": {
            "get": {
                "summary": "Get Regions",
                "operationId": "GetRegions",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Region"
                ]
            }
        },
        "/api/v1/admin/region/getActiveRegions": {
            "get": {
                "summary": "Get Active Regions",
                "operationId": "GetActiveRegions",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Region"
                ]
            }
        },
        "/api/v1/admin/region/getRegionById/602e0b2bb0b7f0a36f38583e": {
            "get": {
                "summary": "Get Region By Id",
                "operationId": "GetRegionById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Region"
                ]
            }
        },
        "/api/v1/admin/region/getAllRegionsWithFilter": {
            "post": {
                "summary": "Get All Regions With Filter",
                "operationId": "GetAllRegionsWithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM0ZGQ1ODAyYTY0MDFkNTkzNzZjMWUiLCJpYXQiOjE2MTQyNTYxNDg2Nzh9.mDd-Rdd8m02dYpvgpQfxaW2aHbDNwbxeB_uTOfgMjaM"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "language": "en",
                                    "country": "",
                                    "governate": "INDIA",
                                    "city": "",
                                    "district": "",
                                    "sortField": "createdAt",
                                    "sortOrder": 1,
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\n    \"language\": \"en\",\n    \"country\": \"\",\n    \"governate\": \"INDIA\",\n    \"city\": \"\",\n    \"district\": \"\",\n    \"sortField\": \"createdAt\",\n    \"sortOrder\": 1,\n    \"limit\": 10,\n    \"page\": 1\n}"
                        }
                    }
                },
                "tags": [
                    "Region"
                ]
            }
        },
        "/api/v1/admin/governate/addGovernate": {
            "post": {
                "summary": "Add Governate",
                "operationId": "AddGovernate",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": {
                                        "en": "Punjab",
                                        "ar": "البنجاب"
                                    },
                                    "countryId": "602a4698e51c0b0afa4804f7",
                                    "status": "active"
                                }
                            },
                            "example": "{\n    \"name\":{\n        \"en\":\"Punjab\",\n        \"ar\":\"البنجاب\"\n    },\n    \"countryId\":\"602a4698e51c0b0afa4804f7\",\n    \"status\":\"active\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/governate/editGovernate": {
            "post": {
                "summary": "Edit Governate",
                "operationId": "EditGovernate",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": {
                                        "en": "Punjab",
                                        "ar": "البنجاب"
                                    },
                                    "countryId": "602a4698e51c0b0afa4804f7",
                                    "governateId": "602a4698e51c0b0afa4804f7",
                                    "status": "active"
                                }
                            },
                            "example": "{\n    \"name\":{\n        \"en\":\"Punjab\",\n        \"ar\":\"البنجاب\"\n    },\n    \"countryId\":\"602a4698e51c0b0afa4804f7\",\n    \"governateId\":\"602a4698e51c0b0afa4804f7\",\n    \"status\":\"active\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/governate/getGovernates": {
            "get": {
                "summary": "Get Governates",
                "operationId": "GetGovernates",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/governate/getActiveGovernates": {
            "get": {
                "summary": "Get Active Governates",
                "operationId": "GetActiveGovernates",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/governate/getGovernateById/602a5ecdc069a3796cbaa914": {
            "get": {
                "summary": "Get Governates By Id",
                "operationId": "GetGovernatesById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/governate/getGovernatesByCountryId/602a4698e51c0b0afa4804f7": {
            "get": {
                "summary": "Get Governates By Country",
                "operationId": "GetGovernatesByCountry",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/governate/getGovernateWithFilter": {
            "post": {
                "summary": "Get GovernatesWith FIlter",
                "operationId": "GetGovernatesWithFIlter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "language": "en",
                                    "country": "India",
                                    "governate": "",
                                    "page": "",
                                    "limit": ""
                                }
                            },
                            "example": "{\n    \"language\":\"en\",\n    \"country\":\"India\",\n    \"governate\":\"\",\n    \"page\":\"\",\n    \"limit\":\"\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/governate/getGovernatesByCountryIdList": {
            "post": {
                "summary": "get Governates By CountryId List",
                "operationId": "getGovernatesByCountryIdList",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "countryId": [
                                        "602cf6c61a998fa202983a05",
                                        "6066e1aebbe7309e0c4dd5eb"
                                    ]
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/city/getCitiesWithFilter": {
            "post": {
                "summary": "get cities with filter",
                "operationId": "getCitiesWithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "country": "",
                                    "governate": "",
                                    "city": "",
                                    "language": "en",
                                    "page": 1,
                                    "limit": 3,
                                    "sortField": "countryName",
                                    "sortOrder": -1
                                }
                            }
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/city/addCity": {
            "post": {
                "summary": "Add City",
                "operationId": "AddCity",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": {
                                        "en": "Mohali",
                                        "ar": "موهالي"
                                    },
                                    "countryId": "602a4698e51c0b0afa4804f7",
                                    "governateId": "602a5ecdc069a3796cbaa914",
                                    "status": "active"
                                }
                            },
                            "example": "{\n    \"name\":{\n        \"en\":\"Mohali\",\n        \"ar\":\"موهالي\"\n    },\n    \"countryId\":\"602a4698e51c0b0afa4804f7\",\n    \"governateId\":\"602a5ecdc069a3796cbaa914\",\n    \"status\":\"active\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/city/editCity": {
            "post": {
                "summary": "Edit City",
                "operationId": "EditCity",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": {
                                        "en": "Mohali",
                                        "ar": "موهالي"
                                    },
                                    "countryId": "602a4698e51c0b0afa4804f7",
                                    "governateId": "602a5ecdc069a3796cbaa914",
                                    "cityId": "602a5ecdc069a3796cbaa914",
                                    "status": "active"
                                }
                            },
                            "example": "{\n    \"name\":{\n        \"en\":\"Mohali\",\n        \"ar\":\"موهالي\"\n    },\n    \"countryId\":\"602a4698e51c0b0afa4804f7\",\n    \"governateId\":\"602a5ecdc069a3796cbaa914\",\n    \"cityId\":\"602a5ecdc069a3796cbaa914\",\n    \"status\":\"active\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/city/getCities": {
            "get": {
                "summary": "Get Cities",
                "operationId": "GetCities",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/city/getCitiesByGovernate/602a5ecdc069a3796cbaa914": {
            "get": {
                "summary": "Get Cities By Governate",
                "operationId": "GetCitiesByGovernate",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/city/getActiveCities": {
            "get": {
                "summary": "Get Active Cities",
                "operationId": "GetActiveCities",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/city/getCityById/602ba22dd61b75a53dffa18b": {
            "get": {
                "summary": "Get City By Id",
                "operationId": "GetCityById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/city/getCitiesByGovernateIdList": {
            "post": {
                "summary": "getCitiesByGovernateIdList",
                "operationId": "getCitiesByGovernateIdList",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "governateId": [
                                        "6030ada1a74127eb0670f24d",
                                        "60312ec18d04f4f97ac9decd"
                                    ]
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/district/addDistrict": {
            "post": {
                "summary": "Add District",
                "operationId": "AddDistrict",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": {
                                        "en": "India",
                                        "ar": "الهند"
                                    },
                                    "countryId": "602a4698e51c0b0afa4804f7",
                                    "cityId": "602a5ecdc069a3796cbaa914",
                                    "governateId": "602a5ecdc069a3796cbaa914",
                                    "status": "active"
                                }
                            },
                            "example": "{\n    \"name\":{\n        \"en\":\"India\",\n        \"ar\":\"الهند\"\n    },\n    \"countryId\":\"602a4698e51c0b0afa4804f7\",\n    \"cityId\":\"602a5ecdc069a3796cbaa914\",\n    \"governateId\":\"602a5ecdc069a3796cbaa914\",\n    \"status\":\"active\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/district/editDistrict": {
            "post": {
                "summary": "Edit District",
                "operationId": "EditDistrict",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": {
                                        "en": "India",
                                        "ar": "الهند"
                                    },
                                    "countryId": "602a4698e51c0b0afa4804f7",
                                    "governateId": "602a5ecdc069a3796cbaa914",
                                    "cityId": "602a5ecdc069a3796cbaa914",
                                    "districtId": "602a5ecdc069a3796cbaa914",
                                    "status": "active"
                                }
                            },
                            "example": "{\n    \"name\":{\n        \"en\":\"India\",\n        \"ar\":\"الهند\"\n    },\n    \"countryId\":\"602a4698e51c0b0afa4804f7\",\n    \"governateId\":\"602a5ecdc069a3796cbaa914\",\n    \"cityId\":\"602a5ecdc069a3796cbaa914\",\n    \"districtId\":\"602a5ecdc069a3796cbaa914\",\n    \"status\":\"active\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/district/getDistricts": {
            "get": {
                "summary": "Get Districts",
                "operationId": "GetDistricts",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/district/getDistrictsByCity/602a5ecdc069a3796cbaa914": {
            "get": {
                "summary": "Get Districts By City",
                "operationId": "GetDistrictsByCity",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/district/getActiveDistricts": {
            "get": {
                "summary": "Get Active Districts",
                "operationId": "GetActiveDistricts",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/district/getDistrictById/602a4698e51c0b0afa4804f7": {
            "get": {
                "summary": "Get District By Id",
                "operationId": "GetDistrictById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/district/getDistrictWithFilter": {
            "post": {
                "summary": "Get District with FIlter",
                "operationId": "GetDistrictwithFIlter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "language": "en",
                                    "country": "Ind",
                                    "governate": "",
                                    "district": "",
                                    "page": 1,
                                    "limit": 10
                                }
                            },
                            "example": "{\n    \"language\":\"en\",\n    \"country\":\"Ind\",\n    \"governate\":\"\",\n    \"district\":\"\",\n    \"page\":1,\n    \"limit\":10\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/district/getDistrictsByCityIdList": {
            "post": {
                "summary": "get Districts By CityId List",
                "operationId": "getDistrictsByCityIdList",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "cityId": [
                                        "60364ab815b16b414f8e7de5"
                                    ]
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/district/getGeolocationDetails": {
            "post": {
                "summary": "get Geo location Details",
                "operationId": "getGeolocationDetails",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "googleMapDistrictName": "Moharam Bek محرم بك Alexandria Governorate Egypt",
                                    "type": "edit",
                                    "districtId": "60387b9171aaf57be2d8c7c0"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/country/addCountry": {
            "post": {
                "summary": "Add Country",
                "operationId": "AddCountry",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": {
                                        "en": "India",
                                        "ar": "الهند"
                                    },
                                    "status": "active"
                                }
                            },
                            "example": "{\n    \"name\":{\n        \"en\":\"India\",\n        \"ar\":\"الهند\"\n    },\n    \"status\":\"active\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/country/editCountry": {
            "post": {
                "summary": "Edit Country",
                "operationId": "EditCountry",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": {
                                        "en": "India",
                                        "ar": "الهند"
                                    },
                                    "status": "active",
                                    "countryId": ""
                                }
                            },
                            "example": "{\n    \"name\":{\n        \"en\":\"India\",\n        \"ar\":\"الهند\"\n    },\n    \"status\":\"active\",\n    \"countryId\":\"\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/country/getCountries": {
            "get": {
                "summary": "Get Countries",
                "operationId": "GetCountries",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/country/getCountriesWithFilter": {
            "post": {
                "summary": "Get Countries With FIlter",
                "operationId": "GetCountriesWithFIlter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "language": "en",
                                    "country": "",
                                    "page": "",
                                    "limit": ""
                                }
                            },
                            "example": "{\n    \"language\":\"en\",\n    \"country\":\"\",\n    \"page\":\"\",\n    \"limit\":\"\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/country/getActiveCountries": {
            "get": {
                "summary": "Get Active Countries",
                "operationId": "GetActiveCountries",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/country/getCountryById/602a4698e51c0b0afa4804f7": {
            "get": {
                "summary": "Get Country By Id",
                "operationId": "GetCountryById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/category/addCategory": {
            "post": {
                "summary": "Add Category",
                "operationId": "AddCategory",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": {
                                        "en": "India",
                                        "ar": "الهند"
                                    },
                                    "status": "active"
                                }
                            },
                            "example": "{\n    \"name\":{\n        \"en\":\"India\",\n        \"ar\":\"الهند\"\n    },\n    \"status\":\"active\"\n}"
                        }
                    }
                },
                "tags": [
                    "Category"
                ]
            }
        },
        "/api/v1/admin/category/editCategory": {
            "post": {
                "summary": "Edit Category",
                "operationId": "EditCategory",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": {
                                        "en": "India",
                                        "ar": "الهند"
                                    },
                                    "status": "active",
                                    "categotyId": ""
                                }
                            },
                            "example": "{\n    \"name\":{\n        \"en\":\"India\",\n        \"ar\":\"الهند\"\n    },\n    \"status\":\"active\",\n    \"categotyId\":\"\"\n}"
                        }
                    }
                },
                "tags": [
                    "Category"
                ]
            }
        },
        "/api/v1/admin/category/getCategories": {
            "get": {
                "summary": "Get Categories",
                "operationId": "GetCategories",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Category"
                ]
            }
        },
        "/api/v1/admin/category/getCategoriesWithFilter": {
            "post": {
                "summary": "Get Category With Filter",
                "operationId": "GetCategoryWithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "language": "en",
                                    "category": "",
                                    "sortField": "createdAt",
                                    "sortOrder": 1,
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\n    \"language\": \"en\",\n    \"category\": \"\",\n    \"sortField\": \"createdAt\",\n    \"sortOrder\": 1,\n    \"limit\": 10,\n    \"page\": 1\n}"
                        }
                    }
                },
                "tags": [
                    "Category"
                ]
            }
        },
        "/api/v1/admin/category/getActiveCategories": {
            "get": {
                "summary": "Get Active Category",
                "operationId": "GetActiveCategory",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Category"
                ]
            }
        },
        "/api/v1/admin/category/getCategoryById/65465as2d34f45w42f": {
            "get": {
                "summary": "Get Category By Id",
                "operationId": "GetCategoryById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Category"
                ]
            }
        },
        "/api/v1/admin/category/deleteCategory/65465as2d34f45w42f": {
            "delete": {
                "summary": "Delete Category By Id",
                "operationId": "DeleteCategoryById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Category"
                ]
            }
        },
        "/api/v1/admin/category/blockCategoryLocation": {
            "post": {
                "summary": "block Category Location",
                "operationId": "blockCategoryLocation",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "categoryId": "604085e17508bbd77add1f89"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/category/getCategoryByIdWithBlockedLocation/604085e17508bbd77add1f89": {
            "get": {
                "summary": "get Category By Id With BlockedLocation",
                "operationId": "getCategoryByIdWithBlockedLocation",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/category/getCityForBlockCategory": {
            "post": {
                "summary": "get City For Block Category",
                "operationId": "getCityForBlockCategory",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "searchValue": "",
                                    "page": 1,
                                    "limit": 2,
                                    "countryId": [
                                        "602cf6c61a998fa202983a05"
                                    ],
                                    "governateId": [
                                        "602dfa28db9680aa8f093f40"
                                    ]
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/category/getCountryForBlockCategory": {
            "post": {
                "summary": "get Country For Block Category",
                "operationId": "getCountryForBlockCategory",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "searchValue": "",
                                    "page": 1,
                                    "limit": 2
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/category/getDistrictForBlockCategory": {
            "post": {
                "summary": "get District For Block Category",
                "operationId": "getDistrictForBlockCategory",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "searchValue": "",
                                    "page": 1,
                                    "limit": 2,
                                    "countryId": [
                                        "602cf6c61a998fa202983a05"
                                    ],
                                    "governateId": [
                                        "602dfa28db9680aa8f093f40"
                                    ],
                                    "cityId": [
                                        "60379a846a48d26ed3c2bebb"
                                    ]
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/category/getGovernateForBlockCategory": {
            "post": {
                "summary": "get Governate For Block Category",
                "operationId": "getGovernateForBlockCategory",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "searchValue": "",
                                    "page": 1,
                                    "limit": 100,
                                    "countryId": [
                                        "602f80aaf270f1d2feaa9036"
                                    ]
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/category/getCategoryByLocationList": {
            "post": {
                "summary": "get Category By Location List",
                "operationId": "getCategoryByLocationList",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "districtId": [
                                        "604207158e169e830cdc37d7"
                                    ],
                                    "governateId": [
                                        "6030ada1a74127eb0670f24d"
                                    ],
                                    "cityId": [
                                        "60364ab815b16b414f8e7de5"
                                    ],
                                    "countryId": [
                                        "602cf6c61a998fa202983a05"
                                    ]
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/service/addService": {
            "post": {
                "summary": "Add Service",
                "operationId": "AddService",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "required": [
                                    "name",
                                    "status",
                                    "categoryId",
                                    "file"
                                ],
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "example": "[object Object]"
                                    },
                                    "status": {
                                        "type": "string",
                                        "example": "active"
                                    },
                                    "categoryId": {
                                        "type": "string",
                                        "example": ""
                                    },
                                    "file": {
                                        "type": "string",
                                        "format": "binary"
                                    }
                                }
                            },
                            "example": [
                                {
                                    "key": "name",
                                    "value": "[object Object]",
                                    "type": "text"
                                },
                                {
                                    "key": "status",
                                    "value": "active",
                                    "type": "text"
                                },
                                {
                                    "key": "categoryId",
                                    "value": "",
                                    "type": "text"
                                },
                                {
                                    "key": "image",
                                    "type": "file",
                                    "src": []
                                }
                            ]
                        }
                    }
                },
                "tags": [
                    "Service"
                ]
            }
        },
        "/api/v1/admin/service/editService": {
            "post": {
                "summary": "Edit Service",
                "operationId": "EditService",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "required": [
                                    "name",
                                    "serviceId",
                                    "categoryId",
                                    "status",
                                    "file"
                                ],
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "example": "[object Object]"
                                    },
                                    "serviceId": {
                                        "type": "string",
                                        "example": ""
                                    },
                                    "categoryId": {
                                        "type": "string",
                                        "example": ""
                                    },
                                    "status": {
                                        "type": "string",
                                        "example": "active"
                                    },
                                    "file": {
                                        "type": "string",
                                        "format": "binary"
                                    }
                                }
                            },
                            "example": [
                                {
                                    "key": "name",
                                    "value": "[object Object]",
                                    "type": "text"
                                },
                                {
                                    "key": "serviceId",
                                    "value": "",
                                    "type": "text"
                                },
                                {
                                    "key": "categoryId",
                                    "value": "",
                                    "type": "text"
                                },
                                {
                                    "key": "status",
                                    "value": "active",
                                    "type": "text"
                                },
                                {
                                    "key": "image",
                                    "type": "file",
                                    "src": []
                                }
                            ]
                        }
                    }
                },
                "tags": [
                    "Service"
                ]
            }
        },
        "/api/v1/admin/service/getServices": {
            "get": {
                "summary": "Get Service",
                "operationId": "GetService",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Service"
                ]
            }
        },
        "/api/v1/admin/service/getServicesWithFilter": {
            "post": {
                "summary": "Get Service With Filter",
                "operationId": "GetServiceWithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "language": "en",
                                    "category": "",
                                    "service": "",
                                    "sortField": "createdAt",
                                    "sortOrder": 1,
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\n    \"language\": \"en\",\n    \"category\": \"\",\n    \"service\": \"\",\n    \"sortField\": \"createdAt\",\n    \"sortOrder\": 1,\n    \"limit\": 10,\n    \"page\": 1\n}"
                        }
                    }
                },
                "tags": [
                    "Service"
                ]
            }
        },
        "/api/v1/admin/service/getActiveServices": {
            "get": {
                "summary": "Get Active Service",
                "operationId": "GetActiveService",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Service"
                ]
            }
        },
        "/api/v1/admin/service/getServiceById/3f3df543sdf5vw223dfdf": {
            "get": {
                "summary": "Get Service By Id",
                "operationId": "GetServiceById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Service"
                ]
            }
        },
        "/api/v1/admin/service/deleteService/3f3df543sdf5vw223dfdf": {
            "delete": {
                "summary": "Delete Service By Id",
                "operationId": "DeleteServiceById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Service"
                ]
            }
        },
        "/api/v1/admin/service/getUnblockedCitiesByService": {
            "post": {
                "summary": "get Unblocked Cities By Service",
                "operationId": "getUnblockedCitiesByService",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "serviceId": "603ce8be5f17bd23a827fcf7",
                                    "governateId": "60312ec18d04f4f97ac9decd"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/service/getUnblockedCountriesByServiceId": {
            "post": {
                "summary": "get Unblocked Countries By ServiceId",
                "operationId": "getUnblockedCountriesByServiceId",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "serviceId": "603ce8be5f17bd23a827fcf7"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/service/getUnblockedDistrictsByService": {
            "post": {
                "summary": "get Unblocked Districts By Service",
                "operationId": "getUnblockedDistrictsByService",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "serviceId": "603ce8be5f17bd23a827fcf7",
                                    "cityId": "6037eac36b88dc725a10063d"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/service/getUnblockedGovernatesByService": {
            "post": {
                "summary": "get Unblocked Governates By Service",
                "operationId": "getUnblockedGovernatesByService",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "serviceId": "603ce8be5f17bd23a827fcf7",
                                    "countryId": "602d039b1a998fa202983a06"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/service/getServicesByCategoryIdList": {
            "post": {
                "summary": "get Services By CategoryId List",
                "operationId": "getServicesByCategoryIdList",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "categoryId": [
                                        "604248077508bbd77aa31545"
                                    ]
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/service/getServicesByCategoryAndLocationList": {
            "post": {
                "summary": "get Services By Category And Location List",
                "operationId": "getServicesByCategoryAndLocationList",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "categoryId": [
                                        "62a5ee7dafdefa76f7b685bc"
                                    ],
                                    "districtId": [
                                        "604207158e169e830cdc37d7"
                                    ],
                                    "governateId": [
                                        "6030ada1a74127eb0670f24d"
                                    ],
                                    "cityId": [
                                        "60364ab815b16b414f8e7de5"
                                    ],
                                    "countryId": [
                                        "602cf6c61a998fa202983a05"
                                    ]
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/service/ServiceByIdWithBlockedLocation/60e7f8d0e2584f6634ab2434": {
            "get": {
                "summary": "Service By Id With Blocked Location",
                "operationId": "ServiceByIdWithBlockedLocation",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/getContactUsWithFilter": {
            "post": {
                "summary": "Get ContactUs with Filter",
                "operationId": "GetContactUswithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "user": "",
                                    "sortField": "name",
                                    "sortOrder": -1,
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\n    \"user\": \"\",\n    \"sortField\": \"name\",\n    \"sortOrder\": -1,\n    \"limit\": 10,\n    \"page\": 1\n}"
                        }
                    }
                },
                "tags": [
                    "Contact Us"
                ]
            }
        },
        "/api/v1/admin/getContactUsContactedWithFilter": {
            "post": {
                "summary": "get Contact Us Contacted With Filter",
                "operationId": "getContactUsContactedWithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": "",
                                    "sortField": "name",
                                    "sortOrder": -1,
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\n    \"name\": \"\",\n    \"sortField\": \"name\",\n    \"sortOrder\": -1,\n    \"limit\": 10,\n    \"page\": 1\n}"
                        }
                    }
                },
                "tags": [
                    "Contact Us"
                ]
            }
        },
        "/api/v1/provider/region/addRegion": {
            "post": {
                "summary": "Add Region",
                "operationId": "AddRegion0",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM3MjlkZDFiZTE0ZTRhMjdmMTU1YjMiLCJpYXQiOjE2MTQzMTIxNTE2NzZ9.wNS8KPueOPPOQeWBpVHz14vWAHI8IjxNfes0WxC8LnY"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "countryId": "602cf6c61a998fa202983a05",
                                    "governateId": "6030ada1a74127eb0670f24d",
                                    "cityId": "60364ab815b16b414f8e7de5",
                                    "districtId": "60364af915b16b414f8e7de6"
                                }
                            },
                            "example": "{\n   \"countryId\":\"602cf6c61a998fa202983a05\",\n   \"governateId\":\"6030ada1a74127eb0670f24d\",\n   \"cityId\":\"60364ab815b16b414f8e7de5\",\n   \"districtId\":\"60364af915b16b414f8e7de6\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/region/editRegion": {
            "post": {
                "summary": "Edit Region",
                "operationId": "EditRegion1",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM3MjlkZDFiZTE0ZTRhMjdmMTU1YjMiLCJpYXQiOjE2MTQzMTIxNTE2NzZ9.wNS8KPueOPPOQeWBpVHz14vWAHI8IjxNfes0WxC8LnY"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "countryId": "602cf6c61a998fa202983a05",
                                    "governateId": "6030ada1a74127eb0670f24d",
                                    "cityId": "60364ab815b16b414f8e7de5",
                                    "districtId": "60364af915b16b414f8e7de6",
                                    "regionId": "6038777f1cb9237a3d485d3f"
                                }
                            },
                            "example": "{\n    \"countryId\":\"602cf6c61a998fa202983a05\",\n   \"governateId\":\"6030ada1a74127eb0670f24d\",\n   \"cityId\":\"60364ab815b16b414f8e7de5\",\n   \"districtId\":\"60364af915b16b414f8e7de6\",\n    \"regionId\":\"6038777f1cb9237a3d485d3f\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/region/deleteRegion": {
            "post": {
                "summary": "Remove Region",
                "operationId": "RemoveRegion",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM3MjlkZDFiZTE0ZTRhMjdmMTU1YjMiLCJpYXQiOjE2MTQzMTIxNTE2NzZ9.wNS8KPueOPPOQeWBpVHz14vWAHI8IjxNfes0WxC8LnY"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "regionId": "6038777f1cb9237a3d485d3f"
                                }
                            },
                            "example": "{\n    \"regionId\":\"6038777f1cb9237a3d485d3f\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/region/changeDefaultRegion": {
            "post": {
                "summary": "Change default Region",
                "operationId": "ChangedefaultRegion",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM2MTIxNjBlZDUxMzM1MjFhM2EyOTkiLCJpYXQiOjE2MTQzMjk5NTAzNzF9._TllnqcWTr7KyQxVbbDfhGdb0w4p5lb-X5EJSEE5MfQ"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "regionId": "6038777f1cb9237a3d485d3f"
                                }
                            },
                            "example": "{\n    \"regionId\":\"6038777f1cb9237a3d485d3f\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/region/getRegions": {
            "get": {
                "summary": "Get Regions",
                "operationId": "GetRegions4",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/region/getActiveRegions": {
            "get": {
                "summary": "Get Active Regions",
                "operationId": "GetActiveRegions5",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/region/getRegionById/602e0b2bb0b7f0a36f38583e": {
            "get": {
                "summary": "Get Region By Id",
                "operationId": "GetRegionById6",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{adminToken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/city/getActivecities/6030ada1a74127eb0670f24d": {
            "get": {
                "summary": "Get City",
                "operationId": "GetCity0",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM2MTIxNjBlZDUxMzM1MjFhM2EyOTkiLCJpYXQiOjE2MTQyNDQxMjA2NTV9.AY5UrQpMgp51U6BrByGNrntKLgI5v_hCV-5jqrNOrtE"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/district/getActiveDistricts/60364ab815b16b414f8e7de5": {
            "get": {
                "summary": "Get District",
                "operationId": "GetDistrict0",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM2MTIxNjBlZDUxMzM1MjFhM2EyOTkiLCJpYXQiOjE2MTQyNDQxMjA2NTV9.AY5UrQpMgp51U6BrByGNrntKLgI5v_hCV-5jqrNOrtE"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/governate/getActiveGovernates/602d039b1a998fa202983a06": {
            "get": {
                "summary": "Get Governate",
                "operationId": "GetGovernate0",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM2MTIxNjBlZDUxMzM1MjFhM2EyOTkiLCJpYXQiOjE2MTQyNDQxMjA2NTV9.AY5UrQpMgp51U6BrByGNrntKLgI5v_hCV-5jqrNOrtE"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/country/getActiveCountries": {
            "get": {
                "summary": "Get country",
                "operationId": "Getcountry0",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MDM2MTIxNjBlZDUxMzM1MjFhM2EyOTkiLCJpYXQiOjE2MTQyNDQxMjA2NTV9.AY5UrQpMgp51U6BrByGNrntKLgI5v_hCV-5jqrNOrtE"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/getMyServices": {
            "get": {
                "summary": "Get Provider Services",
                "operationId": "GetProviderServices",
                "parameters": [
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Services"
                ]
            }
        },
        "/api/v1/provider/getMyServicesByCategory": {
            "post": {
                "summary": "Get Provider Services By Category",
                "operationId": "GetProviderServicesByCategory",
                "parameters": [
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "categoryId": "602e0b2bb0b7f0a36f38583e"
                                }
                            },
                            "example": "{\n    \"categoryId\":\"602e0b2bb0b7f0a36f38583e\"\n}"
                        }
                    }
                },
                "tags": [
                    "Services"
                ]
            }
        },
        "/api/v1/provider/all-category-with-services": {
            "post": {
                "summary": "all category with services",
                "operationId": "allCategoryWithServices",
                "parameters": [
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "page": 2
                                }
                            }
                        }
                    }
                },
                "tags": [
                    "Services"
                ]
            }
        },
        "/api/v1/provider/getCompanyPendingRequest": {
            "post": {
                "summary": "Get Company Pending Request",
                "operationId": "GetCompanyPendingRequest",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\n    \"limit\":10,\n    \"page\":1\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/getCompanyAcceptedRequest": {
            "post": {
                "summary": "Get Company Accepted Request Copy",
                "operationId": "GetCompanyAcceptedRequestCopy",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\n    \"limit\":10,\n    \"page\":1\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/getIndividualPendingRequest": {
            "post": {
                "summary": "Get Individual pending Request",
                "operationId": "GetIndividualpendingRequest",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\n    \"limit\":10,\n    \"page\":1\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/getIndividualAcceptedRequest": {
            "post": {
                "summary": "Get Individual Accepted Request",
                "operationId": "GetIndividualAcceptedRequest",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\n    \"limit\":10,\n    \"page\":1\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/addEmployeeToCompany": {
            "post": {
                "summary": "Add Employee To Company",
                "operationId": "AddEmployeeToCompany",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "individualId": "6038eabe436616a4040dc349"
                                }
                            },
                            "example": "{\n    \"individualId\":\"6038eabe436616a4040dc349\"\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/joinToCompany": {
            "post": {
                "summary": "Join To Company",
                "operationId": "joinToCompany",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "companyId": "61b9a8f9240643f603b8c16e"
                                }
                            },
                            "example": "{\n    \"companyId\":\"61b9a8f9240643f603b8c16e\"\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/joinEmployeeToCompany": {
            "post": {
                "summary": "Join Employee To Company",
                "operationId": "joinEmployeeToCompany",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "companyId": "61b9a8f9240643f603b8c16e"
                                }
                            },
                            "example": "{\n    \"companyId\":\"61b9a8f9240643f603b8c16e\"\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/searchCompanyById": {
            "post": {
                "summary": "Search Company By Id",
                "operationId": "searchCompanyById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "companyId": "61b9a8f9240643f603b8c16e"
                                }
                            },
                            "example": "{\n    \"companyId\":\"61b9a8f9240643f603b8c16e\"\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/acceptRejectCompanyRequest": {
            "post": {
                "summary": "Accept/Declined company request",
                "operationId": "Accept/Declinedcompanyrequest",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "requestId": "606d93a0694f50bf5421d2a6",
                                    "status": "accepted"
                                }
                            },
                            "example": "{\n    \"requestId\":\"606d93a0694f50bf5421d2a6\",\n    \"status\":\"accepted\"\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/acceptRejectIndividualRequest": {
            "post": {
                "summary": "Accept/Declined individual request",
                "operationId": "Accept/Declinedindividualrequest",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "requestId": "606ee90e73f36f9eaef148c9",
                                    "status": "accepted"
                                }
                            },
                            "example": "{\n    \"requestId\":\"606ee90e73f36f9eaef148c9\",\n    \"status\":\"accepted\"\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/removeSpFromCompany": {
            "post": {
                "summary": "remove Sp From Company",
                "operationId": "removeSpFromCompany",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "requestId": "606d93a0694f50bf5421d2a6"
                                }
                            },
                            "example": "{\n    \"requestId\":\"606d93a0694f50bf5421d2a6\"\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/getServiceProviderDetails/606fee7960866a2728929ec0": {
            "get": {
                "summary": "Get Service Provider Details",
                "operationId": "GetServiceProviderDetails",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/exitSpFromCompany": {
            "post": {
                "summary": "EXIT Sp From Company",
                "operationId": "EXITSpFromCompany",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "requestId": "606d93a0694f50bf5421d2a6"
                                }
                            },
                            "example": "{\n    \"requestId\":\"606d93a0694f50bf5421d2a6\"\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/activeInactiveEmployee": {
            "post": {
                "summary": "Active Inactive Employee",
                "operationId": "ActiveInactiveEmployee",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "requestId": "606e9d1701ed902a8d1e562c",
                                    "status": "inactive"
                                }
                            },
                            "example": "{\n    \"requestId\":\"606e9d1701ed902a8d1e562c\",\n    \"status\":\"inactive\"\n}"
                        }
                    }
                },
                "tags": [
                    "Employee Request"
                ]
            }
        },
        "/api/v1/provider/providerContactUs": {
            "post": {
                "summary": "Contact Us after login",
                "operationId": "ContactUsafterlogin0",
                "parameters": [
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "android"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": "Ajeet",
                                    "subject": "Testing",
                                    "companyName": "This is not my Company",
                                    "comments": "This is testing comments"
                                }
                            },
                            "example": "{\n    \"name\":\"Ajeet\",\n    \"subject\":\"Testing\",\n    \"companyName\":\"This is not my Company\",\n    \"comments\":\"This is testing comments\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/forgotPassword": {
            "post": {
                "summary": "Forgot Password",
                "operationId": "ForgotPassword8",
                "parameters": [
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "phoneNumber": "7024919512",
                                    "countryCode": "+91"
                                }
                            },
                            "example": "{\n    \"phoneNumber\":\"7024919512\",\n       \"countryCode\":\"+91\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/register": {
            "post": {
                "summary": "Provider register",
                "operationId": "Providerregister",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "multipart/form-data"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        },
                        "description": "en,ar"
                    },
                    {
                        "name": "firebaseToken",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "qwerty"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "iphone11"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "1.0.0.1"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios14"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/x-www-form-urlencoded": {
                            "schema": {
                                "type": "object",
                                "required": [
                                    "name",
                                    "gender",
                                    "DOB",
                                    "services",
                                    "userType",
                                    "idNumber",
                                    "companyId",
                                    "email",
                                    "countryCode",
                                    "mobileNumber",
                                    "mobileNoStatus",
                                    "timezone",
                                    "signUpBy",
                                    "deviceType",
                                    "file"
                                ],
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "example": "Provider3"
                                    },
                                    "gender": {
                                        "type": "string",
                                        "example": "Male"
                                    },
                                    "DOB": {
                                        "type": "string",
                                        "example": "2020-12-12"
                                    },
                                    "services": {
                                        "type": "string",
                                        "example": "[{\"serviceId\":\"60407e3ed96847dbffbbc944\",\"categoryId\":\"6034b2a65bbd45688c381b2c\"}]"
                                    },
                                    "userType": {
                                        "type": "string",
                                        "example": "individual"
                                    },
                                    "idNumber": {
                                        "type": "string",
                                        "example": "12121"
                                    },
                                    "companyId": {
                                        "type": "string",
                                        "example": ""
                                    },
                                    "email": {
                                        "type": "string",
                                        "example": "providerr33@gmail.com"
                                    },
                                    "countryCode": {
                                        "type": "string",
                                        "example": "+91"
                                    },
                                    "mobileNumber": {
                                        "type": "string",
                                        "example": "9853652334"
                                    },
                                    "mobileNoStatus": {
                                        "type": "string",
                                        "example": "verified"
                                    },
                                    "password": {
                                        "type": "string",
                                        "example": "123456"
                                    },
                                    "timezone": {
                                        "type": "string",
                                        "example": "asia/kolkata"
                                    },
                                    "signUpBy": {
                                        "type": "string",
                                        "example": "manual"
                                    },
                                    "deviceType": {
                                        "type": "string",
                                        "example": "android"
                                    },
                                    "file": {
                                        "type": "string",
                                        "format": "binary"
                                    }
                                }
                            },
                            "example": [
                                {
                                    "key": "name",
                                    "value": "Provider3",
                                    "type": "text"
                                },
                                {
                                    "key": "gender",
                                    "value": "Male",
                                    "description": "Male , Female",
                                    "type": "text"
                                },
                                {
                                    "key": "DOB",
                                    "value": "2020-12-12",
                                    "description": "individual , company",
                                    "type": "text"
                                },
                                {
                                    "key": "services",
                                    "value": "[{\"serviceId\":\"60407e3ed96847dbffbbc944\",\"categoryId\":\"6034b2a65bbd45688c381b2c\"}]",
                                    "description": "required in case of indivisual",
                                    "type": "text"
                                },
                                {
                                    "key": "userType",
                                    "value": "individual",
                                    "description": "required in case of indivisual",
                                    "type": "text"
                                },
                                {
                                    "key": "idNumber",
                                    "value": "12121",
                                    "type": "text"
                                },
                                {
                                    "key": "companyId",
                                    "value": "",
                                    "description": "requires when select id number",
                                    "type": "text"
                                },
                                {
                                    "key": "companyId",
                                    "value": "12121",
                                    "type": "text",
                                    "disabled": true
                                },
                                {
                                    "key": "email",
                                    "value": "providerr33@gmail.com",
                                    "description": "verified , unverified",
                                    "type": "text"
                                },
                                {
                                    "key": "countryCode",
                                    "value": "+91",
                                    "type": "text"
                                },
                                {
                                    "key": "mobileNumber",
                                    "value": "9853652334",
                                    "type": "text"
                                },
                                {
                                    "key": "mobileNoStatus",
                                    "value": "verified",
                                    "type": "text"
                                },
                                {
                                    "key": "password",
                                    "value": "123456",
                                    "type": "text"
                                },
                                {
                                    "key": "googleId",
                                    "value": "",
                                    "type": "text",
                                    "disabled": true
                                },
                                {
                                    "key": "facebookId",
                                    "value": "adada",
                                    "description": "required in case of company",
                                    "type": "text",
                                    "disabled": true
                                },
                                {
                                    "key": "appleId",
                                    "value": "",
                                    "description": "required in case of company",
                                    "type": "text",
                                    "disabled": true
                                },
                                {
                                    "key": "microsoftId",
                                    "value": "",
                                    "type": "text",
                                    "disabled": true
                                },
                                {
                                    "key": "companyName",
                                    "value": "",
                                    "description": "manual, google, apple, facebook,microsoft",
                                    "type": "text",
                                    "disabled": true
                                },
                                {
                                    "key": "commercialRegNo",
                                    "value": "",
                                    "description": "android, ios",
                                    "type": "text",
                                    "disabled": true
                                },
                                {
                                    "key": "timezone",
                                    "value": "asia/kolkata",
                                    "description": "optional",
                                    "type": "text"
                                },
                                {
                                    "key": "signUpBy",
                                    "value": "manual",
                                    "type": "text"
                                },
                                {
                                    "key": "deviceType",
                                    "value": "android",
                                    "description": "optional",
                                    "type": "text"
                                },
                                {
                                    "key": "profileImage",
                                    "description": "optional",
                                    "type": "file",
                                    "src": "/home/ajeet/Downloads/image/download (1).jpeg"
                                },
                                {
                                    "key": "documentImage",
                                    "type": "file",
                                    "src": "/home/ajeet/Downloads/image/download (2).jpeg"
                                }
                            ]
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/validateParams": {
            "post": {
                "summary": "Validate Params",
                "operationId": "ValidateParams10",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "email": "",
                                    "mobileNumber": "9041793087",
                                    "countryCode": "+91",
                                    "signUpBy": "google"
                                }
                            },
                            "example": "{\n    \"email\":\"\",\n    \"mobileNumber\":\"9041793087\",\n    \"countryCode\":\"+91\",\n    \"signUpBy\":\"google\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/login": {
            "post": {
                "summary": "Login",
                "operationId": "Login11",
                "parameters": [
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "firebaseToken",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "qwerty"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "android"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "email": "sam1@gmail.com",
                                    "firebaseToken": "ddad",
                                    "password": "123456"
                                }
                            },
                            "example": "{\n    \"email\":\"sam1@gmail.com\",\n    \"firebaseToken\":\"ddad\",\n    \"password\":\"123456\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/logout": {
            "post": {
                "summary": "Logout",
                "operationId": "Logout12",
                "parameters": [
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "firebaseToken",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "qwerty"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": ""
                            },
                            "example": ""
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/resetPassword": {
            "post": {
                "summary": "Reset Password",
                "operationId": "ResetPassword13",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "email": "sfs.sahil20@gmail.com",
                                    "password": "123456",
                                    "cnfpassword": "123456",
                                    "OTP": "1234"
                                }
                            },
                            "example": "{\n    \"email\":\"sfs.sahil20@gmail.com\",\n    \"password\":\"123456\",\n    \"cnfpassword\":\"123456\",\n    \"OTP\":\"1234\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/getProviderProfile": {
            "get": {
                "summary": "Get Provider Profile",
                "operationId": "GetProviderProfile",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/getproviderDetails/602bc4b024c4341944980cd2": {
            "get": {
                "summary": "Get Provider Details",
                "operationId": "GetProviderDetails",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/getCompanyByUniqueId": {
            "post": {
                "summary": "Get Company By uniqueid",
                "operationId": "GetCompanyByuniqueid",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "companyUniqueId": "ALISTASP831614342846847"
                                }
                            },
                            "example": "{\n    \"companyUniqueId\":\"ALISTASP831614342846847\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/getIndividualByUniqueId": {
            "post": {
                "summary": "Get Individual By uniqueid",
                "operationId": "GetIndividualByuniqueid",
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "application/json"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "individualUniqueId": "ALISTASP831614342846847"
                                }
                            },
                            "example": "{\n    \"individualUniqueId\":\"ALISTASP831614342846847\"\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/editProfile": {
            "post": {
                "summary": "Edit Profile",
                "operationId": "EditProfile19",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{ptoken}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": "Sad",
                                    "companyName": "",
                                    "email": "abc@gmail.com",
                                    "mobileNumber": "9991293040",
                                    "mobileNoStatus": "verified",
                                    "commercialRegNo": "",
                                    "countryCode": "+91",
                                    "DOB": "2003-04-01",
                                    "gender": "Male",
                                    "password": "",
                                    "services": [
                                        {
                                            "serviceId": "603ce93a5f17bd23a827fcf8",
                                            "categoryId": "6034b2f65bbd45688c383c65"
                                        },
                                        {
                                            "categoryId": "6034b2f65bbd45688c383c65",
                                            "serviceId": "603ce8be5f17bd23a827fcf7"
                                        },
                                        {
                                            "categoryId": "6034b2a65bbd45688c381b2c",
                                            "serviceId": "603cc5b44cf9b71e78182f98"
                                        },
                                        {
                                            "serviceId": "60407e3ed96847dbffbbc944",
                                            "categoryId": "6034b2a65bbd45688c381b2c"
                                        }
                                    ]
                                }
                            },
                            "example": "{\n    \"name\":\"Sad\",\n    \"companyName\":\"\",\n    \"email\":\"abc@gmail.com\",\n    \"mobileNumber\":\"9991293040\",\n    \"mobileNoStatus\":\"verified\",\n    \"commercialRegNo\":\"\",\n    \"countryCode\":\"+91\",\n    \"DOB\":\"2003-04-01\",\n    \"gender\":\"Male\",\n    \"password\":\"\",\n    \"services\": [{\n            \"serviceId\": \"603ce93a5f17bd23a827fcf8\",\n            \"categoryId\": \"6034b2f65bbd45688c383c65\"\n        },\n        {\n            \"categoryId\": \"6034b2f65bbd45688c383c65\",\n            \"serviceId\": \"603ce8be5f17bd23a827fcf7\"\n        },\n        {\n            \"categoryId\": \"6034b2a65bbd45688c381b2c\",\n            \"serviceId\": \"603cc5b44cf9b71e78182f98\"\n        },\n        {\n            \"serviceId\": \"60407e3ed96847dbffbbc944\",\n            \"categoryId\": \"6034b2a65bbd45688c381b2c\"\n        }\n    ]\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/listService": {
            "post": {
                "summary": "List Service",
                "operationId": "ListService",
                "parameters": [
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "android"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "categoryId": [
                                        "604248077508bbd77aa31545",
                                        "6034b2f65bbd45688c383c65"
                                    ],
                                    "category": "",
                                    "service": "",
                                    "sortField": "serviceName",
                                    "sortOrder": -1,
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\r\n    \"categoryId\":[\"604248077508bbd77aa31545\",\"6034b2f65bbd45688c383c65\"],\r\n    \"category\":\"\",\r\n    \"service\":\"\",\r\n    \"sortField\":\"serviceName\",\r\n    \"sortOrder\":-1,\r\n    \"limit\":10,\r\n    \"page\":1\r\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/getCategories": {
            "post": {
                "summary": "Get Categories",
                "operationId": "GetCategories21",
                "parameters": [
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "en"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "android"
                        }
                    },
                    {
                        "name": "deviceModel",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "appVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "osVersion",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "category": "",
                                    "sortField": "categoryName",
                                    "sortOrder": 1,
                                    "limit": 10,
                                    "page": 1
                                }
                            },
                            "example": "{\r\n    \"category\":\"\",\r\n    \"sortField\":\"categoryName\",\r\n    \"sortOrder\":1,\r\n    \"limit\":10,\r\n    \"page\":1\r\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/deleteDocument": {
            "post": {
                "summary": "Delete Profile",
                "operationId": "DeleteProfile",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "text/plain": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "url": "https://alistadocuments.s3.us-east-2.amazonaws.com/1614754538403breakfast.png"
                                }
                            },
                            "example": "{\r\n    \"url\":\"https://alistadocuments.s3.us-east-2.amazonaws.com/1614754538403breakfast.png\"\r\n}"
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/provider/updateProfileImage": {
            "post": {
                "summary": "Update Profile Image",
                "operationId": "UpdateProfileImage23",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "{{token}}"
                        }
                    },
                    {
                        "name": "deviceType",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ios"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "multipart/form-data"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/x-www-form-urlencoded": {
                            "schema": {
                                "type": "object",
                                "required": [
                                    "file"
                                ],
                                "properties": {
                                    "file": {
                                        "type": "string",
                                        "format": "binary"
                                    }
                                }
                            },
                            "example": [
                                {
                                    "key": "image",
                                    "type": "file",
                                    "src": "/home/ajeet/Downloads/images/website.jpg"
                                }
                            ]
                        }
                    }
                },
                "tags": []
            }
        },
        "/api/v1/admin/task/addTask": {
            "post": {
                "tags": [
                    "Task"
                ],
                "summary": "addTask",
                "operationId": "addTask",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/addTaskRequest"
                            },
                            "example": {
                                "taskNames": [
                                    {
                                        "categoryId": "60ed36227a48d49370a6c3d4",
                                        "name": {
                                            "en": "engName",
                                            "ar": "arName"
                                        },
                                        "serviceId": "60ed42fe888ed01f5002d52e"
                                    },
                                    {
                                        "categoryId": "60ed36227a48d49370a6c3d4",
                                        "name": {
                                            "en": "engName",
                                            "ar": "arName"
                                        },
                                        "serviceId": "60ed42fe888ed01f5002d52e"
                                    },
                                    {
                                        "categoryId": "60ed36227a48d49370a6c3d4",
                                        "name": {
                                            "en": "engName",
                                            "ar": "arName"
                                        },
                                        "serviceId": "60ed42fe888ed01f5002d52e"
                                    }
                                ]
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/deleteTask/61026945699d8405b4484022": {
            "delete": {
                "tags": [
                    "Task"
                ],
                "summary": "delete task",
                "operationId": "deletetask",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/getTasksWithFilter": {
            "post": {
                "tags": [
                    "Task"
                ],
                "summary": "get task with filter",
                "operationId": "gettaskwithfilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/gettaskwithfilterrequest"
                            },
                            "example": {
                                "limit": "2",
                                "page": "2",
                                "sortField": "createdAt",
                                "sortOrder": "1"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/editTaskStatus/631dbca11ff93b6a5a06ec2a": {
            "post": {
                "tags": [
                    "Task"
                ],
                "summary": "edit task status",
                "operationId": "edittaskstatus",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "status": "active"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/getTasks": {
            "get": {
                "tags": [
                    "Task"
                ],
                "summary": "get tasks",
                "operationId": "gettasks",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/deleteTask/60ec49ee6b667c0320487711": {
            "delete": {
                "tags": [
                    "Task"
                ],
                "summary": "delete task",
                "operationId": "deletetask",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/deleteTaskCondition/60f19481dfa30019602c9df3": {
            "delete": {
                "tags": [
                    "Task"
                ],
                "summary": "delete task object from condition",
                "operationId": "deletetaskobjectfromcondition",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/deleteTaskField/60f28a5eda61ad272095e98e": {
            "delete": {
                "tags": [
                    "Task"
                ],
                "summary": "delete task object from field",
                "operationId": "deletetaskobjectfromfield",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/editTaskField": {
            "patch": {
                "tags": [
                    "Task"
                ],
                "summary": "edit task field",
                "operationId": "edittaskfield",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/edittaskfieldrequest"
                            },
                            "example": {
                                "field": {
                                    "defaultVisible": false,
                                    "_id": "630dbbbc52574ddab7301599",
                                    "fieldName": "test-01-name",
                                    "fieldLabel": {
                                        "en": "test-01-label-en",
                                        "ar": "test-01-label-ar"
                                    },
                                    "fieldType": "dropdown",
                                    "field_lists": [
                                        {
                                            "_id": "630dbbbc52574ddab730159a",
                                            "listName": "test-list-1",
                                            "option_lists": [
                                                {
                                                    "_id": "630dbbbc52574ddab730159b",
                                                    "listItem_title": "test-list-1-title",
                                                    "listItem_value": "test-list-1-value",
                                                    "listItem_lable_en": "test-list-1-label-en",
                                                    "listItem_lable_ar": "test-list-1-label-ar",
                                                    "chosen": false,
                                                    "selected": false
                                                },
                                                {
                                                    "_id": "630dbbbc52574ddab730159c",
                                                    "listItem_title": "aaaa",
                                                    "listItem_value": "bbba",
                                                    "listItem_lable_en": "ccca",
                                                    "listItem_lable_ar": "ddda"
                                                }
                                            ]
                                        },
                                        {
                                            "_id": "630dbbbc52574ddab730159d",
                                            "listName": "test-list-2",
                                            "option_lists": [
                                                {
                                                    "_id": "630dbbbc52574ddab730159e",
                                                    "listItem_title": "test-list-2-title",
                                                    "listItem_value": "test-list-2-value",
                                                    "listItem_lable_en": "test-list-2-label-en",
                                                    "listItem_lable_ar": "test-list-2-label-ar",
                                                    "chosen": false,
                                                    "selected": false
                                                }
                                            ]
                                        }
                                    ]
                                },
                                "taskId": "630c8fdcbc25cfb5a5acb16c"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/editTaskCondition": {
            "patch": {
                "tags": [
                    "Task"
                ],
                "summary": "edit task condition",
                "operationId": "edittaskcondition",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/edittaskconditionrequest"
                            },
                            "example": {
                                "condition": {
                                    "_id": "630da6b052574ddab730158f",
                                    "condition_satisfies": true,
                                    "field_conditions": [
                                        {
                                            "_id": "630da6b052574ddab7301590",
                                            "conditionFieldType": "dropdown",
                                            "conditionFieldName": "630da1acbc25cfb5a5acb3ca",
                                            "conditionFieldCondition": "is_not",
                                            "conditionFieldValue": "630da1acbc25cfb5a5acb3cb",
                                            "conditionListValue": "630da1acbc25cfb5a5acb3cd"
                                        }
                                    ],
                                    "field_actions": [
                                        {
                                            "_id": "630da6b052574ddab7301591",
                                            "fieldAction": "show",
                                            "actionFieldType": "dropdown",
                                            "actionFieldName": "630dbbbc52574ddab7301599",
                                            "actionFieldValue": "630dbbbc52574ddab730159d"
                                        }
                                    ]
                                },
                                "taskId": "630c8fdcbc25cfb5a5acb16c"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/getTaskById/60ee85954abb7b233c7503bb": {
            "get": {
                "tags": [
                    "Task"
                ],
                "summary": "get task by id",
                "operationId": "gettaskbyid",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjkxNzg4MzAyMjJ9.dZDruyKKworLXXVDVrEBLQG9zLLF6KxGetszOhjjzjU"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/getTasksByServiceIdList": {
            "post": {
                "summary": "get Tasks By Service Id List",
                "operationId": "getTasksByServiceIdList",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "serviceId": [
                                        "62cffa9242eef94a52fc2839",
                                        "62a5ef31998db59034f445d5"
                                    ]
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/task/getTaskByServiceId": {
            "post": {
                "summary": "get Task By Service Id",
                "operationId": "getTaskByServiceId",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "serviceId": "603cc5b44cf9b71e78182f98"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/user/task/getTaskById/62c29f0410feae1f258a6c43": {
            "get": {
                "tags": [
                    "Task"
                ],
                "summary": "user get task by id",
                "operationId": "usergettaskbyid",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ar"
                        },
                        "description": "en,ar"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/timeSlot/addTimeSlot": {
            "post": {
                "tags": [
                    "timeSlot"
                ],
                "summary": "add time slot",
                "operationId": "addtimeslot",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "timeSlotName": "fNtff2",
                                    "timeSlotType": "NON_WORKING_HOUR",
                                    "locations": {
                                        "countryId": [
                                            "602cf6c61a998fa202983a05"
                                        ],
                                        "governateId": [
                                            "6030ada1a74127eb0670f24d"
                                        ],
                                        "cityId": [
                                            "60364ab815b16b414f8e7de5"
                                        ],
                                        "districtId": [
                                            "60364af915b16b414f8e7de6"
                                        ]
                                    },
                                    "tasks": {
                                        "categoryId": [
                                            "6034b2f65bbd45688c383c65"
                                        ],
                                        "serviceId": [
                                            "603cc5b44cf9b71e78182f98"
                                        ],
                                        "taskId": [
                                            "62dbc3ffdf04506dde34b759",
                                            "62dbc40cdf04506dde34b76d"
                                        ]
                                    },
                                    "serviceProviders": [
                                        "605daad71b5bbb0032172c28"
                                    ],
                                    "slotGenerateType": "AUTOMATIC",
                                    "duration": {
                                        "hours": "3",
                                        "minutes": "5"
                                    },
                                    "slotPerDay": 1,
                                    "availableSlots": [
                                        {
                                            "slot": "slot1",
                                            "startTime": "12:10PM",
                                            "endTime": "12:60AM"
                                        }
                                    ],
                                    "timeSlotsToBeSkipped": 1,
                                    "weekDay": {
                                        "monday": false,
                                        "tuesday": false,
                                        "wednesday": false,
                                        "thursday": false,
                                        "friday": false,
                                        "saturday": false,
                                        "sunday": false,
                                        "all": false
                                    },
                                    "aheadBooking": {
                                        "month": "",
                                        "week": "",
                                        "day": ""
                                    },
                                    "schedule": {
                                        "startDate": "",
                                        "endDate": "",
                                        "startTime": "",
                                        "endTime": "",
                                        "defaultTimeSlotAfterScheduleEnds": "62d8da071c204610dcc22c62"
                                    }
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/timeSlot/getTimeSlotWithFilter": {
            "post": {
                "tags": [
                    "timeSlot"
                ],
                "summary": "get time slot with filter",
                "operationId": "getTimeSlotWithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "language": "ar",
                                    "category": "",
                                    "timeslot": "sdfsfdg",
                                    "sortOrder": -1,
                                    "sortField": "createdAt",
                                    "limit": 10,
                                    "page": 1
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/timeSlot/editTimeSlot": {
            "patch": {
                "tags": [
                    "timeSlot"
                ],
                "summary": "edit time slot",
                "operationId": "edittimeslot",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "timeSlotName": "updatedTaskTest",
                                    "timeSlotId": "62ea412b5badf40df0c6a68c",
                                    "timeSlotType": "NON_WORKING_HOUR",
                                    "locations": {
                                        "countryId": [
                                            "602cf6c61a998fa202983a05"
                                        ],
                                        "governateId": [
                                            "6030ada1a74127eb0670f24d"
                                        ],
                                        "cityId": [
                                            "60364ab815b16b414f8e7de5"
                                        ],
                                        "districtId": [
                                            "60364af915b16b414f8e7de6"
                                        ]
                                    },
                                    "tasks": {
                                        "categoryId": [
                                            "6034b2f65bbd45688c383c65"
                                        ],
                                        "serviceId": [
                                            "603cc5b44cf9b71e78182f98"
                                        ],
                                        "taskId": [
                                            "62dbc3ffdf04506dde34b759",
                                            "62dbc40cdf04506dde34b76d"
                                        ]
                                    },
                                    "serviceProviders": [
                                        "605daad71b5bbb0032172c28"
                                    ],
                                    "slotGenerateType": "AUTOMATIC",
                                    "duration": {
                                        "hours": "3",
                                        "minutes": "5"
                                    },
                                    "slotPerDay": 1,
                                    "availableSlots": [
                                        {
                                            "slot": "slot1",
                                            "startTime": "12:10PM",
                                            "endTime": "12:60AM"
                                        }
                                    ],
                                    "timeSlotsToBeSkipped": 1,
                                    "weekDay": {
                                        "monday": false,
                                        "tuesday": false,
                                        "wednesday": false,
                                        "thursday": false,
                                        "friday": false,
                                        "saturday": false,
                                        "sunday": false,
                                        "all": false
                                    },
                                    "aheadBooking": {
                                        "month": "",
                                        "week": "",
                                        "day": ""
                                    },
                                    "schedule": {
                                        "startDate": "",
                                        "endDate": "",
                                        "startTime": "",
                                        "endTime": "",
                                        "defaultTimeSlotAfterScheduleEnds": "62d8da071c204610dcc22c62"
                                    }
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/timeSlot/editTimeSlotStatus/62ea412b5badf40df0c6a68c": {
            "patch": {
                "tags": [
                    "timeSlot"
                ],
                "summary": "edit time slot status",
                "operationId": "edittimeslotstatus",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "status": "ACTIVE"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/timeSlot/getTimeSlotById/62f33a289006317a85f596f6": {
            "get": {
                "tags": [
                    "timeSlot"
                ],
                "summary": "get Time Slot By Id",
                "operationId": "getTimeSlotById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/timeSlot/getTimeSlot": {
            "get": {
                "tags": [
                    "timeSlot"
                ],
                "summary": "get Time Slot",
                "operationId": "getTimeSlot",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/timeSlot/deleteTimeSlot/61121627b48e7426549e1dcc": {
            "delete": {
                "tags": [
                    "timeSlot"
                ],
                "summary": "delete time slot",
                "operationId": "deletetimeslot",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/user/timeSlot/getTimeSlotByServiceId/604248735aa06af55572ca33": {
            "get": {
                "tags": [
                    "timeSlot"
                ],
                "summary": "get Time Slot By Service Id",
                "operationId": "getTimeSlotByServiceId",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ar"
                        },
                        "description": "en,ar"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/provider/timeslot/timeslotByServiceProvider/622eed46876bf3718096bca6": {
            "get": {
                "tags": [
                    "timeSlot"
                ],
                "summary": "get Time Slot By provider Id",
                "operationId": "getTimeSlotByProviderId",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ar"
                        },
                        "description": "en,ar"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/provider/addTimeslotToProvider/623042db876bf3718096bcdd": {
            "post": {
                "tags": [
                    "timeSlot"
                ],
                "summary": "add Time Slot to provider",
                "operationId": "addTimeslotToProvider",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    },
                    {
                        "name": "Accept-Language",
                        "in": "header",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "ar"
                        },
                        "description": "en,ar"
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": [
                                    {
                                        "timeslotId": "62fb6fe29bc42d07426720df",
                                        "availability": [
                                            {
                                                "locations": {
                                                    "countryId": "60312e1f8d04f4f97ac9decc",
                                                    "governateId": "60312ec18d04f4f97ac9decd",
                                                    "cityId": "6037eac36b88dc725a10063d",
                                                    "districtId": "61e8008af9dcd9ffb60a8804"
                                                },
                                                "weekday": {
                                                    "monday": true,
                                                    "tuesday": true,
                                                    "wednesday": false,
                                                    "thursday": false,
                                                    "friday": false,
                                                    "saturday": false,
                                                    "sunday": false,
                                                    "all": false
                                                },
                                                "slots": [
                                                    "62fb6fe29bc42d07426720e0"
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/warranty/addWarranty": {
            "post": {
                "tags": [
                    "warranty"
                ],
                "summary": "add warranty",
                "operationId": "addWarranty",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "warrantyName": "testUpff",
                                    "periodType": "date_time",
                                    "locations": [
                                        {
                                            "countryId": "602cf6c61a998fa202983a05",
                                            "governateId": "6030ada1a74127eb0670f24d",
                                            "cityId": "60364ab815b16b414f8e7de5",
                                            "districtId": "60364af915b16b414f8e7de6"
                                        }
                                    ],
                                    "tasks": [
                                        {
                                            "categoryId": "6034b2f65bbd45688c383c65",
                                            "serviceId": "603cc5b44cf9b71e78182f98",
                                            "taskId": "62dbc3ffdf04506dde34b759"
                                        },
                                        {
                                            "categoryId": "6034b2f65bbd45688c383c65",
                                            "serviceId": "603cc5b44cf9b71e78182f98",
                                            "taskId": "62dbc40cdf04506dde34b76d"
                                        }
                                    ],
                                    "serviceProviders": [
                                        "605daad71b5bbb0032172c28"
                                    ],
                                    "schedule": {
                                        "startDate": "",
                                        "endDate": "",
                                        "startTime": "",
                                        "endTime": "",
                                        "defaultWarrantyAfterScheduleEnds": ""
                                    },
                                    "period": {
                                        "startDate": "2022-10-18",
                                        "endDate": "2022-10-18",
                                        "startTime": "20:09",
                                        "endTime": "20:09"
                                    }
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/warranty/editWarranty": {
            "patch": {
                "tags": [
                    "warranty"
                ],
                "summary": "edit warranty",
                "operationId": "editWarranty",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "warrantyId": "635e4fd300acaf24b84c1888",
                                    "warrantyName": "testUpff",
                                    "periodType": "date_time",
                                    "locations": [
                                        {
                                            "countryId": "602cf6c61a998fa202983a05",
                                            "governateId": "6030ada1a74127eb0670f24d",
                                            "cityId": "60364ab815b16b414f8e7de5",
                                            "districtId": "60364af915b16b414f8e7de6"
                                        }
                                    ],
                                    "tasks": [
                                        {
                                            "categoryId": "6034b2f65bbd45688c383c65",
                                            "serviceId": "603cc5b44cf9b71e78182f98",
                                            "taskId": "62dbc3ffdf04506dde34b759"
                                        },
                                        {
                                            "categoryId": "6034b2f65bbd45688c383c65",
                                            "serviceId": "603cc5b44cf9b71e78182f98",
                                            "taskId": "62dbc40cdf04506dde34b76d"
                                        }
                                    ],
                                    "serviceProviders": [
                                        "605daad71b5bbb0032172c28"
                                    ],
                                    "schedule": {
                                        "startDate": "",
                                        "endDate": "",
                                        "startTime": "",
                                        "endTime": "",
                                        "defaultWarrantyAfterScheduleEnds": ""
                                    },
                                    "period": {
                                        "startDate": "2022-10-18",
                                        "endDate": "2022-10-18",
                                        "startTime": "20:09",
                                        "endTime": "20:09"
                                    }
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/warranty/getWarrantyWithFilter": {
            "post": {
                "tags": [
                    "warranty"
                ],
                "summary": "get warranty with filter",
                "operationId": "getWarrantyWithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "periodType": "",
                                    "warranty": "",
                                    "sortOrder": -1,
                                    "sortField": "createdAt",
                                    "limit": 10,
                                    "page": 1
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/warranty/editWarrantyStatus/6354fcd6cd95ec17f583253f": {
            "patch": {
                "tags": [
                    "warranty"
                ],
                "summary": "edit twarranty status",
                "operationId": "editwarrantystatus",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "status": "Active"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/warranty/getWarrantyById/6354fcd6cd95ec17f583253f": {
            "get": {
                "tags": [
                    "warranty"
                ],
                "summary": "get warranty By Id",
                "operationId": "getWarrantyById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/warranty/getWarranty": {
            "get": {
                "tags": [
                    "warranty"
                ],
                "summary": "get warranty",
                "operationId": "getWarranty",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/warranty/deleteWarranty/634bf9ea648fd850501f72a0": {
            "delete": {
                "tags": [
                    "warranty"
                ],
                "summary": "delete warranty",
                "operationId": "deleteWarranty",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/insurance/addInsurance": {
            "post": {
                "tags": [
                    "insurance"
                ],
                "summary": "add insurance",
                "operationId": "addInsurance",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "insuranceName": "Sample",
                                    "periodType": "duration",
                                    "locations": [
                                        {
                                            "countryId": "602cf6c61a998fa202983a05",
                                            "governateId": "6030ada1a74127eb0670f24d",
                                            "cityId": "60364ab815b16b414f8e7de5",
                                            "districtId": "604207158e169e830cdc37d7"
                                        }
                                    ],
                                    "tasks": [
                                        {
                                            "categoryId": "6038dace7508bbd77ad55ece",
                                            "serviceId": "61eea39c0f13192162614e17",
                                            "taskId": "63171855929a6683572de0de"
                                        }
                                    ],
                                    "serviceProviders": [
                                        "621f1e9a2be3749578492797"
                                    ],
                                    "no_of_level": "1",
                                    "levels": [
                                        {
                                            "name": "sam1",
                                            "amountType": "number",
                                            "amount": "10",
                                            "capLimit": "20"
                                        }
                                    ],
                                    "hintMessage": "ok ok ok ok ok",
                                    "amountChargedToProvider": {
                                        "amountType": "percentage",
                                        "amount": "50"
                                    },
                                    "schedule": {
                                        "startDate": "2022-10-04",
                                        "endDate": "2022-11-09",
                                        "startTime": "16:47",
                                        "endTime": "21:47",
                                        "defaultInsuranceAfterScheduleEnds": ""
                                    },
                                    "period": {
                                        "hours": "1",
                                        "days": "2",
                                        "weeks": "3",
                                        "months": "44",
                                        "years": "5"
                                    }
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/insurance/editInsurance": {
            "patch": {
                "tags": [
                    "insurance"
                ],
                "summary": "edit insurance",
                "operationId": "editInsurance",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "insuranceId": "635e2199d4159a1668857ad3",
                                    "insuranceName": "Sample",
                                    "periodType": "duration",
                                    "locations": [
                                        {
                                            "countryId": "602cf6c61a998fa202983a05",
                                            "governateId": "6030ada1a74127eb0670f24d",
                                            "cityId": "60364ab815b16b414f8e7de5",
                                            "districtId": "604207158e169e830cdc37d7"
                                        }
                                    ],
                                    "tasks": [
                                        {
                                            "categoryId": "6038dace7508bbd77ad55ece",
                                            "serviceId": "61eea39c0f13192162614e17",
                                            "taskId": "63171855929a6683572de0de"
                                        }
                                    ],
                                    "serviceProviders": [
                                        "621f1e9a2be3749578492797"
                                    ],
                                    "no_of_level": "1",
                                    "levels": [
                                        {
                                            "name": "sam1",
                                            "amountType": "number",
                                            "amount": "10",
                                            "capLimit": "20"
                                        }
                                    ],
                                    "hintMessage": "ok ok ok ok ok",
                                    "amountChargedToProvider": {
                                        "amountType": "percentage",
                                        "amount": "50"
                                    },
                                    "schedule": {
                                        "startDate": "2022-10-04",
                                        "endDate": "2022-11-09",
                                        "startTime": "16:47",
                                        "endTime": "21:47",
                                        "defaultInsuranceAfterScheduleEnds": ""
                                    },
                                    "period": {
                                        "hours": "1",
                                        "days": "2",
                                        "weeks": "3",
                                        "months": "44",
                                        "years": "5"
                                    }
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/insurance/getInsuranceWithFilter": {
            "post": {
                "tags": [
                    "insurance"
                ],
                "summary": "get insurance with filter",
                "operationId": "getInsuranceWithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "periodType": "",
                                    "insurance": "",
                                    "sortOrder": -1,
                                    "sortField": "createdAt",
                                    "limit": 10,
                                    "page": 1
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/insurance/editInsuranceStatus/635e2199d4159a1668857ad3": {
            "patch": {
                "tags": [
                    "insurance"
                ],
                "summary": "edit insurance status",
                "operationId": "editInsuranceStatus",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "status": "Active"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/insurance/getInsuranceById/635e2199d4159a1668857ad3": {
            "get": {
                "tags": [
                    "insurance"
                ],
                "summary": "get insurance By Id",
                "operationId": "getInsuranceById",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/insurance/getInsurance": {
            "get": {
                "tags": [
                    "insurance"
                ],
                "summary": "get insurance",
                "operationId": "getInsurance",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/insurance/deleteInsurance/635e21fe7d9136956b7dd25c": {
            "delete": {
                "tags": [
                    "insurance"
                ],
                "summary": "delete insurance",
                "operationId": "deleteInsurance",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/coupon/addCoupon": {
            "post": {
                "tags": [
                    "coupon"
                ],
                "summary": "add coupon",
                "operationId": "addCoupon",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": "fgfddftdsfddgcgfdg",
                                    "code": "gdfgddcrdfdfffdgdf",
                                    "type": "VOUCHER/COUPON",
                                    "promoType": "COUPON",
                                    "availableTo": {
                                        "allClient": true,
                                        "firstOrderClient": false,
                                        "selectedClient": {
                                            "enabled": false,
                                            "clientIds": [
                                                "605daad71b5bbb0032172c28"
                                            ]
                                        },
                                        "notAOrderSince": {
                                            "enabled": true,
                                            "days": 3
                                        }
                                    },
                                    "maximumUses": {
                                        "enabled": true,
                                        "uses": 4
                                    },
                                    "maximumClientUses": {
                                        "enabled": true,
                                        "maximumUses": 2
                                    },
                                    "maximumCompletedOrder": {
                                        "enabled": true,
                                        "maximumCompletedOrderCount": 4
                                    },
                                    "availableToServiceTask": {
                                        "allService": false,
                                        "selectedServices": [
                                            "6066e6babbe7309e0c4dd5f0"
                                        ],
                                        "selectedTasks": [
                                            "630c8fdcbc25cfb5a5acb16c"
                                        ]
                                    },
                                    "location": {
                                        "allLocation": false,
                                        "availableInCountry": [
                                            "6066e1aebbe7309e0c4dd5eb"
                                        ],
                                        "availableInGovernorate": [
                                            "6030cc1b2e0620f34be56ba8"
                                        ],
                                        "availableInCity": [],
                                        "availableInDistrict": [
                                            "60388d141467697e676ae374"
                                        ]
                                    },
                                    "timeLine": {
                                        "validTill": true,
                                        "dateTimeInterval": false,
                                        "dateTimeIntervalStart": "1/1/1",
                                        "dateTimeIntervalEnd": "1/1/1",
                                        "validTillDate": "1/1/1"
                                    },
                                    "broadcastType": "SMS",
                                    "action": {
                                        "cashOnWallet": {
                                            "enabled": true,
                                            "amount": 12.2
                                        },
                                        "discountPercentage": {
                                            "enabled": true,
                                            "percentage": 12,
                                            "uptoEnabled": true,
                                            "upto": 12
                                        },
                                        "discountAmount": {
                                            "enabled": true,
                                            "amount": 32
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/coupon/updateCoupon/6365798213449f36c049dd33": {
            "post": {
                "tags": [
                    "coupon"
                ],
                "summary": "update coupon",
                "operationId": "updateCoupon",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "name": "gdfgd222f",
                                    "code": "ds444d",
                                    "type": "VOUCHER/COUPON",
                                    "promoType": "COUPON",
                                    "availableTo": {
                                        "allClient": false,
                                        "firstOrderClient": false,
                                        "selectedClient": {
                                            "enabled": true,
                                            "clientIds": [
                                                "605daad71b5bbb0032172c28"
                                            ]
                                        },
                                        "notAOrderSince": {
                                            "enabled": true,
                                            "days": 3
                                        }
                                    },
                                    "maximumUses": {
                                        "enabled": true,
                                        "uses": 4
                                    },
                                    "maximumClientUses": {
                                        "enabled": true,
                                        "maximumUses": 2
                                    },
                                    "maximumCompletedOrder": {
                                        "enabled": true,
                                        "maximumCompletedOrderCount": 4
                                    },
                                    "availableToServiceTask": {
                                        "allService": false,
                                        "selectedServices": [
                                            "6066e6babbe7309e0c4dd5f0"
                                        ],
                                        "selectedTasks": [
                                            "630c8fdcbc25cfb5a5acb16c"
                                        ]
                                    },
                                    "location": {
                                        "allLocation": false,
                                        "availableInCountry": [
                                            "6066e1aebbe7309e0c4dd5eb"
                                        ],
                                        "availableInGovernorate": [
                                            "6030cc1b2e0620f34be56ba8"
                                        ],
                                        "availableInCity": [],
                                        "availableInDistrict": [
                                            "60388d141467697e676ae374"
                                        ]
                                    },
                                    "timeLine": {
                                        "validTill": false,
                                        "dateTimeInterval": true,
                                        "dateTimeIntervalStart": "1/1/1",
                                        "dateTimeIntervalEnd": "1/1/1",
                                        "validTillDate": "1/1/1"
                                    },
                                    "broadcastType": "SMS",
                                    "action": {
                                        "cashOnWallet": {
                                            "enabled": true,
                                            "amount": 12.2
                                        },
                                        "discountPercentage": {
                                            "enabled": true,
                                            "percentage": 12,
                                            "uptoEnabled": true,
                                            "upto": 12
                                        },
                                        "discountAmount": {
                                            "enabled": true,
                                            "amount": 32
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/coupon/filterCoupon": {
            "post": {
                "tags": [
                    "coupon"
                ],
                "summary": "get coupon with filter",
                "operationId": "getCouponWithFilter",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "page": 2,
                                    "limit": 10,
                                    "sortField": "message",
                                    "sortOrder": "-1"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/coupon/couponDetails/63a13b6056e01ebe1ed3d8e0": {
            "get": {
                "tags": [
                    "coupon"
                ],
                "summary": "get coupon details",
                "operationId": "getCouponDetails",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/coupon/updateCouponStatus": {
            "post": {
                "tags": [
                    "coupon"
                ],
                "summary": "udate coupon status",
                "operationId": "updateCouponStatus",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "requestBody": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": {
                                    "couponId": "63ba9f2a4f9b4a1563495f55",
                                    "status": "ACTIVE"
                                }
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        },
        "/api/v1/admin/coupon/deleteCoupon/63b01849e4f4d42264ba5805": {
            "delete": {
                "tags": [
                    "coupon"
                ],
                "summary": "delete coupon",
                "operationId": "deleteCoupon",
                "parameters": [
                    {
                        "name": "token",
                        "in": "header",
                        "description": "",
                        "required": true,
                        "style": "simple",
                        "schema": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MWI5YThmOTI0MDY0M2Y2MDNiOGMxNmUiLCJpYXQiOjE2Mzk1NTc0MjA3NDd9.ahFKhoUcIflS2jrfFd-PjFktiEaRo798cY1Ql9H2Bj8"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                },
                "deprecated": false
            }
        }
    },
    "components": {
        "securitySchemes": {
            "noauth": {
                "type": "http",
                "scheme": "noauth"
            }
        },
        "parameters": {
            "Content-Type": {
                "name": "Content-Type",
                "in": "header",
                "required": true,
                "style": "simple",
                "schema": {
                    "type": "string",
                    "example": "application/json"
                }
            },
            "Accept-Language": {
                "name": "Accept-Language",
                "in": "header",
                "required": true,
                "style": "simple",
                "schema": {
                    "type": "string",
                    "example": "ar"
                },
                "description": "en,ar"
            },
            "deviceType": {
                "name": "deviceType",
                "in": "header",
                "required": true,
                "style": "simple",
                "schema": {
                    "type": "number"
                }
            },
            "deviceModel": {
                "name": "deviceModel",
                "in": "header",
                "required": true,
                "style": "simple",
                "schema": {
                    "type": "number"
                }
            },
            "appVersion": {
                "name": "appVersion",
                "in": "header",
                "required": true,
                "style": "simple",
                "schema": {
                    "type": "number"
                }
            },
            "osVersion": {
                "name": "osVersion",
                "in": "header",
                "required": true,
                "style": "simple",
                "schema": {
                    "type": "number"
                }
            },
            "token": {
                "name": "token",
                "in": "header",
                "required": true,
                "style": "simple",
                "schema": {
                    "type": "string",
                    "example": "{{token}}"
                }
            },
            "timezone": {
                "name": "timezone",
                "in": "header",
                "required": true,
                "style": "simple",
                "schema": {
                    "type": "number"
                }
            },
            "": {
                "name": "",
                "in": "query",
                "required": true,
                "style": "form",
                "schema": {
                    "type": "number"
                }
            }
        }
    },
    "security": [
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        },
        {
            "noauth": []
        }
    ],
    "tags": [],
    "externalDocs": {
        "url": "",
        "description": ""
    },
    "warnings": []
}

module.exports = swaggerDocument;