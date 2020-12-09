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

        this.app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json())

        let routes = require('require-all')({
            dirname: await path.join(__dirname, "routes"),
            recursive: false
        });
        for(let route of Object.values(routes)){
            route = new route(this.database.models);
            this.app.use(route.defaultPath, route.init());
        }

        this.app.listen(this.port)
    }
}
