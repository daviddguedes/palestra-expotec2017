const request = require('request');

exports.verify = (req, res, next) => {
    let token = req.headers['x-parse-session-token'];
    let idUserQueSeraAlterado = req.body.objectId;
    let options = {
        url: Parse.serverURL + '/sessions',
        headers: {
            'X-Parse-Application-Id': 'myAppId',
            'X-Parse-REST-API-Key': 'myRestApiKey',
            'X-Parse-Session-Token': token
        }
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let info = JSON.parse(body);
            let user = info.results[0].user;
            if (user.objectId == idUserQueSeraAlterado) {
                next();
            }else {
                let queryRole = new Parse.Query(Parse.Role);
                queryRole.equalTo("name", "admin");
                queryRole.equalTo("users", user);
                queryRole.first().then(admin => {
                    if (admin) {
                        next();
                    } else {
                        res.send({ error: "Seu usuário não tem permissão!" });
                    }
                }, error => {
                    res.send({ error: "Seu usuário não tem permissão!" });
                });
            }
        }else {
            res.send({ error: error });
        }
    })
}