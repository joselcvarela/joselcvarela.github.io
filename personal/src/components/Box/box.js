import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './box.css'

const Box = ({ title, subtitle }) => (
    <div className="box">
        <ReactCSSTransitionGroup
            transitionName="box"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
        >
            <h1>{title}</h1>
            <textarea value={subtitle} readOnly>{subtitle}</textarea>
        </ReactCSSTransitionGroup>
    </div>
)

export default Box