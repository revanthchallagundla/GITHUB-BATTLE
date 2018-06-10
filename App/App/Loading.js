var React = require("react");
var PropTypes = require("prop-types");


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

    this.interval =setInterval(function(){
    if(stopper == this.state.text){
        this.setState(function(){
        return {
            text:this.props.text
            }
        })
    }else{
       this.setState(function(prevState){
        return {
            text:prevState.text + '.'
        }

       })

        }
    }.bind(this),300);
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
module.exports = Loading;