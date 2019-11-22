let router = require('express').Router()

router.get('/', function (req, res) {
    res.json({
        status: 'API is working!',
        message: 'Welcome this API !'
    })
})
// Export API routes
export default router;