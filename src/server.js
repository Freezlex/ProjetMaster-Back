const path = require('path');
let bodyParser = require('body-parser')

module.exports = class Server {
    constructor(port, app) {
        this.port = port
        this.app = app;
        this.database = null;
    }

    async core(database, chemin){
        this.database = await database.init(chemin)

        this.app
            .use(bodyParser.urlencoded({ extended: false }))
            .use(bodyParser.json())
            .use(function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        })

        let routes = require('require-all')({
            dirname: await path.join(__dirname, "routes"),
            recursive: false
        });
        for(let route of Object.values(routes)){
            route = new route(this.database.models);
            this.app.use(route.defaultPath, route.init());
        }

        this.app.use('*', async (req, res) => {
            console.log(req);
            res.status(404).json({err: `${req.baseUrl} route don't exist`, res: null});
        })

        this.app.listen(this.port)
    }
}
