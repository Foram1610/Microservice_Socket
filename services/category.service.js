
const mongoose = require("mongoose");
const Category = require('../models/categorySchema');

const getAllCategoryWithServices = async (option) => {

    let page = option.page || 1;
    let limit = option.limit || 10;
    return Category.aggregate([
        {
            $lookup: {
                from: "services",
                localField: "_id",
                foreignField: "categoryId",
                as: "services"
            }
        },
        {
            $facet: {

                "data": [
                    {$skip: (page - 1) * limit},
                    {$limit: limit}
                ]

            }

        }

    ]);

}

module.exports = {
    getAllCategoryWithServices
}
