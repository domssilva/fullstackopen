import React from 'react'

const Message = ({ message }) => {

    const css = {
        border: '3px solid green',
        color: 'green',
        fontSize: '16px',
        backgroundColor: '#bbbbbb',
        margin: '1rem 2rem',
        padding: '.8rem',
        borderRadius: '10px',
        textTransform: 'capitalize',
    }

    if (message === null) {
        return null
    }

    return (
        <p className='message' style={css}>
            {message}
        </p>
    )
}

export default Message
