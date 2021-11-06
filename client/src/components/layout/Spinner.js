import React from 'react'
import spinner from '../../img/spinner.gif'

const Spinner = () => {
    return (
        <>
            <img src={spinner} alt="spinner for loading" style={{ width: 200, margin: 'auto', display: 'block' }} />
        </>
    )
}

export default Spinner
