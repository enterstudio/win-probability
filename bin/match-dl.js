var io = require('indian-ocean')
var _ = require('lodash')
var d3 = require('d3')
var request = require('request')
var queue = require('queue-async')

var q = queue(1)
var rootDir = __dirname + '/../'
var playerDir = rootDir + '/raw/player-history/'
var matchDir  = rootDir + '/raw/matches/'
var config = io.readDataSync(rootDir + 'config.json')


var gameIds = new Set()

io.readdirIncludeSync(playerDir, 'json')
  .forEach(file =>
    io.readDataSync(playerDir + file).matches
      .forEach(d => 
        gameIds.add(d.matchId)))

console.log(gameIds.size)



var prevMatchIds = io.readdirIncludeSync(matchDir, 'json')
var isDownloadedMatch = d3.nest()
    .key(function(d){ return _.last(d.split('/')).replace('.json', '') })
    .map(prevMatchIds)

gameIds.forEach(function(id){
  if (isDownloadedMatch[id]) return
  q.defer(download, id)
})    


function download(id, cb){
  setTimeout(cb, 1250)

  var url = 'https://na.api.pvp.net/api/lol/na/v2.2/match/' 
    + id 
    + '?includeTimeline=true'
    + '&api_key=' + config.key

  request(url, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      try{
        var path = matchDir + id + '.json'
        io.writeDataSync(path, JSON.parse(body))
      } catch (e){
        console.log(e, body)
      }
    } else{
      console.log(err ? err : res.statusCode, url)
    }
  })

}
