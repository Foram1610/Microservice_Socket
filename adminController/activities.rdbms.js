const { Activities } = require('../models/rdbms')

exports.addActivities = async (req, res) => {
    try {
        const ActivityData = { ...req.body }
        const activity = await Activities.create(ActivityData)
        if (!activity) {
            return res.status(400).json({ data: `Activity not inserted!!` })
        }
        else {
            return res.status(200).json({ message: `Activity inserted!!` })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}