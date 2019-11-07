import React from 'react';
import './css/layout.css'


const Layout = (props) => {

    

    return (

        <div style={{marginTop:'8%'}}>
        <header>

         Resume Builder

        </header>
    
            {props.children}
      </div>

    )

} 




export default Layout