import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSession, isLoading, noMatch } from './actions/dataActions';

import Editor from './profilComponent/editor';


class Profil extends Component {
	constructor(props) {
    super(props);
    this.state = {
      backgroundwidth: 0,
      main_window: false,
      profiledata: {
        username: '',
        first_name: '',
        familly_name: '',
        country: '',
        city: '',
        user_img: '',
        user_back_img: '',
        skills: '',
        profession: '',
        phone: '',
        bio: '',
        phone_show: '',
        contact_email: '',
        thumbs_up: '',
        thumbs_down: ''
      },
      logedIn: false,
      light: "",
      thumbs_up: "",
      thumbs_down: ""
    };

    this.getclose = this.getclose.bind(this);
    this.handleThumbs = this.handleThumbs.bind(this);
    this.cv_section = React.createRef();
  }
    componentWillMount(){
        this.props.fetchSession();
        this.props.isLoading(true);
        fetch('/api/profiledata', {
          method:'post',
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.getElementById('csrf-token').content
          },
          body: JSON.stringify({username: this.props.params.id})
        })
        .then(res => res.json())
        .then(data => {
          if(data != false){
            this.setState({
              profiledata: data,
              logedIn: ((data['username'] === this.props.sessiondata['username']) ? true : false ),
              light: data['light'],
              thumbs_up: data['thumbs_up'],
              thumbs_down: data['thumbs_down']
            });
            this.props.isLoading(false);
          }else{
            this.props.isLoading(false);
            this.props.noMatch(false);
          }
                });
    }

    componentDidMount(){
    	const cv_section = this.cv_section.current;
    	this.setState({backgroundwidth: cv_section.offsetWidth});
    	window.addEventListener('resize',  ()=> {
        	this.setState({backgroundwidth: cv_section.offsetWidth});
        });
    }

    handleThumbs({target}){
    	if (this.props.sessiondata && this.props.sessiondata.username != this.state.profiledata.username) {
    		var action_array = target.className.split(' ');
    		var num = Number(action_array[action_array.length-1]);
    		fetch('/api/thumbs', {
    			method:'post',
    			credentials: 'same-origin',
    			headers: {
    				'Accept': 'application/json',
    				'Content-Type': 'application/json',
    				'X-CSRF-TOKEN': document.getElementById('csrf-token').content
    			},
    			body: JSON.stringify({username: this.state.profiledata.username, action: num})
    		})
    		.then(res => res.json())
    		.then(data => {if(data){
    			if(num == 1){
    			if(this.state.light == 'light'){
    				this.setState({light: '', thumbs_up: Number(this.state.thumbs_up) - 1});
    			}else{
    				var i = Number(this.state.thumbs_up) + 1;
    				var j = Number(this.state.thumbs_down);
    				if(this.state.light == 'dark'){
    					j -= 1; 
    				}
    				this.setState({light: 'light', thumbs_up: i, thumbs_down: j});
    			}
    		}else if(num == 0){
    			if(this.state.light == 'dark'){
    				this.setState({light: '', thumbs_down: Number(this.state.thumbs_down) - 1});
    			}else{
    				var i = Number(this.state.thumbs_up);
    				var j = Number(this.state.thumbs_down) + 1;
    				if(this.state.light == 'light'){
    					i -= 1; 
    				}
    				this.setState({light: 'dark', thumbs_up: i, thumbs_down: j});
    			}
    		}
    	}
    		});
    		
    	}
    }

    getclose(e){
    	this.setState({main_window: false});
    }

    render() {
      var skills='', listItems='', user_img_style= {'backgroundImage': 'inset'}, background_img_style={backgroundImage: 'inset'};
      if(this.state.profiledata.username){
    	var skills = (this.state.logedIn ? this.props.sessiondata['skills'] : this.state.profiledata['skills']);
    	var listItems = (skills).map((d, i) => <span key={'skill'+i}>{d}</span>);
    	var user_img_style = {
            backgroundImage: 'url(storage/images/'+(this.state.logedIn ? this.props.sessiondata['user_img'] : this.state.profiledata['user_img'])+')'
        };
      var background_img_style = {
        	backgroundImage: 'url(storage/images/'+(this.state.logedIn ? this.props.sessiondata['user_back_img'] : this.state.profiledata['user_back_img'])+')',
        	height: this.state.backgroundwidth/3+'px'
        }
}
        return (
          <React.Fragment>
          {(this.state.main_window && this.state.logedIn) ? <Editor sendclose={this.getclose} sessiondata={this.props.sessiondata} profiledata={this.state.profiledata} /> : ""}
          <section className="profil_section">
          	<div className="cv_section" ref={this.cv_section}>
          	  <div className="relative_position">
          	    { (this.state.logedIn) ? (
          	    	<button className="edit_button" onClick={()=>{this.setState({main_window: true})}}>
          	    	  <i className="fas fa-pencil-alt"></i>
          	    	</button>
          	    	)
          	        :
          	        ""
          	    }
          	    <div style={background_img_style} className="background_img">
          	        <div style={user_img_style} className="profil_img"></div>
          	    </div>
          	    <div className="name_pro">
          	  	  <span className="name">{(this.state.logedIn ? (this.props.sessiondata['familly_name'] +" "+ this.props.sessiondata['first_name']).toLowerCase() : (this.state.profiledata['familly_name'] +" "+ this.state.profiledata['first_name']).toLowerCase())}</span>
          	  	  <span className="pro">{(this.state.logedIn ? this.props.sessiondata['profession'] : this.state.profiledata['profession'])}</span>
          	  	</div>  
          	  </div>
          	  <div className={"smallInfo votes "+this.state.light}>
          	  	<div>
          	  		<i onClick={this.handleThumbs} className="fas fa-thumbs-up 1"></i>
          	  		<span className="numbers">{this.state.thumbs_up}</span>
          	  	</div>
          	  	<div>
          	  		<i onClick={this.handleThumbs} className="fas fa-thumbs-down 0"></i>
          	  		<span className="numbers">{this.state.thumbs_down}</span>
          	  	</div>
          	  </div>
          	  <div className="smallInfo">
          	    <h4>Living in:</h4>
          	  	<span>{(this.state.logedIn ? (this.props.sessiondata['country']+', '+this.props.sessiondata['city']) : (this.state.profiledata['country']+', '+this.state.profiledata['city']))}</span>
          	  </div>
          	  <div className="smallInfo">
          	    <h4>Skills:</h4>
          	  	<span className="les_abilites">{listItems}</span>
          	  </div>
          	  <div className="smallInfo">
          	    <h4>About:</h4>
          	  	<span>{(this.state.logedIn ? this.props.sessiondata['bio'] : this.state.profiledata['bio'])}</span>
          	  </div>
          	  <div className="smallInfo">
          	    <h4>Contact Information:</h4>
          	  	{this.props.sessiondata['phone_show'] ? (<span>Phone Number: <span className="numbers contactInfo">{(this.state.logedIn ? this.props.sessiondata['phone'] : this.state.profiledata['phone'])}</span></span>) : ""}
          	  	<span>Email: <span className="contactInfo">{(this.state.logedIn ? this.props.sessiondata['contact_email'] : this.state.profiledata['contact_email'])}</span></span>
          	  </div>
          	</div>

          	<div className="ju"></div>
          </section>
          </React.Fragment>
        );
    }
}




const mapStateToProps = (state, ownProps) => ({
    sessiondata: state.datas.session,
    params: ownProps,
    loading: state.datas.loading
});


export default connect(mapStateToProps, { fetchSession, isLoading, noMatch })(Profil);