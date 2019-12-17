import * as R from '@paqmind/ramda'

export const isGameInProgress = R.compose(
  R.all(R.equals(R.F())),
  R.values,
  R.pick([
    'gameIsLose',
    'levelComplete',
    'gameIsPassed',
    'startingMessage'
  ])
)

export const isLevelCompleted = R.propEq(
  'levelComplete',
  R.T()
)

export const getBestScoreFromVkStorage = R.pipe(
  R.prop('keys'),
  R.find(R.propEq('key', 'switchBest')),
  R.prop('value'),
  Number,
  R.defaultTo(0)
)
