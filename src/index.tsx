import React, { useRef, useState, useEffect, MouseEventHandler } from 'react'

import { Container, Wrapper } from './styles'

type Props = {
  mainElement: React.ComponentType
  leftAction?: () => void
  rightAction?: () => void
  renderLeftElement?: (isActive: boolean) => React.ReactElement
  renderRightElement?: (isActive: boolean) => React.ReactElement
}

const Swippy: React.FC<Props> = ({ mainElement, leftAction, rightAction, renderLeftElement, renderRightElement }) => {
  const [startDelta, setStartDelta] = useState(0)
  const [startX, setStartX] = useState(0)
  const [delta, setDelta] = useState(0)
  const [isTouched, setIsTouched] = useState(false)

  const [leftWidth, setLeftWidth] = useState(0)
  const [mainWidth, setMainWidth] = useState(0)
  const [rightWidth, setRightWidth] = useState(0)
  const [isLeftActive, setIsLeftActive] = useState(false)
  const [isRightActive, setIsRightActive] = useState(false)

  const leftEl = useRef<HTMLDivElement>(null)
  const mainEl = useRef<HTMLDivElement>(null)
  const rightEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mainEl.current) setMainWidth(mainEl.current.clientWidth)
    if (rightEl.current) setRightWidth(rightEl.current.clientWidth)
    if (leftEl.current) {
      setLeftWidth(leftEl.current.clientWidth)
      setStartDelta(-leftEl.current.clientWidth)
      setDelta(-leftEl.current.clientWidth)
    }
  }, [])

  const handleStart = (clientX: number) => {
    setStartX(clientX)
    setIsTouched(true)
  }
  const handleMove = (clientX: number) => {
    if (!isTouched) return

    let newDelta = startDelta + (clientX - startX)

    // TODO: compute active based on percent displayed ?
    if (newDelta > 0) {
      newDelta = 0
      if (!isLeftActive) setIsLeftActive(true)
    } else if (newDelta < -(rightWidth + leftWidth)) {
      newDelta = -(rightWidth + leftWidth)
      if (!isRightActive) setIsRightActive(true)
    } else {
      setIsLeftActive(false)
      setIsRightActive(false)
    }

    setDelta(newDelta)
  }
  const handleEnd = () => {
    if (isLeftActive && leftAction) leftAction()
    if (isRightActive && rightAction) rightAction()

    setStartX(0)
    setDelta(startDelta)
    setIsTouched(false)
    setIsLeftActive(false)
    setIsRightActive(false)
  }

  const onMouseDown: MouseEventHandler = mouseDownEvent => handleStart(mouseDownEvent.clientX)
  const onMouseMove: MouseEventHandler = mouseDownEvent => handleMove(mouseDownEvent.clientX)
  const onTouchStart = (touchStartEvent: TouchEvent) => handleStart(touchStartEvent.targetTouches[0].clientX)
  const onTouchMove = (touchStartEvent: TouchEvent) => handleMove(touchStartEvent.targetTouches[0].clientX)

  return (
    <Wrapper width={mainWidth}>
      <Container
        delta={delta}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleEnd}
      >
        {renderLeftElement && <div ref={leftEl}>{renderLeftElement(isLeftActive)}</div>}
        <div ref={mainEl}>{mainElement}</div>
        {renderRightElement && <div ref={rightEl}>{renderRightElement(isRightActive)}</div>}
      </Container>
    </Wrapper>
  )
}

export default Swippy
