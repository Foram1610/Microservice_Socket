 
const mongoose = require("mongoose");
const Task = require('../models/taskSchema');

const { __ } = require("i18n");

module.exports = {

    getTaskById: async (req, res) => {
        try {
            let data = req.params;
            let languageCode = req.languageCode
            let tasks = await Task.findOne({ _id: data.taskId })
                .select(`status _id userId name.${languageCode} categoryId serviceId addedBy createdAt fields.defaultVisible fields._id fields.fieldName  fields.fieldLabel.${languageCode} fields.fieldType fields.field_lists conditions`);
            if (!tasks) {
                return res.status(400).json({
                    status: "failure",
                    message: "Not found",
                    data: ""
                });
            }
            return res.status(200).json({
                status: "success",
                message: "",
                data: tasks
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    }

}