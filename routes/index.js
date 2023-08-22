require("../passport");
//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger');
const ejs = require('ejs');
const adminController = require("../adminController/adminController");
let express = require('express');
let app = express();
let user = require("./customer/users");
let customerTask = require("./customer/task");
let customerTimeslot = require("./customer/timeslot");
let provider = require("./provider/provider");
let language = require("./admin/language");
let admin = require("./admin/admin");
let adminUser = require("./admin/user.js");
let adminProvider = require("./admin/provider.js");
let page = require("./admin/contentPages");
let region = require("./admin/regions");
let category = require("./admin/category");
let task = require("./admin/task");
let offer = require("./admin/offer");
let service = require("./admin/service");

let timeSlot = require("./admin/timeSlot");
let warranty = require("./admin/warranty");
let insurance = require("./admin/insurance");
let dashboard = require("./admin/dashboard");
let coupon = require("./admin/coupon");
let systemSetting = require("./admin/systemSetting");

app.use("/api/v1/user", user);

app.use("/api/v1/provider", provider);

app.use("/api/v1/user/task", customerTask);

app.use("/api/v1/user/timeSlot", customerTimeslot);
//admin routes
app.use("/api/v1/admin", admin);

app.use("/api/v1/admin/dashboard", dashboard);

app.use("/api/v1/admin/user", adminUser);

app.use("/api/v1/admin/provider", adminProvider);

app.use("/api/v1/admin/language", language);

app.use("/api/v1/admin/country", admin);

app.use("/api/v1/admin/governate", admin);

app.use("/api/v1/admin/city", admin);

app.use("/api/v1/admin/district", admin);

app.use("/api/v1/admin/region", region);

app.use("/api/v1/admin/category", category);

app.use("/api/v1/admin/task", task);

app.use("/api/v1/admin/offer", offer);

app.use("/api/v1/admin/timeSlot", timeSlot);

app.use("/api/v1/admin/warranty", warranty);

app.use("/api/v1/admin/insurance", insurance);

app.use("/api/v1/admin/service", service);

app.use("/api/v1/admin/pages", page);

app.use("/api/v1/admin/coupon", coupon);

app.use("/api/v1/admin/systemSetting", systemSetting);

app.get("/", function (req, res) {
    return res.json({
        status: "failure",
        message: "This Url is invalid"
    })
});

app.use('/api-docs', swaggerUi.serve);
app.post('/swaggerLogin', adminController.swaggerLogin)
app.get('/api-docs',
    function (req, res, next) {

        ejs.renderFile('views/swaggerAuth.ejs').then(templateData => {
            if (req.session.loggedin) {
                next();
            } else {
                res.send(templateData)
            }

        }).catch(err => { // NOSONAR
            console.log(err.message)
        })
    },
    swaggerUi.setup(swaggerDocument));

module.exports = app;