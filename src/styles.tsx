import styled from 'styled-components'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  user-select: none;
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Container = styled.div.attrs(
  ({ delta, leftElementWidth, rightElementWidth }: { delta: number; leftElementWidth: number; rightElementWidth: number }): any => ({
    style: {
      transform: `translateX(${delta}px)`,
      width: `calc(100% + ${leftElementWidth + rightElementWidth}px)`,
    },
  }),
)`
  display: flex;
`

export const SideElementWrapper = styled.div``

export const MainElementWrapper = styled.div`
  width: 100%;
`
