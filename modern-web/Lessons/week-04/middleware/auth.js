const auth = (req, res, next) => {
    console.log('auth')
    if (!req.user) {
        return res.send("No User Found");
    }
}

module.exports = auth;