# win-probability

> Modeling approach: Locally weighted logistic regression (with the assistance of R's locfit package). It is an extension of the more common LOESS methodology to logistic regression. Logistic regression is more appropriate for modeling probabilities. The smoothing window was calibrated via cross validation. The optimal smoothing window shrank as time remaining in the game approached zero. For the final few seconds of game time, I abandoned regression entirely and built a simple decision tree to calculate the probabilities.

http://www.inpredictable.com/2015/02/updated-nba-win-probability-calculator.html


Get list of challenger player ids, save to `raw/challenger.json` and `raw/master.json`

> https://na.api.pvp.net/api/lol/na/v2.5/league/challenger?type=RANKED_SOLO_5x5&api_key=tktk
> https://na.api.pvp.net/api/lol/na/v2.5/league/master?type=RANKED_SOLO_5x5&api_key=tktk


Download each challenger's match history to `raw/player-history/`

https://developer.riotgames.com/api/methods#!/1069/3683

> https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/72680640?rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5&seasons=SEASON2016&api_key=tktk
> node bin/player-history-dl.js

Download each match's timeline