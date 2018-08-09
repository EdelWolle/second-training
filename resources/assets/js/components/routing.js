import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoading, noMatch } from './actions/dataActions';

import Nav from './nav';
import Workersearch from './workersearch';
import Footer from './footer';
import Profil from './profil';
import NoMatch from './nomatch';
import Search from './search';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiledata: {},
      loading: true,
      no_match: false
    };

  }

  componentWillMount(){
    this.props.isLoading(true);
  }
  
    render() {
        return (
            <Router>
            <div className="layout_desktop">
            <Nav />
              <Switch>
                <Route exact path="/search/:id" render={({match})=>{
                  return(
                    <React.Fragment>
                      <Search url={match.params.id} />
                    </React.Fragment>
                  );
                }} />
                <Route exact path="/" component={Workersearch} />
                <Route exact path="/:id" render={({match}) =>{
                  return(
                    <React.Fragment>
                      {(this.props.match ? <Profil id={match.params.id} /> : <NoMatch />)}
                    </React.Fragment>
                  );
                }}/>
              </Switch>
              <Footer />
            </div>
            </Router>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    params: ownProps,
    loading: state.datas.loading,
    match: state.datas.match
});


export default connect(mapStateToProps, { isLoading, noMatch })(Main);