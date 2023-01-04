import React from 'react'

const Label = ({ id, children }: { id: string; children: React.ReactNode }) => {
  return <label htmlFor={id}>{children}</label>
}

const TextField = ({ id, label, type = 'text', ...props }: { id: string; label: string; type: string }) => {
  return (
    <div>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} />
    </div>
  )
}

export default TextField
