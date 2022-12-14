

module.exports = {
    create
}

//using hoisting on this function declaration
function create(req, res) {
    //Baby step ....
    res.json({
        user: {
            name: req.body.name,
            email: req.body.email
        }
    })
}