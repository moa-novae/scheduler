import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);
  const transition = function(next, bool) {
    setMode(prev => next)
    console.log('1',history)
    setHistory(prev => [...prev, next])
    console.log('2',history)
    if (bool){
      setHistory(prev => [...prev.slice(0, prev.length  - 2), next])
      console.log('3', history);
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