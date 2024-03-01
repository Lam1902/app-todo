var configValues = require('./config.json')
module.exports = {
    getConnectionString : function () {
        return `mongodb://localhost:27017/du_lieu`
    }
}
