const moment = require("moment-timezone");
const geolib = require("geolib");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
let aws = require('aws-sdk');
const { Client } = require("@googlemaps/google-maps-services-js");
let config = require('../config/config.json');
const mongoose = require("mongoose");

module.exports = {
    generateUniqueNumber: async (userType) => {
        let date = new Date()
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear().toString().substr(2, 2);
        let dateStr = day + month + year;

        console.log('dateStr', dateStr)
        const User = require('../models/userSchema');

        let checkLastUser = await User.findOne({
            "userType": userType
        }).select('_id uniqueId userType serialNumber').sort({ _id: -1 });

        console.log("checkLastUser", checkLastUser);
        let userSerial = 0, uniqueId = '';

        if (!checkLastUser || checkLastUser.serialNumber == undefined) {

            userSerial = 1;
            let totalDigits = 7;
            let totalZero = totalDigits - userSerial.toString().length;
            for (let i = 0; i < totalZero; i++) {
                userSerial = '0' + userSerial;
            }

            uniqueId =
                config.PREFIX[userType] +
                + dateStr + userSerial;
        } else {
            let lastSerialNumber = checkLastUser.serialNumber;

            userSerial = lastSerialNumber + 1;

            let totalDigits = 7;
            let totalZero = totalDigits - userSerial.toString().length;
            for (let i = 0; i < totalZero; i++) {
                userSerial = '0' + userSerial;
            }

            userSerial = userSerial.toString()
            uniqueId = config.PREFIX[userType] +
                + dateStr + userSerial;
        }

        console.log('uniqueId', uniqueId)
        return {
            serialNumber: userSerial,
            uniqueId: uniqueId
        }

    },

    sendEmail: async (data, callback) => {
        // create Nodemailer SES transporter

        let transporter = nodemailer.createTransport({
            SES: new aws.SES({
                accessKeyId: process.env.SES_ACCESS_KEY_ID,
                secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
                region: process.env.SES_REGION,

                apiVersion: '2010-12-01',
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Action": [
                            "ses:SendEmail",
                            "ses:SendRawEmail"
                        ],
                        "Resource": "*"
                    }
                ]

            })
        });
        console.log('`${config.APP_NAME} <${config.SES.email}>`', `${config.APP_NAME} <${config.SES.email}>`)
        let mailOptions = {
            from: `${config.APP_NAME} <${config.SES.email}>`,
            to: data.email,
            subject: data.subject,
            html: data.templateData
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                callback(error, null)
            } else {
                console.log('Message sent: ' + info);
                callback(null, info)
            }
        });
    },

    signToken: (user) => {
        return jwt.sign(
            {
                iss: "Alista",
                sub: user._id,
                iat: new Date().getTime() // current time
                // exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
            },
            process.env.SECRET_CODE
        );
    },

    generatorRandomChar: (length) => {
        return crypto.randomBytes(13).toString('hex');

    },

    getTimeDifferenceInDay: (endDate, startDate) => {
        let difference = 0;
        let startDateFormat = moment(startDate, constant.DATE_FORMAT);
        let endDateFormat = moment(endDate, constant.DATE_FORMAT);
        difference = endDateFormat.diff(startDateFormat, "days");
        difference = difference.toFixed(2);

        return difference;
    },

    getTimeDifferenceInSecond: (endDate, startDate) => {
        let difference = 0;
        let startDateFormat = moment(startDate);
        let endDateFormat = moment(endDate);
        difference = endDateFormat.diff(startDateFormat, "seconds");
        difference = difference.toFixed(2);

        return difference;
    },

    generateOTP: function () {
        return (
            Math.floor(100000 + Math.random() * 900000)
        );
    },

    getTimeDifferenceInMinute: (endDate, startDate) => {
        let difference = 0;
        let startDateFormat = moment(startDate);
        let endDateFormat = moment(endDate);
        difference = endDateFormat.diff(startDateFormat, "minutes");
        difference = Math.round(difference);
        return difference;
    },

    getAge: (dob) => {
        let DOBFD = moment(dob, "YYYYMMDD");
        let age = moment().diff(DOBFD, "years"); // NOSONAR
        return age;
    },

    isValidDate: (date, format) => {
        let validDateFormat = moment(date, format).isValid(); // NOSONAR
        return validDateFormat;
    },

    getCurrentDateAndTimeInCityTimezoneFromUTC: (cityTimezone) => {
        let a = moment.tz(new Date(), cityTimezone); // NOSONAR
        return a;
    },

    getDateAndTimeInCityTimezone: (date, cityTimezone) => {
        let a = moment.tz(date, cityTimezone); // NOSONAR
        return a;
    },

    getDatabaseUrl: () => {
        //database url
        let dbUrl;
        if (process.env.NODE_ENV == "development") {
            dbUrl = process.env.DB_HOST + "/" + process.env.DB_NAME;

        } else {
            dbUrl = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + "/" + process.env.DB_NAME;
        }
        return dbUrl;
    },

    ucFirst: (data) => {
        if (data) {
            let splitStr = data.toLowerCase().split(" ");
            for (let i = 0; i < splitStr.length; i++) {
                splitStr[i] =
                    splitStr[i].charAt(0).toUpperCase() +
                    splitStr[i].substring(1);
            }
            return splitStr.join(" ");
        }
        return data;
    },

    sendPushNotificationCustomer: (title, body, data, registrationToken) => {
        data.title = title;
        data.body = body;
        let payload = {
            notification: {
                title: title,
                body: body,
                sound: "default"
            },
            data: data
        };

        admin
            .messaging()
            .sendToDevice(registrationToken, payload)
            .then((response) => {
                // Response is a message ID string.
                console.log("firebase sent message:", response);
            })
            .catch((error) => {
                console.log("Firebase Error sending message:", error);
            });
    },

    sendPushNotificationProvider: (title, body, data, registrationToken) => {
        let providerFDB = app.get("providerFDB");
        data.title = title;
        data.body = body;
        let payload = {
            notification: {
                title: title,
                body: body,
                sound: "default"
            },
            data: data
        };

        admin.messaging(providerFDB).sendToDevice(registrationToken, payload).then((response) => {
            // Response is a message ID string.
            console.log("firebase sent message:", response);
        }).catch((error) => {
            console.log("Firebase Error sending message:", error);
        });
    },

    emitCustomerSocket: (socketId, data) => {
        let io = app.get("socketio");
        io.to(socketId).emit("trip_customer_socket", data);
    },

    emitProviderSocket: (socketId, data) => {
        let io = app.get("socketio");
        io.to(socketId).emit("trip_driver_socket", data);
    },

    emitChatSocket: (socketId, data) => {
        let io = app.get("socketio");
        io.to(socketId).emit("newMessage", data);
    },

    sendNotificationToAll: async (data) => {
        try {
            let messages = [];

            if (data.length > 0) {
                data.forEach((element) => {
                    element = JSON.parse(JSON.stringify(element));
                    if (element.firebase_token != "") {
                        messages.push({
                            notification: { title: title, body: message },
                            token: element.firebase_token
                        });
                    }
                });
            }

            admin.messaging().sendAll(messages).then((response) => {
                console.log("Message Successfully sent message:", response);
            }).catch((error) => {
                console.log("Message  Error sending message:", error);
            });

            return { status: 1, message: "Message Send successfully." };
        } catch (error) {
            console.log("error", error);
            return { status: 0, message: "Unable to Send notification." };
        }
    },
    findNearLocation: (from, locations) => {
        return geolib.findNearest(from, locations);
    },
    //deep compare two objects
    deepCompareTwoObject: () => {
        return {
            VALUE_CREATED: 'created',
            VALUE_UPDATED: 'updated',
            VALUE_DELETED: 'deleted',
            VALUE_UNCHANGED: 'unchanged',
            map: function (obj1, obj2) {
                if (this.isFunction(obj1) || this.isFunction(obj2)) {
                    throw 'Invalid argument. Function given, object expected.'; // NOSONAR
                }

                if (this.isValue(obj1) || this.isValue(obj2)) {
                    return {
                        type: this.compareValues(obj1, obj2),
                        data: obj1 === undefined ? obj2 : obj1
                    };
                }

                let diff = {};
                for (var key in obj1) {
                    if (this.isFunction(obj1[key])) {
                        continue;
                    }

                    let value2 = undefined;
                    if (obj2[key] !== undefined) {
                        value2 = obj2[key];
                    }

                    diff[key] = this.map(obj1[key], value2);
                }

                for (var key in obj2) { // NOSONAR
                    if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
                        continue;
                    }
                    diff[key] = this.map(undefined, obj2[key]);
                }

                return diff;
            },

            compareValues: function (value1, value2) {
                if (value1 === value2) {
                    return this.VALUE_UNCHANGED;
                }

                if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
                    return this.VALUE_UNCHANGED;
                }

                if (value1 === undefined) {
                    return this.VALUE_CREATED;
                }

                if (value2 === undefined) {
                    return this.VALUE_DELETED;
                }

                return this.VALUE_UPDATED;
            },

            isFunction: function (x) {
                return Object.prototype.toString.call(x) === '[object Function]';
            },

            isArray: function (x) {
                return Object.prototype.toString.call(x) === '[object Array]';
            },

            isDate: function (x) {
                return Object.prototype.toString.call(x) === '[object Date]';
            },

            isObject: function (x) {
                return Object.prototype.toString.call(x) === '[object Object]';
            },

            isValue: function (x) {
                return !this.isObject(x) && !this.isArray(x);
            }
        }
    },
    getGeoLocationBoundsFromAddress: async (address) => {

        const client = new Client({});

        try {
            let resp = await client.geocode({
                params: {
                    address: address,
                    key: process.env.GOOGLE_MAP_KEY
                }
            });
            return {
                status: 1,
                data: resp.data.results[0].geometry.bounds
            }
        } catch (error) {
            console.log(error);
            return {
                status: 0

            }
        }

    },

    getGeoLocationInformationFromAddress: async (address) => {

        const client = new Client({});

        try {
            let resp = await client.geocode({
                params: {
                    address: address,
                    key: process.env.GOOGLE_MAP_KEY
                }
            });

            if (resp.data.results.length == 0) {
                return {
                    status: 0

                }
            }
            return {
                status: 1,
                data: resp.data.results[0]
            }
        } catch (error) {
            console.log(error);
            return {
                status: 0

            }
        }

    },

    //initiate setting document skeleton when application start
    initiateSettings: async () => {
        try {
            const SystemSetting = require('../models/systemSettingSchema');
            const initialSettingSkeletonObject = require('./settings');
            //for each setting object key check if object.moduleNames is in systemSettings collection
            for (const value of Object.entries(initialSettingSkeletonObject)) {
                let settingObject = await SystemSetting.findOne({
                    moduleName: value.moduleName,
                    settingName: value.settingName
                });
                if (settingObject !== null) {
                    await SystemSetting.create(value);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
};
