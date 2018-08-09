import React, { Component } from 'react';



class Canvas extends Component {
	constructor(props) {
    super(props);
    this.state = {
      input_background: null,
      input_avatar: null,
      drag: false,
      top: 0,
      min_top: 0,
      max_top: 0,
      img_height: 0,
      deriction: true,
      derictionX: true, 
      scroll: true,
      dragDivHeight: 0,
      oldY: 0,
      oldX: 0,
      zoom: 0,
      zoom_drag: false,
      zoom_deg: 0,
      img_w: '100%',
      canvasWidth: 300,
      canvasHeight: 300,
      zw: 1
      };


      this.imgContainer = React.createRef();
      this.canvas = React.createRef();
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.crop = this.crop.bind(this);
      this.mousemoveZoom = this.mousemoveZoom.bind(this);
      this.mousemoveDrag = this.mousemoveDrag.bind(this);
      this.touchmoveZoom = this.touchmoveZoom.bind(this);
      this.touchmoveDrag = this.touchmoveDrag.bind(this);
      this.resize = this.resize.bind(this);
      this.cancel = this.cancel.bind(this);
      this.clickZoom = this.clickZoom.bind(this);
    }

    resize(){
    	var drag = document.getElementById('drag');
    	var img_cont = document.getElementById('img');
    	var container = img_cont.parentElement;
    	var img = img_cont.children[0];
    	var zoom_bar_head = document.getElementById('zoom_bar_head');
    	var zoom_controller = (zoom_bar_head.parentElement).parentElement;
    	
    	this.setState({
    		  top: (container.offsetHeight - img_cont.offsetHeight)/2,
    		  min_top: (container.offsetHeight - img_cont.offsetHeight)/2,
    		  max_top: (container.offsetHeight + img_cont.offsetHeight)/2,
    		  img_height: img.height,
    		  zoom_deg: container.offsetWidth/img.naturalWidth,
    		  dragDivHeight: img_cont.offsetWidth/3,
    		  img_w: '100%',
    		  zoom: 0,
    		  zw: zoom_controller.offsetWidth 
    		});
    }

    clickZoom(e){
        var drag = document.getElementById('drag');
    	var img_cont = document.getElementById('img');
    	var container = img_cont.parentElement;
    	var img = img_cont.children[0];
    	var zoom_bar_head = document.getElementById('zoom_bar_head');
    	var zoom_controller = (zoom_bar_head.parentElement).parentElement;

        var l = (e.pageX - getPosition(zoom_controller).x);
        if(l <= 0){
            l = 0.001;
        }
        var oldL = l;
        if((img.naturalWidth*l/this.state.zw) <= container.offsetWidth){
            l = container.offsetWidth*this.state.zw/img.naturalWidth + oldL;
        }else{
            l += container.offsetWidth*this.state.zw/img.naturalWidth;
        }

        if(img.naturalWidth < img.naturalHeight){
            l = ((container.offsetHeight*img.naturalWidth/img.naturalHeight)*this.state.zw/img.naturalWidth) + oldL;
        }

        if(0 <= oldL && oldL <= this.state.zw){
            this.setState({
                zoom: oldL,
                img_w: ((img.naturalWidth*l/this.state.zw) === container.offsetWidth) ? (container.offsetHeight*img.naturalWidth/img.naturalHeight) :  (img.naturalWidth*l/this.state.zw),
                zoom_deg: img.width/img.naturalWidth,
                min_top: (container.offsetHeight - img_cont.offsetHeight)/2,
                max_top: (container.offsetHeight + img_cont.offsetHeight)/2,
                min_left: (container.offsetWidth - img_cont.offsetWidth)/2,
                max_left: (container.offsetWidth + img_cont.offsetWidth)/2
            },()=>{
                if(this.state.min_top != (container.offsetHeight - img_cont.offsetHeight)/2){
                    this.setState({
                        zoom: oldL,
                        img_w: ((img.naturalWidth*l/this.state.zw) === container.offsetWidth) ? (container.offsetHeight*img.naturalWidth/img.naturalHeight) :  (img.naturalWidth*l/this.state.zw),
                        zoom_deg: img.width/img.naturalWidth,
                        min_top: (container.offsetHeight - img_cont.offsetHeight)/2,
                        max_top: (container.offsetHeight + img_cont.offsetHeight)/2,
                        min_left: (container.offsetWidth - img_cont.offsetWidth)/2,
                        max_left: (container.offsetWidth + img_cont.offsetWidth)/2
                    },()=>{
                        if(this.state.min_top > this.state.top){
                this.setState({top: this.state.min_top});
            }
            if(this.state.max_top < (this.state.top + this.state.dragDivHeight)){
                this.setState({top: (this.state.max_top - this.state.dragDivHeight)})
            }
            if(this.state.min_left > this.state.left){
                this.setState({left: this.state.min_left});
            }
            if(this.state.max_left < (this.state.left + this.state.dragDivHeight)){
                this.setState({left: (this.state.max_left - this.state.dragDivHeight)})
            }
                    });

                }
            });

            if(this.state.min_top > this.state.top){
                this.setState({top: this.state.min_top});
            }
            if(this.state.max_top < (this.state.top + this.state.dragDivHeight)){
                this.setState({top: (this.state.max_top - this.state.dragDivHeight)})
            }
            if(this.state.min_left > this.state.left){
                this.setState({left: this.state.min_left});
            }
            if(this.state.max_left < (this.state.left + this.state.dragDivHeight)){
                this.setState({left: (this.state.max_left - this.state.dragDivHeight)})
            }
        }
    }

    mousemoveZoom(e){
    	var drag = document.getElementById('drag');
    	var img_cont = document.getElementById('img');
    	var container = img_cont.parentElement;
    	var img = img_cont.children[0];
    	var zoom_bar_head = document.getElementById('zoom_bar_head');
    	var zoom_controller = (zoom_bar_head.parentElement).parentElement;
    	
    	if(this.state.zoom_drag){
    			var l = (e.pageX - getPosition(zoom_controller).x);
    			var oldL = l;
    			if((img.naturalWidth*l/this.state.zw) <= container.offsetWidth){
    				l = container.offsetWidth*this.state.zw/img.naturalWidth + oldL;
    			}else{
    				l += container.offsetWidth*this.state.zw/img.naturalWidth;
    			}
    			if(0 <= oldL && oldL <= this.state.zw){
    				this.setState({zoom: oldL,
    				 img_w: ((img.naturalWidth*l/this.state.zw) === container.offsetWidth) ? '100%' :  (img.naturalWidth*l/this.state.zw),
    				  zoom_deg: img.width/img.naturalWidth,
    				  min_top: (container.offsetHeight - img_cont.offsetHeight)/2,
    				  max_top: (container.offsetHeight + img_cont.offsetHeight)/2,
    				});
    				if(this.state.min_top > this.state.top){
    					this.setState({top: this.state.min_top});
    				}
    				if(this.state.max_top < (this.state.top + this.state.dragDivHeight)){
    					this.setState({top: (this.state.max_top - this.state.dragDivHeight)})
    				}
    			}
    		}
    }

    touchmoveZoom(evt){
    	var drag = document.getElementById('drag');
    	var img_cont = document.getElementById('img');
    	var container = img_cont.parentElement;
    	var img = img_cont.children[0];
    	var zoom_bar_head = document.getElementById('zoom_bar_head');
    	var zoom_controller = (zoom_bar_head.parentElement).parentElement;

    	if(this.state.zoom_drag){
    			var touches = evt.changedTouches;
    			var e = {pageX: touches[touches.length-1].clientX, pageY: touches[touches.length-1].clientY};

    			var l = (e.pageX - getPosition(zoom_controller).x);
    			var oldL = l;
    			if((img.naturalWidth*l/this.state.zw) <= container.offsetWidth){
    				l = container.offsetWidth*this.state.zw/img.naturalWidth + oldL;
    			}else{
    				l += container.offsetWidth*this.state.zw/img.naturalWidth;
    			}
    			if(0 <= oldL && oldL <= this.state.zw){
    				this.setState({zoom: oldL,
    				 img_w: ((img.naturalWidth*l/this.state.zw) === container.offsetWidth) ? '100%' :  (img.naturalWidth*l/this.state.zw),
    				  zoom_deg: img.width/img.naturalWidth,
    				  min_top: (container.offsetHeight - img_cont.offsetHeight)/2,
    				  max_top: (container.offsetHeight + img_cont.offsetHeight)/2,
    				});
    				if(this.state.min_top > this.state.top){
    					this.setState({top: this.state.min_top});
    				}
    				if(this.state.max_top < (this.state.top + this.state.dragDivHeight)){
    					this.setState({top: (this.state.max_top - this.state.dragDivHeight)})
    				}
    			}
    		}
    }

    mousemoveDrag(e){
    	if(this.state.drag){
    			if(this.state.oldY - e.pageY >= 0){
    				this.move(true, this.state.oldY - e.pageY);
    				this.setState({deriction: true});
    			}else{
    				this.move(false, e.pageY - this.state.oldY);
    				this.setState({deriction: false});
    			}
    			if(this.state.oldX - e.pageX > 0.1){
    				this.setState({derictionX: true});
    			}else if(this.state.oldX - e.pageX < -0.1){
    				this.setState({derictionX: false});
    			}else{
    				this.setState({derictionX: null});
    			}
    			this.setState({oldY: e.pageY, oldX: e.pageX});
    			e.preventDefault();
    		}
    }

    touchmoveDrag(evt){
    	if(this.state.drag){
    			var touches = evt.changedTouches;
    			var e = {pageX: touches[touches.length-1].clientX, pageY: touches[touches.length-1].clientY};
    			if(this.state.oldY - e.pageY >= 0){
    				this.move(true, this.state.oldY - e.pageY);
    				this.setState({deriction: true});
    			}else{
    				this.move(false, e.pageY - this.state.oldY);
    				this.setState({deriction: false});
    			}
    			if(this.state.oldX - e.pageX > 0.1){
    				this.setState({derictionX: true});
    			}else if(this.state.oldX - e.pageX < -0.1){
    				this.setState({derictionX: false});
    			}else{
    				this.setState({derictionX: null});
    			}
    			this.setState({oldY: e.pageY, oldX: e.pageX});
    			evt.preventDefault();
    		}
    }

    cancel(){
    	this.setState({drag: false, scroll: false, derictionX: null, zoom_drag: false});
    }

    componentWillUnmount(){
    	var zoom_bar_head = document.getElementById('zoom_bar_head');
    	var zoom_controller = (zoom_bar_head.parentElement).parentElement;
    	var drag = document.getElementById('drag');

    	window.removeEventListener('resize', this.resize);

    	(zoom_controller.parentElement).removeEventListener('mousemove', this.mousemoveZoom);

    	(zoom_controller.parentElement).removeEventListener('touchmove', this.touchmoveZoom);

    	drag.removeEventListener('mousemove', this.mousemoveDrag);

    	drag.removeEventListener('touchmove', this.touchmoveDrag);

    	document.body.removeEventListener('mouseup', this.cancel);

    	document.body.removeEventListener('touchend', this.cancel);
    }

    componentDidMount(){
    	var drag = document.getElementById('drag');
    	var img_cont = document.getElementById('img');
    	var container = img_cont.parentElement;
    	var img = img_cont.children[0];
    	var zoom_bar_head = document.getElementById('zoom_bar_head');
    	var zoom_controller = (zoom_bar_head.parentElement).parentElement;
    	this.setState({zw: zoom_controller.offsetWidth});

    	// Resize adjustment
    	window.addEventListener('resize', this.resize);

    	// Non screen touch adjustment for the zoom bar
    	(zoom_controller.parentElement).addEventListener('mousemove', this.mousemoveZoom);

    	// Screen touch adjustment for the zoom bar
    	(zoom_controller.parentElement).addEventListener('touchmove', this.touchmoveZoom);

    	// Non screen touch adjustment for the draggable div
    	drag.addEventListener('mousemove', this.mousemoveDrag);

    	// Screen touch adjustment for the draggable div
    	drag.addEventListener('touchmove', this.touchmoveDrag);

    	// Non screen touch initial state adjustment
    	document.body.addEventListener('mouseup', this.cancel);

    	// Screen touch initial state adjustment
    	document.body.addEventListener('touchend', this.cancel);


    	img.onload = ()=>{
    		this.setState({top: (container.offsetHeight - img_cont.offsetHeight)/2,
    		  min_top: (container.offsetHeight - img_cont.offsetHeight)/2,
    		  max_top: (container.offsetHeight + img_cont.offsetHeight)/2,
    		  img_height: img.height,
    		  zoom_deg: container.offsetWidth/img.naturalWidth,
    		  dragDivHeight: img_cont.offsetWidth/3,
    		  canvasWidth: img.naturalWidth,
    		  canvasHeight: img.naturalHeight
    		});
    	}
    }

    move(top, k){
    	if(top){
    		if (this.state.top >= this.state.min_top) {
    			let j = this.state.top - k*1.5;
    			this.setState({top: j >= this.state.min_top ? j : this.state.min_top})
    		}
    	}else{
    		if (this.state.top < (this.state.max_top - this.state.dragDivHeight)) {
    			let j = this.state.top + k*1.5;
    			this.setState({top: j >= (this.state.max_top - this.state.dragDivHeight) ? (this.state.max_top - this.state.dragDivHeight) : j})
    		}
    	}
    }

    handleMouseDown(){
    	var ele = this.imgContainer.current;

    	if(this.state.derictionX){
    		if(this.state.deriction){
    			if(this.state.top < (this.state.min_top + 20)){
    				ele.scrollTo(ele.scrollLeft - 2, ele.scrollTop - 2);
    			}else{
    				ele.scrollTo(ele.scrollLeft - 2, ele.scrollTop);
    			}
    		}else{
    			if(this.state.top > (this.state.max_top - this.state.dragDivHeight - 20)){
    				ele.scrollTo(ele.scrollLeft - 2, ele.scrollTop + 2);
    			}else{
    				ele.scrollTo(ele.scrollLeft - 2, ele.scrollTop);
    			}
    		}
    	}else if(this.state.derictionX === false){
    		if(this.state.deriction){
    			if(this.state.top < (this.state.min_top + 20)){
    				ele.scrollTo(ele.scrollLeft + 2, ele.scrollTop - 2);
    			}else{
    				ele.scrollTo(ele.scrollLeft + 2, ele.scrollTop);
    			}
    		}else{
    			if(this.state.top > (this.state.max_top - this.state.dragDivHeight - 20)){
    				ele.scrollTo(ele.scrollLeft + 2, ele.scrollTop + 2);
    			}else{
    				ele.scrollTo(ele.scrollLeft + 2, ele.scrollTop);
    			}
    		}
    	}else{
    		if(this.state.deriction){
    			if(this.state.top < (this.state.min_top + 20)){
    				ele.scrollTo(ele.scrollLeft, ele.scrollTop - 2);
    			}
    		}else{
    			if(this.state.top > (this.state.max_top - this.state.dragDivHeight - 20)){
    				ele.scrollTo(ele.scrollLeft, ele.scrollTop + 2);
    			}
    		}
    	}
    	setTimeout(()=>{
    		if(this.state.scroll){
    			this.handleMouseDown();
    		}
    	}, 20);
    }

    crop(){
    	const imgContainer = this.imgContainer.current;
    	const img = imgContainer.children[0];
    	const imgContainer_wrapper = imgContainer.parentElement;
    	const canvas = this.canvas.current;


    	var diff = 0;
    	if(imgContainer_wrapper.offsetHeight > imgContainer.offsetHeight){
    		diff = (imgContainer_wrapper.offsetHeight - imgContainer.offsetHeight)/2;
    	} 

    	const left = imgContainer.scrollLeft*(img.naturalWidth/imgContainer.scrollWidth);
    	const top = (imgContainer.scrollTop + (this.state.top - diff))*(img.naturalHeight/imgContainer.scrollHeight);
    	const lenghtX = imgContainer.offsetWidth*(img.naturalWidth/img.width);
    	const lenghtY = lenghtX/3;

    	this.setState({
    		canvasWidth: lenghtX,
    		canvasHeight: lenghtY
    	},()=>{
    		var ctx = canvas.getContext('2d');
    		ctx.drawImage(img, left, top, lenghtX, lenghtY, 0, 0, lenghtX, lenghtY);
    		var dataURL = canvas.toDataURL("image/png");
    		this.props.sendSrc(dataURL);
 
    	});

    }

    render() {
    	return (
    		<div className="window_canvas">
    		<div className="nav">
    		  <div><i onClick={()=>{this.props.sendSrc(null)}} className="fas fa-arrow-left"></i></div>
    		</div>
    		  <canvas ref={this.canvas} width={this.state.canvasWidth} height={this.state.canvasHeight} ></canvas>
    		  <div className="container">
    		  	<div ref={this.imgContainer} className="img" id="img">
    		  	    <img width={this.state.img_w} src={this.props.src} />
    		  	</div>
    		  	<div
    		  	style={{top: this.state.top+'px', height: this.state.dragDivHeight+'px'}} className="drag" id="drag"
    		  	onMouseDown={(e)=>{this.handleMouseDown(); this.setState({drag: true, oldY: e.pageY, scroll: true, derictionX: null});}}
    		  	onTouchStart={(evt)=>{
    		  		this.handleMouseDown();
    		  		var touches = evt.changedTouches;
    		  		var e = {pageX: touches[touches.length-1].clientX, pageY: touches[touches.length-1].clientY};
    		  		this.setState({drag: true, oldY: e.pageY, scroll: true, derictionX: null});
    		  	}}
    		  	></div>
    		  </div>

    		  <div className="controller">
    		    <div className="child">
    		  	  <div className="zoom_controller" onClick={this.clickZoom}>
    		  		<div className="zoom_bar" style={{width: this.state.zoom+'px'}}>
    		  		  <div
    		  		  className="zoom_bar_head" id="zoom_bar_head"
    		  		  onMouseDown={()=>{this.setState({zoom_drag: true})}}
    		  		  onTouchStart={()=>{this.setState({zoom_drag: true})}}
    		  		  style={{left: (this.state.zoom-7)+'px'}}
    		  		  ></div>
    		  		</div>
    		  	  </div>
    		  	  <div className="zoom_deg">{Math.round(this.state.zoom_deg * 10) / 10}</div>
    		  	</div>
    		  	<div className="crop">
    		  		<button onClick={()=>{this.crop()}}>Crop</button>
    		  	</div>
    		  </div>
    		</div>
    	);
    }
}


function getPosition(element){
    var /*top = 0,*/ left = 0;
    
    do {
        /*top  += element.offsetTop;*/
        left += element.offsetLeft;
    } while (element = element.offsetParent);
    
    return { x: left/*, y: top*/ };
}


export default Canvas;