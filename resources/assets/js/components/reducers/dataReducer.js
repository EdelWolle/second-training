import { FETCH_SESSION, UPDATE_SESSION, IS_LOADING, NO_MATCH } from '../actions/types';


const inistialState = {
	session : {
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
    thumbs_down: '',
    work_status: ''
	},
  loading: false,
  match: true
};

fetch('/api/session', {
       method:'get',
       credentials: 'same-origin',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'X-CSRF-TOKEN': document.getElementById('csrf-token').content
       }
   })
.then(res => res.json())
.then(data => {inistialState.session = data;});

export default function (state = inistialState, action) {
	switch(action.type){
		case FETCH_SESSION:
		  return{
		  	...state,
		  	session: action.payload
		  };
		case UPDATE_SESSION:
		  return{
		  	...state,
		  	session: action.payload
		  };
      case IS_LOADING:
      return{
        ...state,
        loading: action.payload
      };
      case NO_MATCH:
      return {
        ...state,
        match: action.payload
      };
		default:
		  return state;
	}
}