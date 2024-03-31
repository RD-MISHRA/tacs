// import React from 'react'

// const Footer = () => {
//     let year = new Date().getFullYear();
//     return (
//         <footer>
//             <p>copyright © {year}</p>
//         </footer>
//     )
// }

// export default Footer



import React from 'react';

const Footer = () => {
    let year = new Date().getFullYear();
    return (
        <footer style={footerStyle}>
            <h3>Keep Note © {year}</h3>
        </footer>
    );
};

export default Footer;


const footerStyle = {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: '#f5ba13',
    color: 'white',
    textAlign: 'center',
    marginTop: '20px',
    padding: '10px',

};