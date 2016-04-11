queue()
.defer(d3.json, 'data/example-match.json')
.defer(d3.json, 'data/example-player.json')
.defer(d3.csv, 'data/frames.csv')
.awaitAll(function(err, res) {
  match  = res[0]
  player = res[1]
  frames = res[2]

  // var firstWon = match.teams[0].winner

  // frames = match.timeline.frames.map(function(d, i){
  //   var firstGold = 
  //       d.participantFrames[1].totalGold
  //     + d.participantFrames[2].totalGold
  //     + d.participantFrames[3].totalGold
  //     + d.participantFrames[4].totalGold
  //     + d.participantFrames[5].totalGold

  //   var secoundGold = 
  //       d.participantFrames[6].totalGold
  //     + d.participantFrames[7].totalGold
  //     + d.participantFrames[8].totalGold
  //     + d.participantFrames[9].totalGold
  //     + d.participantFrames[10].totalGold
    
  //   var wGold =  firstWon ? firstGold : secoundGold
  //   var lGold = !firstWon ? firstGold : secoundGold

  //   return {i: i, wGold: wGold, lGold: lGold}
  // })


  frames.forEach(function(d){d.dif = d.wGold - d.lGold })


  byBlock = d3.nest()
      .key(function(d){ return Math.abs(Math.round(d.dif/100))*100 + '-' + d.i })
      .entries(frames)

  byBlock.forEach(function(d){
    d.i = d.values[0].i
    d.dif = +d.key.split('-')[0]
    d.wTotal = d3.sum(d.values, function(d){ return d.dif > 0 ? 1 : d.dif == 0 ? .5 : 0 })
    d.total  = d.values.length
    d.percent = d.wTotal/d.total
  })

  c = d3.conventions({height: 800, width: 600})

  c.x.domain([0, 45])
  c.y.domain([0, 10000])

  c.drawAxis()

  var opacity = d3.scale.linear().domain([0, 1])
  var color = d3.scale.linear().domain([.5, .9]).range(['green', 'red'])

  var r = d3.scale.sqrt().domain([0, 1000, 1000000]).range([0, 8, 8])
  var strokeWidth = d3.scale.sqrt().domain([2, 1000, 1000000]).range([0, 5, 5])

  // c.svg.dataAppend(byBlock, 'circle')
  //     .translate(function(d){ return [c.x(d.i), c.y(d.dif)] })
  //     .attr('r', ƒ('total', r))
  //     // .style('opacity', ƒ('percent', opacity))
  //     .style('fill', ƒ('percent', color))
  //     .call(d3.attachTooltip)

  c.svg.dataAppend(byBlock, 'path.rate')
      .translate(function(d){ return [c.x(d.i), c.y(d.dif)] })
      .attr('d', function(d){
        var a = (d.percent - .5)*Math.PI
        return 'M-0,0L' + 15*Math.cos(a) + ',' + -15*Math.sin(a) })
      .style('stroke', 'black')
      // .style('opacity', ƒ('percent', opacity))
      .style('fill', ƒ('percent', color))
      .call(d3.attachTooltip)
      .style('stroke-width', ƒ('total', strokeWidth))

})