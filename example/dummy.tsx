/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export const LeftElement = ({ isActive }: any) => (
  <div style={{ backgroundColor: isActive ? 'blue' : 'grey', height: '100%', width: '150px' }}>left</div>
)
export const MainElement = () => <div style={{ backgroundColor: 'red', height: '80px', width: '500px' }}>main</div>
export const RightElement = ({ isActive }: any) => (
  <div style={{ backgroundColor: isActive ? 'yellow' : 'grey', height: '100%', width: '150px' }}>right</div>
)
