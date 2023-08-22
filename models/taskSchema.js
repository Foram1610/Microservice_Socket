
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        name: {
            type: {
                en: { type: String, required: true },
                ar: { type: String, required: true }
            },
            required: true
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Services"
        },
        fields: [{
            fieldId: { type: String },
            fieldType: { type: String },
            fieldLabel: {
                type: Object
            },
            fieldName: { type: String },
            field_lists: [{
                listName: { type: String },
                option_lists: [{
                    listItem_title: { type: String },
                    listItem_lable_en: { type: String },
                    listItem_lable_ar: { type: String },
                    listItem_value: { type: String },
                    listItem_order: { type: String },

                }]
            }


            ],

            defaultValue: { type: String },
            defaultVisible: { type: Boolean, default: false }
        }],
        conditions: [{
            condition_satisfies: { type: Boolean },
            field_conditions: [{
                conditionFieldCondition: { type: String },
                conditionFieldType: { type: String },
                conditionFieldName: { type: String },//Will update value during edit field name               
                conditionFieldValue: { type: String }, //Will update value during edit field Value 
                conditionListValue: { type: String } //Will update value during edit field Value 
            }],
            field_actions: [{
                fieldAction: { type: String },
                actionFieldName: { type: String },
                actionFieldType: { type: String },
                actionFieldValue: { type: String }
            }]
        }],
        addedBy: {
            type: String,
            enum: ["ADMIN", "SUBADMIN", "SUPERADMIN"],
            required: true
        },
        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "active"
        },
        createdAt: { type: Date },
        UpdatedAt: { type: Date }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false
    }
);

TaskSchema.virtual("categoryDetails", {
    ref: "Categories",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true,
});

TaskSchema.virtual("serviceDetails", {
    ref: "Services",
    localField: "serviceId",
    foreignField: "_id",
    justOne: true,
});
// Statics Methods
TaskSchema.statics = {
    getTotalTasks: function () {
        try {
            return this.countDocuments();
        }
        catch (err) {
            console.log(err);
            throw err;
        }


    },

    getTaskWIthFilter: function (filter_option, limit, page, sortField, sortOrder) {

        try {

            return this.find(filter_option)
                .populate('userId', 'name')
                .populate('categoryId', 'name')
                .populate('serviceId', 'name')
                .limit(parseInt(limit))
                .skip(limit * page)
                .sort({ [sortField]: sortOrder });

        } catch (err) {
            console.log(err);
            throw err;
        }

    },

    getTaskFilterCount: function (filter_option) {
        try {

            return this.find(filter_option)
                .populate('userId', 'name')
                .populate('categoryId', 'name')
                .populate('serviceId', 'name')
                .countDocuments();

        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    getFieldsByType: function (taskId) {
        try {
            return this.findOne({ '_id': taskId })

        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    tasksByServiceList: async function (data) {
        return this.find({ 'serviceId': { $in: data } })
            .select("_id name serviceId categoryId")
            .populate("categoryDetails", "name")
            .populate("serviceDetails", "name")

    },
    statusUpdate: function (data, callback) {
        return this.findByIdAndUpdate(
            { _id: data.taskId },
            {
                $set: {
                    status: data.status
                }
            },
            { new: true },
            callback
        );
    },
    countTask: function (data) {
        return this.count(data)
    },
    findTaskInDB: function (id) {
        return this.findOne({ _id: id })
    },
    updateTaskField: function (data) {
        return this.findByIdAndUpdate(
            { _id: data.taskId },
            {
                $push: {
                    fields: data.field
                }
            },
            { new: true }
        )
    },
    updateTaskCondition: function (data) {
        return this.findByIdAndUpdate(
            { _id: data.taskId },
            {
                $push: {
                    conditions: data.condition
                }
            },
            { new: true }
        )
    },
    tasksByServiceId: async function (data) {
        return this.find(data)

    }
};

module.exports = mongoose.model("Tasks", TaskSchema);