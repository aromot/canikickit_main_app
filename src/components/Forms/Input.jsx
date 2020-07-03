import React, { useRef } from 'react';


const Input = ({type='text', children, name, value, error, onChange}) => {

  const ref = useRef();

  const cn = ['form-group'];
  error && cn.push('error');

  const _onChange = e => {
    onChange(e);
    ref.current.classList.remove('error');
  }

  return (
    <div className={cn.join(' ')} ref={ref}>
      <label>{children}</label>
      <input name={name} value={value} type={type} className="form-control" onChange={_onChange} />
      {error && <div className="form-validation-error">{error}</div>}
    </div>
  )
};

export default Input;