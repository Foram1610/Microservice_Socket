 
const mongoose = require("mongoose");
const Task = require('../models/taskSchema');
const Category = require('../models/categorySchema');
const Service = require('../models/serviceSchema');
const { __ } = require("i18n");

module.exports = {
    addTask: async (req, res) => {
        try {
            let data = req.body;

            let response = {};

            if (!data.taskNames.length) {

                response.status = false;
                response.message = __("Task Name is required");
                return res.status(200).json(response);
            }

            let responseTemp = [];

            for (let task of data.taskNames) {

                if (typeof task.name != "object" || !task.name.en || !task.name.ar) {
                    response.status = false;
                    response.message = __("invalid task name");
                    return res.status(200).json(response);
                }

                let userc = await Task.countTask({

                    $or: [
                        {
                            "name.en": task.name.en
                        },
                        {
                            "name.ar": task.name.ar
                        }
                    ]
                });

                if (userc) {
                    return res.status(400).json({
                        status: "failure",
                        message: __("TASK_ALREADY_EXIST")
                    });
                }

                let category = await Category.findCategoryInDB(task.categoryId);
                if (!category) {
                    response.status = false;
                    response.message = __("invalid category id");
                    return res.status(200).json(response);
                }

                let service = await Service.findServiceInDB(task.serviceId);
                if (!service) {
                    response.status = false;
                    response.message = __("invalid service id");
                    return res.status(200).json(response);
                }

            }

            for (let task of data.taskNames) {
                let taskData = new Task({
                    userId: req.user._id,
                    name: task.name,
                    categoryId: task.categoryId,
                    serviceId: task.serviceId,
                    addedBy: req.user.userType,
                    status: data.status,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                await taskData.save();
                responseTemp.push(taskData);
                response = [...responseTemp]
            }
            return res.status(200).json({
                status: "success",
                message: "",
                data: response
            });

        } catch (error) {

            return res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    },
    getTasks: async (req, res) => {
        let tasks = await Task.find();
        if (!tasks) {
            return res.status(400).json({
                status: "failure",
                message: "Not found",
                data: ""
            });
        } else {
            return res.status(200).json({
                status: "success",
                message: "",
                data: tasks
            });
        }
    },

    getTasksWithFilter: async (req, res) => {
        try {
            let data = req.body;
            let limit = data.limit;
            let sortField = data.sortField;
            let sortOrder = parseInt(data.sortOrder);

            let filter_option = {};

            if (data.task_name) {
                if (data.language == "ar") {
                    filter_option["name.ar"] = { $regex: data.task_name, $options: 'i' }
                } else {
                    filter_option["name.en"] = { $regex: data.task_name, $options: 'i' }
                }

            }

            if (data.category_id && data.category_id != "") {
                filter_option.categoryId = data.category_id
            }

            if (data.service_id && data.service_id != "") {
                filter_option.serviceId = data.service_id
            }
            let page = 0;
            if (data.page >= 0) {
                if (data.page > 0) {
                    page = data.page - 1;
                }

                let tasks = await Task.getTaskWIthFilter(filter_option, limit, page, sortField, sortOrder);

                if (!tasks) {
                    return res.status(400).json({
                        status: "failure",
                        message: "Not found",
                        data: "",
                        total: 0
                    });
                }

                let total = await Task.getTaskFilterCount(filter_option);

                let total_data_in_application = await Task.getTotalTasks();

                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: tasks,
                    total_data_in_application: total_data_in_application,
                    totalCount: total

                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: "Page number must be greater then zero",
                    data: ""
                });
            }

        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    getTaskById: async (req, res) => {
        try {
            let data = req.params;
            let tasks = await Task.findOne({ _id: data.taskId });
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
    },
    deleteTask: async (req, res) => {
        try {
            let data = req.params;
            let task = await Task.deleteOne({ _id: data.taskId });
            if (!task) {
                return res.status(400).json({
                    status: "failure",
                    message: "Not found",
                    data: ""
                });
            }
            return res.status(200).json({
                status: "success",
                message: "",
                data: task
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    deleteTaskCondition: async (req, res) => {
        try {
            let data = req.params;
            let task = {};
            task = await Task.findOne({ 'conditions._id': data.objId });
            if (!task) {
                return res.status(400).json({
                    status: "failure",
                    message: "Not found",
                    data: ""
                });
            }
            task.conditions.map((obj, index) => {
                if (obj._id == data.objId) {
                    task.conditions.splice(index, 1);
                }

            })
            await task.save()
            return res.status(200).json({
                status: "success",
                message: "",
                data: task
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }

    },
    deleteTaskField: async (req, res) => {
        try {
            let data = req.params;
            let task = {};
            task = await Task.findOne({ 'fields._id': data.objId });
            if (!task) {
                return res.status(400).json({
                    status: "failure",
                    message: "Not found",
                    data: ""
                });
            }
            task.fields.map((obj, index) => {
                if (obj._id == data.objId) {
                    task.fields.splice(index, 1);
                }

            })
            await task.save()
            return res.status(200).json({
                status: "success",
                message: "",
                data: task
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }

    },
    editTask: async (req, res) => {
        try {
            let data = req.body;
            let task = {}
            let response = {};


            task = await Task.findTaskInDB(data._id)
            if (!task) {
                return res.status(400).json({
                    status: "failure",
                    message: "Not found",
                    data: ""
                });
            }
            if (typeof data.taskNames[0] != "object" || !data.taskNames[0].name.en || !data.taskNames[0].name.ar) {

                response.status = false;
                response.message = __("Task Name is required11");
                return res.status(200).json(response);
            }
            let userc = await Task.countTask({
                _id: { $ne: data._id },
                $or: [
                    {
                        "name.en": data.taskNames[0].name.en
                    },
                    {
                        "name.ar": data.taskNames[0].name.ar
                    }
                ]
            });

            if (userc) {
                return res.status(400).json({
                    status: "failure",
                    message: __("TASK_ALREADY_EXIST")
                });
            }
            let category = await Category.findCategoryInDB(data.taskNames[0].categoryId);
            if (!category) {
                response.status = false;
                response.message = __("invalid category id");
                return res.status(200).json(response);
            }

            let service = await Service.findServiceInDB(data.taskNames[0].serviceId);
            if (!service) {
                response.status = false;
                response.message = __("invalid service id");
                return res.status(200).json(response);
            }

            if (task) {
                task.addedBy = req.user.userType
                task.name = data.taskNames[0].name
                task.categoryId = data.taskNames[0].categoryId
                task.serviceId = data.taskNames[0].serviceId
                task.status = data.status
                task.userId = req.user._id
                await task.save();
            }

            return res.status(200).json({
                status: "success",
                message: "",
                data: task
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    editTaskField: async (req, res) => {
        try {
            let data = req.body;
            let task = {};
            let taskFieldId = data.field._id;
            if (data.field._id) {

                task = await Task.findTaskInDB(data.taskId);
                if (!task) {
                    return res.status(400).json({
                        status: "failure",
                        message: "Not found",
                        data: ""
                    });
                }
                let index = 0;
                task.fields.map((obj, indexTemp) => {
                    if (obj._id == taskFieldId) {
                        index = indexTemp;
                    }
                });

                task.fields[index].fieldValues = data.field.fieldValues;
                task.fields[index].fieldType = data.field.fieldType;
                task.fields[index].fieldLabel = data.field.fieldLabel;
                task.fields[index].fieldName = data.field.fieldName;
                task.fields[index].defaultVisible = data.field.defaultVisible;
                task.fields[index].defaultValue = data.field.defaultValue;
                task.fields[index].field_lists = data.field.field_lists;
                await task.save();
            } else {

                task = await Task.updateTaskField(data);
                if (!task) {
                    return res.status(400).json({
                        status: "failure",
                        message: "Not found",
                        data: ""
                    });
                }
            }
            return res.status(200).json({
                status: "success",
                message: "",
                data: task
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }

    },

    editTaskCondition: async (req, res) => {
        try {
            let data = req.body;
            let task = {};
            let taskConditionId = data.condition._id;


            if (data.condition._id) {

                task = await Task.findTaskInDB(data.taskId);
                if (!task) {
                    return res.status(400).json({
                        status: "failure",
                        message: "Not found",
                        data: ""
                    });
                }
                let index = -1;
                task.conditions.map((obj, indexTemp) => {
                    if (obj._id == taskConditionId) {
                        index = indexTemp;
                    }
                })
                if (index === -1) {
                    return res.status(400).json({
                        status: "failure",
                        message: "Task Condition Not found",
                        data: ""
                    });
                }

                task.conditions[index].condition_satisfies = data.condition.condition_satisfies;
                task.conditions[index].field_conditions = data.condition.field_conditions;
                task.conditions[index].field_actions = data.condition.field_actions;

                await task.save();
            } else {

                task = await Task.updateTaskCondition(data);
                if (!task) {
                    return res.status(400).json({
                        status: "failure",
                        message: "Not found",
                        data: ""
                    });
                }
            }
            return res.status(200).json({
                status: "success",
                message: "",
                data: task
            });


        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },


    getFieldByFieldType: async (req, res) => {
        try {

            let taskFields = []
            let tasks = await Task.getFieldsByType(req.body?.taskId);

            if (tasks) {
                taskFields = tasks.fields?.filter(ff => ff.fieldType === req.body?.fieldType)
            }

            if (!tasks) {
                return res.status(400).json({
                    status: "failure",
                    message: "Not found",
                    data: "",
                    total: 0
                });
            }
            return res.status(200).json({
                status: "success",
                message: "",
                data: taskFields,


            });

        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    editTaskStatus: async (req, res) => {
        try {


            let data = req.body;
            let taskId = req.params.taskId;

            let taskDetails = await Task.findTaskInDB(taskId);
            if (!taskDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: taskDetails
                });
            }
            Task.statusUpdate({ taskId: taskId, status: data.status }, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("STATUS_CHANGED"),
                        data: resp
                    });
                }

            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }

    },


    getFieldValueByFieldId: async (req, res) => {
        try {

            let taskValues = []
            let tasks = await Task.getFieldsByType(req.body?.taskId);

            if (tasks) {
                taskValues = tasks.fields?.find(ff => ff._id == req.body?.id)
            }

            if (!tasks) {
                return res.status(400).json({
                    status: "failure",
                    message: "Not found",
                    data: "",
                    total: 0
                });
            }
            return res.status(200).json({
                status: "success",
                message: "",
                data: taskValues,


            });

        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    getTasksByServiceIdList: async (req, res) => {
        try {
            let data = req.body

            const tasks = await Task.tasksByServiceList(data.serviceId);

            return res.status(200).json({
                status: "success",
                message: "",
                data: tasks
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    }

}