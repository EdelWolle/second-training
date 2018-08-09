import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSession, isLoading } from './actions/dataActions';

class Nav extends Component {
    componentWillMount(){
        this.props.fetchSession();
    }

    render() {
        const user_img_style = {
            backgroundImage: 'url(storage/images/'+this.props.sessiondata['user_img']+')'
        };
        return (
            <header className="header">
               <nav className="main_menu">
                 <ul className="desktop_items">
                 	<li>
                 		<Link to="/">Hire</Link>
                 	</li>
                 </ul>

                {
                    this.props.loading ? (<div className="lds-css ng-scope"><div className="lds-eclipse"><div></div></div></div>) : ""
                }

                 <ul className="desktop_items">
                  {this.props.sessiondata['username'] != '' ? (
                 	<li className="nav-item dropdown">
                        <a id="navbarDropdown" className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span style={user_img_style} className="mini_user_img"></span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                          <li>
                              <Link className="dropdown-item" to={"/"+this.props.sessiondata['username']}>Profile</Link>
                          </li>
                          <li className="list_bar"></li>
                          <li>
                              <a className="dropdown-item" href="/logout"
                                onClick={()=>{
                                    event.preventDefault();
                                    document.getElementById('csrf-token-input').value = document.getElementById('csrf-token').content;
                                    document.getElementById('logout-form').submit();
                                }}>
                                Logout 
                              </a>

                              <form id="logout-form" action="/logout" method="POST" style={{display: 'none'}}>
                                <input type="hidden" name="_token" id="csrf-token-input" />
                              </form>
                          </li>
                        </ul>
                    </li>
                    )
                  :
                  <li>
                      <a href="/login">Login</a>
                  </li>
                }
                 </ul>
               </nav>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    sessiondata: state.datas.session,
    params: ownProps,
    loading: state.datas.loading
});


export default connect(mapStateToProps, { fetchSession, isLoading })(Nav);