
export const initialState = {
  cells: [], // {label :: "off" | "WAIT" | "TAP", countdown :: Number | Null, index :: Number}
  level: 1,
  levelComplete: false,
  startingMessage: true,
  gameIsLose: false,
  gameIsPassed: false,
  score: 0,
  best: 0
}
