const Joi = require('joi');


module.exports = {
    systemSettingValidation: Joi.object({
        discountPercentageEnabled: Joi.boolean().required(),
        discountPercentage: Joi.when('discountPercentageEnabled', {
            is: true,
            then: Joi.number().required(),
            otherwise: Joi.number().optional()
        }),
        upToEnabled: Joi.when('discountPercentageEnabled',
            {
                is: true,
                then: Joi.boolean().required(),
                otherwise: Joi.boolean().optional()
            }),
        upToAmount: Joi.when('upToEnabled',
            {
                is: true,
                then: Joi.number().required(),
                otherwise: Joi.number().optional()
            }),
        discountAmountEnabled: Joi.boolean().required().valid(true).invalid(false).when('discountPercentageEnabled',
            {
                is: true,
                then: Joi.valid(false),
                otherwise: Joi.valid(true)
            }),
        discountAmount: Joi.when('discountAmountEnabled',
            {
                is: true,
                then: Joi.number().required(),
                otherwise: Joi.number().optional()
            }),
        referralUsageEnabled: Joi.boolean().required(),
        customizedReferralUserEnabled: Joi.boolean().required().when('referralUsageEnabled',
            {
                is: false,
                then: Joi.invalid(false),
            }),
        initialReferralUses: Joi.when('customizedReferralUserEnabled',
            {
                is: true,
                then: Joi.number().required(),
                otherwise: Joi.number().optional()
            }),
        referralAfterInitialUsage: Joi.number().required().when('customizedReferralUserEnabled',
            {
                is: true,
                then: Joi.number().required(),
                otherwise: Joi.number().optional()
            }),

        referralUsages: Joi.number().required(),
        daysValidFor: Joi.number().required(),
    })
}
