import React, { useRef, useState, useEffect, MouseEventHandler, useCallback } from 'react'

import { Container, Wrapper, MainElementWrapper, SideElementWrapper } from './styles'

type Props = {
  mainElement: React.ReactElement
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
  const [rightWidth, setRightWidth] = useState(0)
  const [isLeftActive, setIsLeftActive] = useState(false)
  const [isRightActive, setIsRightActive] = useState(false)

  const leftEl = useRef<HTMLDivElement>(null)
  const rightEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (rightEl.current) setRightWidth(rightEl.current.clientWidth)
    if (leftEl.current) {
      setLeftWidth(leftEl.current.clientWidth)
      setStartDelta(-leftEl.current.clientWidth)
      setDelta(-leftEl.current.clientWidth)
    }
  }, [])

  const handleStart = useCallback((clientX: number) => {
    setStartX(clientX)
    setIsTouched(true)
  }, [])
  const handleMove = useCallback(
    (clientX: number) => {
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
    },
    [isTouched, startDelta, startX, rightWidth, leftWidth, isLeftActive, isRightActive],
  )
  const handleEnd = useCallback(() => {
    if (isLeftActive && leftAction) leftAction()
    if (isRightActive && rightAction) rightAction()

    setStartX(0)
    setDelta(startDelta)
    setIsTouched(false)
    setIsLeftActive(false)
    setIsRightActive(false)
  }, [isLeftActive, isRightActive, leftAction, rightAction, startDelta])

  const onMouseDown: MouseEventHandler = useCallback(mouseDownEvent => handleStart(mouseDownEvent.clientX), [handleStart])
  const onMouseMove: MouseEventHandler = useCallback(mouseDownEvent => handleMove(mouseDownEvent.clientX), [handleMove])
  const onTouchMove = useCallback((touchStartEvent: TouchEvent) => handleMove(touchStartEvent.targetTouches[0].clientX), [handleMove])
  const onTouchStart = useCallback((touchStartEvent: TouchEvent) => handleStart(touchStartEvent.targetTouches[0].clientX), [
    handleStart,
  ])

  return (
    <Wrapper>
      <Container
        delta={delta}
        leftElementWidth={leftWidth}
        rightElementWidth={rightWidth}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleEnd}
      >
        {renderLeftElement && <SideElementWrapper ref={leftEl}>{renderLeftElement(isLeftActive)}</SideElementWrapper>}
        <MainElementWrapper>{mainElement}</MainElementWrapper>
        {renderRightElement && <SideElementWrapper ref={rightEl}>{renderRightElement(isRightActive)}</SideElementWrapper>}
      </Container>
    </Wrapper>
  )
}

export default Swippy
