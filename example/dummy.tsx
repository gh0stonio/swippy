import React from 'react'

export const LeftElement = ({ isActive }: { isActive: boolean }) => (
  <div style={{ backgroundColor: isActive ? 'blue' : 'grey', height: '100%', width: '150px' }}>left</div>
)
export const MainElement = () => <div style={{ backgroundColor: 'red', height: '80px' }}>main</div>
export const RightElement = ({ isActive }: { isActive: boolean }) => (
  <div style={{ backgroundColor: isActive ? 'yellow' : 'grey', height: '100%', width: '150px' }}>right</div>
)
