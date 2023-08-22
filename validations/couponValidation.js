const Joi = require('joi');
const promoTypes=["COUPON", "VOUCHER"]
const broadcastType=["SMS",  "PUSH", "PUSH_AND_SMS"]
const statusTypes = ["ACTIVE", "DISABLE", "EXPIRED"];
const clientGroupTypes = ["ALL_CLIENT", "FIRST_ORDER_CLIENT", "SELECTED_CLIENT", "NOT_A_ORDER_SINCE"];
const serviceCriteria = ["ALL", "SELECTED"];


const couponStatus = ["ACTIVE", "DISABLE", "EXPIRED"];

module.exports = {
    couponCreateValidation : Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        promoType: Joi.string().valid(...promoTypes).required(),

        availableTo: Joi.object({
            allClient: Joi.boolean().required(),
            firstOrderClient: Joi.boolean().required(),
            selectedClient: Joi.object({
                enabled: Joi.boolean().required(),
                clientIds: Joi.array()
            }).required(),


            notAOrderSince: Joi.object({
                enabled: Joi.boolean().required(),
                days: Joi.number().when('enabled', {is: true, then: Joi.number().min(1).required()}),
            }).required(),
        }).required(),

        maximumUses: Joi.object({
            enabled: Joi.boolean().required(),
            uses: Joi.number().when('enabled', {is: true, then: Joi.number().min(1).required()}),
        }).required(),
        maximumClientUses: Joi.object({
            enabled: Joi.boolean().required(),
            maximumUses: Joi.number().when('enabled', {is: true, then: Joi.number().min(1).required()}),
        }).required(),
        maximumCompletedOrder: Joi.object({
            enabled: Joi.boolean().required(),
            maximumCompletedOrderCount: Joi.number().when('enabled', {is: true, then: Joi.number().min(1).required()}),
        }).required(),

        timeLine: Joi.object({
            dateTimeInterval: Joi.boolean().required(),
            dateTimeIntervalStart: Joi.when('dateTimeInterval', {is: true, then: Joi.date().required()}),
            dateTimeIntervalEnd: Joi.when('dateTimeInterval', {is: true, then: Joi.date().required()}),
            validTill: Joi.boolean().required().when('dateTimeInterval', {
                is: true,
                then: Joi.required().valid(false),
                otherwise: Joi.required().valid(true)
            }),
            validTillDate: Joi.when('validTill', {is: true, then: Joi.date().required()}),
        }).required(),
        broadcastType: Joi.string().valid(...broadcastType).required(),
    }),
        couponFilterValidation: Joi.object({
            page: Joi.number().required(),
            limit: Joi.number().required(),
            clientGroup: Joi.string().valid(...clientGroupTypes).optional(),
            allService: Joi.boolean().optional(),
            selectedService: Joi.string().optional().when('allService', {is: true, then: Joi.forbidden()}),
            selectedTask: Joi.string().optional()
                .when('allService', {is: true, then: Joi.forbidden()}),
            location: Joi.object({
                allLocation: Joi.boolean().optional(),
                availableInCountry: Joi.array().items(Joi.string()).min(1).when('allLocation', {
                    is: true,
                    then: Joi.forbidden()
                }),
                availableInGovernorate: Joi.array().items(Joi.string()).min(1).when('allLocation', {
                    is: true,
                    then: Joi.forbidden()
                }),
                availableInCity: Joi.array().items(Joi.string()).min(1).when('allLocation', {
                    is: true,
                    then: Joi.forbidden()
                }),
                availableInDistrict: Joi.array().items(Joi.string()).min(1).when('allLocation', {
                    is: true,
                    then: Joi.forbidden()
                }),
            }).optional(),

            validity: Joi.object({
                startDate: Joi.date().optional(),
                endDate: Joi.date().optional(),
            }).optional(),
        }),

        couponUpdateValidation: Joi.object({
            // couponId: Joi.string().required(),
            name: Joi.string().required(),
            code: Joi.string().required(),
            promoType: Joi.string().valid(...promoTypes).required(),

            availableTo: Joi.object({
                allClient: Joi.boolean().required(),
                firstOrderClient: Joi.boolean().required(),
                selectedClient: Joi.object({
                    enabled: Joi.boolean().required(),
                    clientIds: Joi.array()
                }).required(),


                notAOrderSince: Joi.object({
                    enabled: Joi.boolean().required(),
                    days: Joi.number().when('enabled', {is: true, then: Joi.number().min(1).required()}),
                }).required(),
            }).required(),

            maximumUses: Joi.object({
                enabled: Joi.boolean().required(),
                uses: Joi.number().when('enabled', {is: true, then: Joi.number().min(1).required()}),
            }).required(),
            maximumClientUses: Joi.object({
                enabled: Joi.boolean().required(),
                maximumUses: Joi.number().when('enabled', {is: true, then: Joi.number().min(1).required()}),
            }).required(),
            maximumCompletedOrder: Joi.object({
                enabled: Joi.boolean().required(),
                maximumCompletedOrderCount: Joi.number().when('enabled', {is: true, then: Joi.number().min(1).required()}),
            }).required(),

            timeLine: Joi.object({
                dateTimeInterval: Joi.boolean().required(),
                dateTimeIntervalStart: Joi.when('dateTimeInterval', {is: true, then: Joi.date().required()}),
                dateTimeIntervalEnd: Joi.when('dateTimeInterval', {is: true, then: Joi.date().required()}),
                validTill: Joi.boolean().required().when('dateTimeInterval', {
                    is: true,
                    then: Joi.required().valid(false),
                    otherwise: Joi.required().valid(true)
                }),
                validTillDate: Joi.when('validTill', {is: true, then: Joi.date().required()}),
            }).required(),

            message: Joi.string(),
            broadcastType: Joi.string(),
        }),

    statusUpdateValidation: Joi.object({
        couponId: Joi.string().required(),
        status: Joi.string().valid(...couponStatus).required(),
    }),



}



