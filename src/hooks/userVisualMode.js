import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);
  const transition = function(next, bool) {
    setMode(prev => next)
    setHistory(prev => [...prev, next])
    if (bool){
      setHistory(prev => [history[0]])
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