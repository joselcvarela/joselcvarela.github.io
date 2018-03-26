import React from 'react'
import './contacts.css'

const Contacts = () => (
    <div className="contacts">
        <h1>Contacts</h1>
        <div className="row">
            <a href="https://linkedin.com/in/joselcvarela/" target="_blank" rel="noopener noreferrer">
                <i className="linkedin"></i>
            </a>

            <a href="https://github.com/joselcvarela" target="_blank" rel="noopener noreferrer">
                <i className="github"></i>
            </a>

            <a href="mailto:joselcvarela@gmail.com">
                <i className="mail"></i>
            </a>
        </div>
    </div>
)

export default Contacts