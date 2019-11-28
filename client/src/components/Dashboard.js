import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';


class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:'',
            checkOut:false
        }
        this.onButtonClick = this.onButtonClick.bind(this);


    }

    componentDidMount(){
        this.setState({id:this.props.location.state.res1.entry});
    }


    
    onButtonClick = async()=>{
        await axios.post("http://localhost:5000/enterdetails/checkout", {id:this.state.id},
        { headers: 
            { 
                Accept: 'application/json',
                'Content-Type': 'application/json',
                  }
        }
        ).then(res => {
            if (res.status === 200) {console.log(res);this.setState({checkOut:true});
    }
})
       }

    render(){

        if(this.state.checkOut){
            return <Redirect to = {{ pathname: "/",
          }} />;
  
          }
  

        return(
        <div className="dash"><center>
            <h1 className="dash-title">Thank you for visiting our website!!</h1>
            <div>
                <br></br>
            <h2>Your details have been sent to the host</h2>
            </div>
        <button className="formbutton" onClick={this.onButtonClick} value={this.props.location.state.res1.entry}>Checkout</button>
        </center>
        </div>
        );
    }
}

export default Dashboard;