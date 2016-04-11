var io = require('indian-ocean')
var _ = require('lodash')
var d3 = require('d3')
var request = require('request')
var queue = require('queue-async')

var q = queue(1)
var rootDir = __dirname + '/../'
var config = io.readDataSync(rootDir + 'config.json')


var region = 'na'
var queue = 'TEAM_BUILDER_DRAFT_RANKED_5x5'
var season = 'SEASON2016'


var challenger = io.readDataSync(rootDir + 'raw/challenger.json')
var master = io.readDataSync(rootDir + 'raw/master.json')
master.entries.concat(challenger.entries)
  .forEach(d => q.defer(download, d.playerOrTeamId))

function download(id, cb){
  var url = 'https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/' 
    + id 
    + '?rankedQueues=' + queue
    + '&seasons=' + season
    + '&api_key=' + config.key

  request(url, function (err, res, body) {
    setTimeout(cb, 1250)
    if (!err && res.statusCode == 200) {
      try{
        var path = rootDir + '/raw/player-history/' + id + '.json'
        io.writeDataSync(path, JSON.parse(body))
      } catch (e){
        console.log(e, body)
      }
    } else{
      console.log(err ? err : res.statusCode, url)
    }
  })

}


