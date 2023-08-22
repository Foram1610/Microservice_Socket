
const mongoose = require("mongoose");
const Coupon = require('../../models/couponSchema');

class CouponFilterService {
    constructor(data) {
        this.data = data;
    }

    async filterCoupon() {

        try {
            let query = {};
            let builder = "";

            if (this.data.code) {
                query.code = this.data.code;
            }
            if (this.data.status) {
                query.status = this.data.status;
            }
            if (this.data.promoType) {
                query.promoType = this.data.promoType;
            }

            //name
            if (this.data.name) {
                query.name = { $regex: this.data.name, $options: "i" };
            }

            if (this.data.clientGroup) {
                query = this.addClientGroupFilter(query);
            }

            if (this.data.validity) {
                query = this.addValidityFilter(query);
            }

            if (this.data.allService) {
                builder = "availableToServiceTask.allService";
                query[builder] = true;
            }
            if (this.data.selectedService && !this.data.selectedTask) {
                builder = "availableToServiceTask.selectedServices";
                query[builder] = this.data.selectedService;
            }
            if (this.data.selectedTask) {
                builder = "availableToServiceTask.selectedTasks";
                query[builder] = this.data.selectedTask;
            }

            //dded by
            if (this.data.addedBy) {
                query.createdBy = this.data.addedBy;
            }

            //modified by
            if (this.data.modifiedBy) {
                query.modifiedBy = this.data.modifiedBy;
            }

            let sortField = this.data.sortField || "createdAt";
            let sortOrder = this.data.sortOrder || -1;

            let dataFetchingOptions = {
                page: this.data.page,
                limit: this.data.limit,
                sort: { [sortField]: sortOrder },

            };

            return Coupon.couponListByFilter(query, dataFetchingOptions);
        } catch (err) {
            throw new Error(`Error occurred: ${err.message}`);
        }
    }

    addClientGroupFilter(query) {
        let builder = "";
        if (this.data.clientGroup === "ALL_CLIENT") {
            builder = "query.availableTo.allClient";
            query[builder] = true;
        } else if (this.data.clientGroup === "FIRST_ORDER_CLIENT") {
            builder = "query.availableTo.firstOrderClient";
            query[builder] = true;
        } else if (this.data.clientGroup === "SELECTED_CLIENT") {
            builder = "availableTo.selectedClient.enabled";
            query[builder] = true;
        } else if (this.data.clientGroup === "NOT_A_ORDER_SINCE") {
            builder = "availableTo.notAOrderSince.enabled";
            query[builder] = true;
        }

        return query;
    }

    addLocationFilter(query, location) {
        let locationQuery = { $or: [] };
        if (location === "ALL_LOCATION") {
            query.location.allLocation = true;
        }
        if (this.data.availableInCOuntry) {
            locationQuery.$or.push({
                availableInCOuntry: { $all: this.data.availableInCOuntry },
            });
        }
        if (this.data.availableInGovernorate) {
            locationQuery.$or.push({
                availableInGovernorate: {
                    $all: this.data.availableInGovernorate,
                },
            });
        }
        if (this.data.availableInCity) {
            locationQuery.$or.push({
                availableInCity: { $all: this.data.availableInCity },
            });
        }
        if (this.data.availableInDistrict) {
            locationQuery.$or.push({
                availableInDistrict: { $all: this.data.availableInDistrict },
            });
        }

        if (locationQuery.$or.length > 0) {
            query.location = locationQuery;
        }

        return query;
    }

    addValidityFilter(query) {
        let builder = "";
        if (this.data.validity.startDate && this.data.validity.endDate) {
            builder = "timeLine.dateTimeIntervalStart";
            query[builder] = { $gte: this.data.validity.startDate };
            builder = "timeLine.dateTimeIntervalEnd";
            query[builder] = { $lte: this.data.validity.endDate };
        }

        if (this.data.validity.endDate && !this.data.validity.startDate) {
            query.$or = [];
            let field1 = "timeLine.dateTimeIntervalEnd";
            let field2 = "timeLine.validTillDate";

            query.$or.push({ [field1]: { $lte: this.data.validity.endDate } });
            query.$or.push({ [field2]: { $lte: this.data.validity.endDate } });
        }

        return query;
    }
}

module.exports = CouponFilterService;
