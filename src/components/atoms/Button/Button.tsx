import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}
const Button = ({ children, onClick, variant = 'primary', size = 'medium', disabled = false, className = '', style = {} }: ButtonProps) => {
  const buttonClasses = `button ${variant} ${size} ${disabled ? 'disabled' : ''} ${className}`.trim()

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button className={buttonClasses} type="button" onClick={handleClick} disabled={disabled} style={{ ...style }}>
      {children}
    </button>
  )
}

export default Button