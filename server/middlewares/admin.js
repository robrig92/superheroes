
const validateAdmin = (req, res, next) => {
    if (!req.sessionUser.user.isAdmin) {
        return res.status(403).json({ err: 'Unauthorized'});
    }

    next();
}

module.exports = {
    validateAdmin
}
