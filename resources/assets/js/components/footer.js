import React, { Component } from 'react';



class Footer extends Component {
    render() {
        return (
            <div className="footer">
               <footer>
                   <small>
                       © {(new Date().getFullYear())} website<span></span><a href="#">Cookies, Privacy and Terms</a>
                   </small>
               </footer>
            </div>
        );
    }
}
export default Footer;