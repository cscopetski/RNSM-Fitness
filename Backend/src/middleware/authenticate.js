/*
    TODO: Possible add a check for req.host to make sure it comes from the right host location?
*/

const authCheck = (req, res, next) => {
    if (req.user === undefined) {
        console.log("User is not authenticated");
        return res.status(403).send("Not Authenticated");
    }
    next();
}

export default authCheck;