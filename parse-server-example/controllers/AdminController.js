exports.updateUser = (req, res, next) => {
    const body = req.body;

    let query = new Parse.Query(Parse.User);

    query.get(body.objectId).then(x => {
        x.save(body, { useMasterKey: true }).then(xx => {
            res.send({ success: xx });
        }, err => {
            res.send({ error: err });
        });
    }, e => {
        res.send({ error: e });
    }
    );
}