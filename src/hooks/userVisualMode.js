import { useState } from 'react';

//functions responsible for keeping track of display mode of each appointment slot
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);
  const transition = function(next, bool) {
    setMode(prev => next)
    setHistory(prev => [...prev, next])
    //if bool true, delete the mode before the current one from mode history
    if (bool){
      setHistory(prev => [...prev.slice(0, prev.length  - 2), next])
    }
  }
  const length = history.length - 2
  const back = function() {
    if (length >= 0) {
      setMode(prev => history[length])
      const newArr = history.slice(0, length + 1)
      setHistory(prev => newArr)
    } else {
      setMode(prev => history[0])
    }
  }
  return { mode, transition, back };
}