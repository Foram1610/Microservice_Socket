module.exports = {
    createdBy: {
        path: "createdBy",
        select: "name",
    },

    updatedBy: {
        path: "updatedBy",
        select: "userType",
    },

    selectedClients: {
        path: "availableTo.selectedClient.clientIds",
        select: ["name", "email", "countryCode","mobileNumber"],
    },

    selectedServices: {
        path: "availableToServiceTask.selectedServices",
        select: "name",
        populate: {
            path: "categoryId",
            select: "name",
        },
    },
    selectedTasks: {
        path: "availableToServiceTask.selectedTasks",
        select: "name",
        populate: [{
            path: "serviceId",
            select: "name",
        },
         {
            path: "categoryId",
            select: "name",
        },
        ]
    },
    availableInCountry: {
        path: "location.availableInCountry",
        select: "name",
    },
    availableInGovernorate: {
        path: "location.availableInGovernorate",
        select: "name",
        populate: [
            {
                path: "countryId",
                select: "name",
            },
        ]
    },
    availableInCity: {
        path: "location.availableInCity",
        select: "name",
        populate: [
            {
                path: "governateId",
                select: "name",
            },
            {
                path: "countryId",
                select: "name",
            }
        ]
    },
    availableInDistrict: {
        path: "location.availableInDistrict",
        select: "name",
        populate: [
            {
                path: "cityId",
                select: "name",
            },
            {
                path: "governateId",
                select: "name",
            },
            {
                path: "countryId",
                select: "name",
            },
        ]
    },
};
