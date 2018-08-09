import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoading } from './actions/dataActions';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      history: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHistory = this.handleHistory.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.job = React.createRef();
    this.place = React.createRef();
    this.search_resultat = React.createRef();
  }

  componentWillMount(){
    this.props.isLoading(true);
    const job = (this.props.url).match(new RegExp("job=" + "(.*)" + "&"))[1];
      const place = (this.props.url).match(new RegExp("&place=" + "(.*)" + ""))[1];
      var c = 0;
      if(place.split(',').length == 2){
        var country = (place.split(',')[0]).trim();
        var city = (place.split(',')[1]).trim();
      }else if(place.split(',').length == 1){
        var city = (place.split(',')[0]).trim();
        c = 1;
      }else{
        var city = place.trim();
        c = 2;
      }
      if(!city){
        var city = '';
        c = 2;
      }
      if(!country){
        var country = '';
      }
    fetch('/api/getworkers', {
        method:'post',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.getElementById('csrf-token').content
        },
        body: JSON.stringify({job: job, country: country, city: city, c: c})
      })
      .then(res => res.json())
      .then(data => {
        this.setState({workers: data});
        if(job || place){
          this.setState({history: [{job: job, place: place, workers: data}]});
        }
        this.props.isLoading(false);
      });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.isLoading(true);
    this.props.history.push('/search/job='+this.job.current.value+'&place='+this.place.current.value);

      var job = this.job.current.value;
      var place = this.place.current.value;
      var c = 0, city = '';
      if(place.split(',').length == 2){
        var country = (place.split(',')[0]).trim();
        var city = (place.split(',')[1]).trim();
      }else if(place.split(',').length == 1){
        var city = (place.split(',')[0]).trim();
        c = 1;
      }else{
        var city = place.trim();
        c = 2;
      }
      if(!city){
        var city = '';
        c = 2;
      }
      if(!country){
        var country = '';
      }

    fetch('/api/getworkers', {
        method:'post',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.getElementById('csrf-token').content
        },
        body: JSON.stringify({job: job, country: country, city: city, c: c})
      })
      .then(res => res.json())
      .then(data => {
        this.props.isLoading(false);
        this.setState({workers: data});
        if(job || place){
          this.setState({history: (this.state.history).concat({job: job, place: place, workers: data})});
        }
      });
  }

  handleHistory({target}){
    var data = this.state.history[Number(target.getAttribute('data'))]

    this.props.history.push('/search/job='+data.job+'&place='+data.place);
    this.setState({workers: data.workers});
  }
  handleLoading(){
    this.props.isLoading(true);
  }

    render() {
      var listItems = (this.state.workers).map((d, i) =>
        <div className="conditat" key={'worker'+i}>
         <Link onClick={this.handleLoading} to={'/'+d.username}>
          <div className="img" style={{backgroundImage: 'url(/storage/images/'+d.user_img+')'}} ></div>
          <div className="pro_name">
            <span>{d.profesion}</span>
            <span>{d.country + ', ' + d.city}</span>
          </div>
          <div className="votes">
            <div>
              <i className="fas fa-thumbs-up"></i>
              <span className="numbers">{d.thumbs_up}</span>
            </div>
            <div>
              <i className="fas fa-thumbs-down"></i>
              <span className="numbers">{d.thumbs_down}</span>
            </div>
          </div>
         </Link>
        </div>);

      var historyItems = (this.state.history).map((d, i) =>
        <div className="h_items" key={'h_items'+i}>
          <span onClick={this.handleHistory} data={i}>{d.job + ' '+ d.place}</span>
        </div>);


        return (
            <div className="worker_search_mini">
              <div className="search-history_tag" >
                <div className="history"><div className="workers_l">{this.state.workers.length+" resultat"}</div></div>
                <div className="history">{historyItems}</div>
              </div>
              <div className="wrapper">
               <div className="search_worker">
                 <form onSubmit={this.handleSubmit} >
                   <input ref={this.job} type="text" name="job" placeholder="job or worker name" />
                   <input ref={this.place} type="text" name="place" placeholder="Ex: France, Paris" />
                   <button id="start_search">Search</button>
                 </form>
               </div>
               <div className="search_resultat" ref={this.search_resultat} > {listItems} </div>
              </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    params: ownProps,
    loading: state.datas.loading
});


export default withRouter(connect(mapStateToProps, { isLoading })(Search));
