import React from 'react';
import './Button.style.scss';

const Button = props => (
    <button className='myButton' onClick={props.action}>{props.name}</button>
)

export default Button;