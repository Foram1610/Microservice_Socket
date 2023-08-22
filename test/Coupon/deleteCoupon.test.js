const request = require("supertest");
const testToken = require("./data/testToken.json");
const baseUrl = "localhost:5000/";
const deleteCouponEndPoint = "api/v1/admin/coupon/deleteCoupon/";
const correctAddCouponBody = require("./data/createCouponData.json");
const { MongoClient } = require("mongodb");
describe("Test the add coupon API", () => {
    let connection;
    let db;

    beforeAll(async () => {
        const DB_URI =
            "mongodb+srv://Alista_dev_db_user:cguGT661Y81ulhTY@alistadevmongodb.u28ri.mongodb.net/ALISTADEVMongoDB?authSource=admin&replicaSet=atlas-8shybb-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
        connection = await MongoClient.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db("ALISTADEVMongoDB");
    });

    afterAll(async () => {
        await connection.close();
    });
    test("return 401 if token is not available in header", async () => {
        const coupon = db.collection("coupons");
        const firstCoupon = await coupon.findOne();

        if (!firstCoupon) {
            //create a coupon
            db.collection("coupons").insertOne(correctAddCouponBody);
        }
        let couponId = firstCoupon._id;

        const response = await request(baseUrl).delete(
            deleteCouponEndPoint + couponId
        );

        expect(response.statusCode).toBe(401);
    });

    test("It should response 200 to the DELETE method valid data", async () => {
        const coupon = db.collection("coupons");
        const firstCoupon = await coupon.findOne();

        if (!firstCoupon) {
            //create a coupon
            db.collection("coupons").insertOne(correctAddCouponBody);
        }
        let couponId = firstCoupon._id;

        const response = await request(baseUrl)
            .delete(deleteCouponEndPoint + couponId)
            .set("token", testToken.token);

        expect(response.statusCode).toBe(200);
    });
});
