const { getAllCategoryWithServices } = require('../services/category.service');
const validator = require("../validations/validator");
const Joi = require('joi');

module.exports={
    //all category with services with pagination
    allCategoryWithServices: async (req, res) => {
        try {

            let validation = Joi.object({
                page: Joi.number().integer().min(1).optional(),
            });

            const { error, value } = validator(validation, req.body);

            if (error) {
                return res.status(400).json({
                    status: "failure",
                    message: __(error.message),
                });
            }

            let option={}
            option.page = value.page || 1;
            option.limit =  10;

            let categories=await getAllCategoryWithServices(option)

            res.status(200).json({
                status: "success",
                message: __("All categories with services"),
                data: categories
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
