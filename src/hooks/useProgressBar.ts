import { useEffect, useState } from "react"

type UseProgressBarReturnType = {
  visible: boolean
  progress: number
}

const useProgressBar = (isGenerating: boolean): UseProgressBarReturnType => {
  const [visible, setVisible] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    let progressInterval: number
    let visibleTimeout: number

    console.log(isGenerating)

    if (isGenerating) {
      setProgress(0)
      setVisible(true)
      progressInterval = setInterval(() => {
        setProgress(prevProgress => {
          const nextAddend = Math.floor(Math.random() * 3) + 1
          const nextSum = prevProgress + nextAddend > 98 ? 98 : prevProgress + nextAddend
          return nextSum
        })
      }, Math.floor(Math.random() * (300 - 200 + 1)) + 200)
    } else {
      setProgress(100)
      visibleTimeout = setTimeout(() => {
        setVisible(false)
      }, 500)
    }

    return () => {
      clearInterval(progressInterval)
      clearTimeout(visibleTimeout)
    }
  }, [isGenerating])

  return {
    visible,
    progress
  }
}

export default useProgressBar
