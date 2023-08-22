 
const mongoose = require("mongoose");
const TimeSlot = require('../models/timeSlotSchema');

const { __ } = require("i18n");

module.exports = {

    getTimeSlotByServiceId: async (req, res) => {
        try {
            let data = req.params;
            let timeslots = await TimeSlot.findByService(data.serviceId);
            if (!timeslots) {
                return res.status(400).json({
                    status: "failure",
                    message: "Not found",
                    data: ""
                });
            }
            return res.status(200).json({
                status: "success",
                message: "",
                data: timeslots
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    }

}