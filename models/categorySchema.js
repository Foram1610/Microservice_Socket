var mongoose = require("mongoose");

var categorySchema = mongoose.Schema({
    name: { type: Object },
    image: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },
    addedBy: { type: String, enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "PROVIDER"], required: true },
    userRefId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
});



// Statics Methods
categorySchema.statics = {
    getCategories: function () {
        return this.find({})
    },
    getActiveCategories: function () {
        return this.find({ status: "active" }).select(
            "_id name status addedBy image"
        );
    },
    getCategoryById: function (id) {
        return this.findById({ _id: id }).select(
            "_id name status addedBy image"
        );
    },
    addCategory: function (data, callback) {
        var query = { name: data.name };
        this.findOneAndUpdate(query, data, { upsert: true, new: true }, callback);
    },
    editCategory: async function (data, callback) {
        this.findOneAndUpdate({ _id: data.categoryId }, data, { upsert: true }, callback);
    },
    removeCategory: function (categoryId) {
        return this.remove({ _id: categoryId });
    },
    filterCategories: async function (options) {
        const criteria = options.criteria || {};
        const page = options.page || 1;
        const limit = options.limit || 30;
        const sortField = options.sortField || 'createdAt';
        const sortOrder = Number(options.sortOrder) || -1;


        const totalCount = await this.countDocuments(criteria).exec();
        const data = await this.find(criteria)
            .populate('userRefId', 'name')
            .select("_id name status addedBy image createdAt")
            .sort({
                [sortField]: sortOrder
            })
            .limit(limit)
            .skip(limit * (page - 1))
            .exec();

        return {
            totalCount: totalCount,
            data: data
        }
    },
    getCategoriesWithFilter: async function (options) {
        const category_criteria = options.criteria || {};
        const page = options.page || 1;
        const limit = options.limit || 10; //when pagination is not required geting 500 record per hit
        let sortField = options.sortField || `name.${options.language}`;
        const sortOrder = Number(options.sortOrder) || -1;

        if (options.sortField == 'categoryName') {
            sortField = `name.${options.language}`;
        }

        let matchVal = category_criteria



        let selectVal = {
            "_id": 1,
            "status": 1,
            "image": 1,
            "name": 1,
            "addedBy": 1,
            "createdAt": 1,
            "updatedAt": 1,
            "servicesCount": 1

        }


        const result = await this.aggregate([{
            $match: matchVal
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userRefId',
                foreignField: '_id',
                as: 'addedBy'
            }
        },
        {
            $lookup: {
                from: "services",
                localField: "_id",
                foreignField: "categoryId",
                as: "services"
            }
        },
        {
            $addFields: {
                "servicesCount": { $size: "$services" }
            }

        },

        {
            $project: selectVal
        },
        {
            $sort: {
                [sortField]: sortOrder
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: 1
                },
                results: {
                    $push: '$$ROOT'
                }
            }
        },
        {
            $project: {
                total: 1,
                results: {
                    // [previous_result, skip_page,limit]
                    $slice: ['$results', (limit * (page - 1)), limit]
                }
            }
        },
        ]);

        if (result.length > 0) {
            return {
                totalCount: result.length > 0 ? result[0].total : 0,
                data: result.length > 0 ? result[0].results : []
            }
        } else {
            return {
                data: [],
                totalCount: 0
            }
        }

    },
    findCategoryInDB: function (id) {
        return this.findOne({ _id: id })
    },
    countCategory: function (data) {
        return this.count(data)
    },
    getCategoriesByDistrict: function (categories) {
        return this.find({ '_id': { $in: categories } }).select(
            "_id name"
        );
    }
};

module.exports = mongoose.model("Categories", categorySchema);