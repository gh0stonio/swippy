import styled from 'styled-components'

export const Wrapper = styled.div.attrs(({ width }: { width?: number }): any => ({
  style: {
    width: `${width}px` || '100%',
  },
}))`
  height: 100%;
  overflow: hidden;
  user-select: none;
`

export const Container = styled.div.attrs(({ delta }: { delta: number }): any => ({
  style: {
    transform: `translateX(${delta}px)`,
  },
}))`
  display: flex;
  width: 100%;
`
