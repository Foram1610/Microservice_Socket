
module.exports = {
    addPaymentMethods: async (req, res) => {
        res.status(400).json({
            status:"failure",
            statusCode:400,
            message:"Not Added"
        })
    }
}