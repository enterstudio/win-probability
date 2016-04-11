# win-probability

> Modeling approach: Locally weighted logistic regression (with the assistance of R's locfit package). It is an extension of the more common LOESS methodology to logistic regression. Logistic regression is more appropriate for modeling probabilities. The smoothing window was calibrated via cross validation. The optimal smoothing window shrank as time remaining in the game approached zero. For the final few seconds of game time, I abandoned regression entirely and built a simple decision tree to calculate the probabilities.


http://www.inpredictable.com/2015/02/updated-nba-win-probability-calculator.html