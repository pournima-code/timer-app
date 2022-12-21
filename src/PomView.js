import { useEffect, useRef, useState } from 'react'


const PomView = () => {
  const [timer, setTimer] = useState(1500) // 25 minutes
  const [start, setStart] = useState(false)
  const firstStart = useRef(true)
  const tick = useRef()

  useEffect(() => {
    if (firstStart.current) {
      console.log("first render, don't run useEffect for timer")
      firstStart.current = !firstStart.current
      return
    }

    console.log('subsequent renders')
    console.log(start)
    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1)
      }, 1000)
    } else {
      console.log('clear interval')
      clearInterval(tick.current)
    }

    return () => clearInterval(tick.current)
  }, [start])

  const toggleStart = () => {
    setStart(!start)
  }

  const dispSecondsAsMins = (seconds) => {
    // 25:00
    console.log('seconds ' + seconds)
    const mins = Math.floor(seconds / 60)
    const seconds_ = seconds % 60
    return mins.toString() + ':' + (seconds_ == 0 ? '00' : seconds_.toString())
  }

  return (
    <div className="pomView">
      <h1>{dispSecondsAsMins(timer)}</h1>
      <div className="startDiv">
        {/* event handler onClick is function not function call */}
        <button className="startBut" onClick={toggleStart}>
          {!start ? 'START' : 'STOP'}
        </button>
        {/* {start && <AiFillFastForward className="ff" onClick="" />} */}
      </div>
    </div>
  )
}

export default PomView;