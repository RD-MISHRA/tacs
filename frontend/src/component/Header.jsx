import React from 'react'

const Header = () => {
    return (
        <div className='header' style={headerStyle}>

           

            <h1>Manage Your Tasks</h1>
        </div>
    )
}

export default Header

const headerStyle = {
    width: '100%',
    lineHeight: '100px',
    backgroundColor: '#1ec52c',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '50px',
    color: 'white',
    boxShadow: '5px 3px 15px -5px rgba(0, 0, 0, 1)',
};
