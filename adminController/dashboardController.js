
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const Task = require('../models/taskSchema');
const Service = require('../models/serviceSchema');
const Category = require('../models/categorySchema');

const validation = require('../helper/validator.js');
const helper = require('../helper/helper');
const { __ } = require('i18n');
const ejs = require('ejs');
const crypto = require('crypto');

module.exports = {
    dashboardDataCount: async (req, res) => {
        try {
            let result = {};

            let customers = await User.countDocuments({ userType: 'USER' });
            let serviceprovider = await User.countDocuments({
                $or: [{ userType: 'COMPANY' }, { userType: 'INDIVIDUAL' }]
            });
            let category = await Category.countDocuments({});
            let service = await Service.countDocuments({});
            let task = await Task.countDocuments({});

            result.customers = customers;
            result.serviceprovider = serviceprovider;
            result.category = category;
            result.service = service;
            result.task = task;

            return res.status(200).json({
                status: "success",
                message: "Dashboard data",
                data: result
            });

        } catch (error) {
            return res.status(400).json({ status: "failure", message: error.message });
        }

    }

}
