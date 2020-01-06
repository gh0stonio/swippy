import React from 'react'

export const LeftElement = ({ opacity }: { isActive: boolean; opacity: number }) => (
  <div style={{ backgroundColor: 'blue', opacity, height: '100%', width: '150px' }}>left</div>
)
export const MainElement = () => <div style={{ backgroundColor: 'red', height: '80px' }}>main</div>
export const RightElement = ({ isActive, opacity }: { isActive: boolean; opacity: number }) => (
  <div style={{ backgroundColor: isActive ? 'yellow' : 'grey', opacity, height: '100%', width: '150px' }}>right</div>
)
