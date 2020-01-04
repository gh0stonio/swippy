import styled from 'styled-components'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Wrapper = styled.div.attrs(({ width }: { width?: number }): any => ({
  style: {
    width: `${width}px` || '100%',
  },
}))`
  height: 100%;
  overflow: hidden;
  user-select: none;
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Container = styled.div.attrs(({ delta }: { delta: number }): any => ({
  style: {
    transform: `translateX(${delta}px)`,
  },
}))`
  display: flex;
  width: 100%;
`
