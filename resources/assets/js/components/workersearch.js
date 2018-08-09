import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoading } from './actions/dataActions';

class Workersearch extends Component {
  constructor(props) {
    super(props);


    this.handleSubmit = this.handleSubmit.bind(this);
    this.job = React.createRef();
    this.place = React.createRef();
  }

  componentWillMount(){
        this.props.isLoading(false);
    }

  handleSubmit(e){
    e.preventDefault();

    this.props.history.push('/search/job='+this.job.current.value+'&place='+this.place.current.value);
  }
    render() {
        return (
            <div className="worker_search">
               <div className="marque_name">
                   <h2>Logo Place</h2>
               </div>

               <div className="search_worker">
                 <form onSubmit={this.handleSubmit} >
                   <input ref={this.job} type="text" name="job" placeholder="job or worker name" />
                   <input ref={this.place} type="text" name="place" placeholder="Ex: France, Paris" />
                   <button id="start_search">Search</button>
                 </form>
               </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    params: ownProps,
    loading: state.datas.loading
});


export default withRouter(connect(mapStateToProps, { isLoading })(Workersearch));
