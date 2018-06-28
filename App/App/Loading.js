import React from "react";
import PropTypes from "prop-types";

var style = {
    content: {
        textAlign:'center',
        fontSize:'35px'
    }
 };
 
class Loading extends React.Component{
constructor(props){
    super(props);
    this.state={
        text:props.text,
    }
}

componentDidMount(){
    var stopper = this.state.text + "...";

    this.interval =setInterval(()=>{
    if(stopper == this.state.text){
        this.setState(()=>({text:this.props.text}))
    }else{
       this.setState((prevState)=>({text:prevState.text + '.'}))}
    },300);
}

componentWillUnmount(){
    window.clearInterval(this.interval);
}

render(){
    return(
        <p style={style.content}>
            {this.state.text}
        </p>
    )

   }

}

Loading.propTypes={
    text:PropTypes.string.isRequired
}

Loading.defaultProps ={
   text:'Loading' 
}
export default Loading;