import { useEffect, useRef } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'

import './index.css'

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null)
  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {

    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (

    <>
      <input ref={inputRef} {...rest} />
      {error &&
        (
          <div className="tooltipContainer">
            <FiAlertCircle  size={20} />
            <p className="tooltiptext">{error}</p>
          </div>
        )}
    </>
  )
}
