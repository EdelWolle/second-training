import { FETCH_SESSION, UPDATE_SESSION, IS_LOADING, NO_MATCH } from './types';

export const fetchSession = () => dispatch => {
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
	.then(data => 
		dispatch({
			type: FETCH_SESSION,
			payload: data
	    })
	);
};


export const updateSession = (newdata) => dispatch => {
	fetch('/api/updatesession', {
		method:'post',
    	credentials: 'same-origin',
    	headers: {
    		'Accept': 'application/json',
    		'Content-Type': 'application/json',
    		'X-CSRF-TOKEN': document.getElementById('csrf-token').content
    	},
    	body: JSON.stringify(newdata)
    	})
	.then(res => res.json())
	.then(data => 
		dispatch({
			type: UPDATE_SESSION,
			payload: data
	    })
	);
};

export const isLoading = (loading) => dispatch => {
	dispatch({
		type: IS_LOADING,
		payload: loading
	})
};

export const noMatch = (match) => dispatch => {
	dispatch({
		type: NO_MATCH,
		payload: match
	})
};