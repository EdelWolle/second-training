import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSession } from '../actions/dataActions';

import Canvas from './canvas';
import CanvasRound from './canvasRound';


class Editor extends Component {
	constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth <= 500 ? window.innerWidth : 500,
      input_background: null,
      input_avatar: null,
      dataURL: null,
      dataURLavatar: null,
      skillScroll: false,
      abilities: (this.props.sessiondata.skills[0] != '') ? this.props.sessiondata.skills : [],
      info: this.props.sessiondata
      };


    this.textInput = React.createRef();
    this.background_img = React.createRef();
    this.textInputSkill = React.createRef();
    this.textInputAvatar = React.createRef();
    this.editableRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleCanvas = this.handleCanvas.bind(this);
    this.getSrc = this.getSrc.bind(this);
    this.getSrcAvatar = this.getSrcAvatar.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
    	this.setState({width: (this.background_img.current).offsetWidth});
    	window.addEventListener('resize', this.updateWidth);
    }

    updateWidth(){
    	this.setState({width: (this.background_img.current).offsetWidth});
    }

    componentWillUnmount(){
    	window.addEventListener('resize', this.updateWidth);
    }

    handleClick(e){
    	if(e.target.className=="background_img"){
    		this.textInput.current.click();
    	}else{
    		this.textInputAvatar.current.click();
    	}
    }

    handleCanvas(e, string){
    	this.setState({[string]:  URL.createObjectURL(e.target.files[0])});
    }

    getSrc(val){
    	var info = this.state.info;
    	info['user_back_img'] = val;
    	this.setState({dataURL: val, info: info,  input_background: null});
    }
    getSrcAvatar(val){
    	var info = this.state.info;
    	info['user_img'] = val;
    	this.setState({dataURLavatar: val, info: info, input_avatar: null});
    }

    handleKey(e){
    	if(e.which == 13){
    		const skill = (this.textInputSkill.current).value.trim().toLowerCase();
    		var letter = /^[a-zA-Z]+$/;
    		if(letter.test(skill) && !((this.state.abilities).includes(skill)) ){
    			this.setState({abilities: (this.state.abilities).concat([skill])});
    			(this.textInputSkill.current).value = '';
    		}
    	}
    }
    scroll(side){
    	if(side=='left'){
    		(this.editableRef.current).scrollTo((this.editableRef.current).scrollLeft - 4, 0);
    	}else if(side=='right'){
    		(this.editableRef.current).scrollTo((this.editableRef.current).scrollLeft + 4, 0);
    	}
    	setTimeout(()=>{
    		if(this.state.skillScroll){
    			this.scroll(side);
    		}
    	}, 20);
    }
    skillScroll(target){
    	if(this.state.skillScroll){
    		this.setState({skillScroll: false});
    	}else{
    		this.setState({skillScroll: true});
    	}
    	this.scroll(target);
    }
    deleteSkill({target}){
    	var newVal = this.state.abilities;
    	newVal.splice(target.getAttribute('data'), 1);
    	this.setState({abilities: newVal});

    }

    handleInput({target}){
    	if(target.id == 'phone_show'){
    		var info = this.state.info;
    		info[target.id] = !this.state.info.phone_show;
    		this.setState({info: info});
    	}else{
    		var info = this.state.info;
    		info[target.id] = target.value;
    		this.setState({info: info});
    	}
    }

    handleSubmit(){
    	var info = this.state.info;
    	info['skills'] = this.state.abilities;
    	info['user_back_img'] = this.state.dataURL;
    	info['user_img'] = this.state.dataURLavatar;
    	info['phone_show'] = (!this.state.info.phone_show ? 0 : 1);

    	this.setState({info: info},()=>{
    		this.props.updateSession(this.state.info);
    	});
    }

    render() {
    	const user_img_style = {
        	backgroundImage: 'url('+((this.state.dataURLavatar != null) ? this.state.dataURLavatar : ('storage/images/'+this.props.profiledata['user_img']) )+')',
            cursor: 'pointer'
        };
        const background_img_style = {
        	backgroundImage: 'url('+((this.state.dataURL != null) ? this.state.dataURL : ('storage/images/'+this.props.profiledata['user_back_img']) )+')',
        	height: this.state.width/3+'px',
        	cursor: 'pointer'
        }

        const listItems = (this.state.abilities).map((d, i) => <div key={i} className="ability"><span>{(this.state.abilities)[i]}</span><i data={i} onClick={this.deleteSkill} className="fas fa-times"></i></div>);
    	return (
    		<div className="window_wrapper">
    		{
    			((this.state.input_background == null && this.state.input_avatar == null) ?
    				
    				<React.Fragment>
    				<input ref={this.textInput} onChange={(e)=>{this.handleCanvas(e, 'input_background')}} type="file" accept="image/*" style={{display: 'none'}} />
    				<input ref={this.textInputAvatar} onChange={(e)=>{this.handleCanvas(e, 'input_avatar')}} type="file" accept="image/*" style={{display: 'none'}} />
    				<div className="window">
    				  <div className="nav">
    				    <div><i onClick={()=>{this.props.sendclose(false)}} className="fas fa-arrow-left"></i></div>
    				  </div>
    				  <div className="background_img" ref={this.background_img} onClick={(e)=>{this.handleClick(e)}} style={background_img_style}>
    				    <div className="profil_img" style={user_img_style}></div>
    				  </div>
    				  <div className="inputs">
    				    <div>
    				      <label htmlFor="first_name">First Name</label>
    				      <input onChange={this.handleInput} value={this.state.info.first_name} id="first_name" type="text" maxLength="70"/>
    				    </div>
    				    <div>
    				      <label htmlFor="familly_name">Familly Name</label>
    				      <input onChange={this.handleInput} value={this.state.info.familly_name} id="familly_name" type="text" maxLength="70"/>
    				    </div>
    				    <div>
    				      <label htmlFor="profession">Profession</label>
    				      <input maxLength="200" onChange={this.handleInput} value={this.state.info.profession != null ? this.state.info.profession : ''} id="profession" type="text" />
    				    </div>
    				    <div>
    				      <label htmlFor="country">Country</label>
    				      <input maxLength="70" onChange={this.handleInput} value={this.state.info.country} id="country" type="text" />
    				    </div>
    				    <div>
    				      <label htmlFor="city">City</label>
    				      <input maxLength="70" onChange={this.handleInput} value={this.state.info.city} id="city" type="text" />
    				    </div>
    				    <div>
    				      <label htmlFor="phone">Phone Number</label>
    				      <input maxLength="20" className="numbers" onChange={this.handleInput} value={this.state.info.phone != null ? this.state.info.phone : ''} id="phone" type="text" />
    				      <span className="phoneshow">Show Publicly:
    				        <input onChange={this.handleInput} defaultChecked={this.props.sessiondata.phone_show} id='phone_show' type='checkbox' />
    				      </span>
    				    </div>
    				    <div>
    				      <label htmlFor="contact_email">Contact Addresse Email</label>
    				      <input onChange={this.handleInput} value={this.state.info.contact_email != null ? this.state.info.contact_email : ''} id="contact_email" type="text" />
    				    </div>
    				    <div>
    				      <label htmlFor="skills">Skills</label>
    				      <div className="flex">
    				        <div className="left" onMouseDown={()=>{this.skillScroll('left')}} onMouseUp={()=>{this.skillScroll('left')}} onTouchStart={()=>{this.skillScroll('left')}} onTouchEnd={()=>{this.skillScroll('left')}}><i className="fas fa-arrow-left"></i></div>
    				        <div className="editable" ref={this.editableRef}>
    				          <div className="abilities" >{listItems }</div>
    				          <input ref={this.textInputSkill} onKeyPress={this.handleKey} id="skills" className="skill" type="text" />
    				        </div>
    				        <div className="right" onMouseDown={()=>{this.skillScroll('right')}} onMouseUp={()=>{this.skillScroll('right')}} onTouchStart={()=>{this.skillScroll('right')}} onTouchEnd={()=>{this.skillScroll('right')}}><i className="fas fa-arrow-right"></i></div>
    				      </div>
    				    </div>
    				    <div>
    				      <label htmlFor="bio">About You</label>
    				      <textarea maxLength="5000" onChange={this.handleInput} value={this.state.info.bio != null ? this.state.info.bio : ''} id="bio"></textarea>
    				    </div>
    				  </div>
    				  <div className="nav bottom">
    				    <button onClick={this.handleSubmit} >Save</button>
    				  </div>
    				</div>
    				</React.Fragment>
    				
    				:  
    				(this.state.input_avatar == null ? 
    				<Canvas sendSrc={this.getSrc} src={this.state.input_background} />
    				:
    				<CanvasRound sendSrc={this.getSrcAvatar} src={this.state.input_avatar} />
    				)
    			)
    		}
    		</div>
    	);
    }
}


export default connect(null, { updateSession })(Editor);