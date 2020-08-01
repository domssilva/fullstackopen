import React from 'react'

const Footer = () => {

    const footerCSS = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
    }

    return (
        <footer style={footerCSS}>
            <br/>
            <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
        </footer>
    )
}

export default Footer
