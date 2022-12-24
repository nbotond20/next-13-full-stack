import React from 'react'

const Label = ({ id, children }) => {
  return <label htmlFor={id}>{children}</label>
}

const TextField = ({ id, label, type = 'text', ...props }) => {
  return (
    <div>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} />
    </div>
  )
}

export default TextField
