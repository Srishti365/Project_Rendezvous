import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={visitorName:'',
        visitorEmail:'',
        visitorPhone:'',
        hostName:'',
        hostEmail:'',
        hostPhone:'',
        resReceived:false,
        res1:{}
        


        }
    }


    postEditData = async()=>{
        await axios.post("http://localhost:5000/enterdetails", {name:this.state.visitorName,
        email:this.state.visitorEmail,
        phone:this.state.visitorPhone,
        hostname:this.state.hostName,
        hostemail:this.state.hostEmail,
        hostphone:this.state.hostPhone},
        { headers: 
            { 
                Accept: 'application/json',
                'Content-Type': 'application/json',
                  }
        }
        ).then(res => {
            if (res.status === 200) {console.log(res);
              this.setState({ res1:res.data,resReceived:true});
    }
})
       }



    onFormSubmit=(event)=>{
        event.preventDefault();
        console.log(this.state);
        this.postEditData();
    }
    

    render(){

        if(this.state.resReceived){
            return <Redirect to = {{ pathname: "/dashboard",
          state:{res1:this.state.res1}
          }} />;
  
          }
  

        return(
            
            <div>
                <div className="form-title">WELCOME</div>
                <div className="container">
                <form onSubmit={this.onFormSubmit}>
                    
                    <div className="form-group">
                        <div className="form-details"><center>ENTER YOUR DETAILS</center></div>
                       
                   <input type="text" className="form-control" placeholder="Your Name" required
                                value={this.state.visitorName}
                                onChange={e => this.setState({visitorName:e.target.value})}
                   
                   />
                   </div>
                   <div className="form-group">
                   <input type="email" className="form-control" placeholder="Your Email" required
                                           value={this.state.visitorEmail}
                                           onChange={e => this.setState({visitorEmail:e.target.value})}
                   />
                   </div>
                   <div className="form-group">
                   <input type="text" className="form-control" placeholder="Your Contact no." required pattern="[1-9]{1}[0-9]{9}"
                                           value={this.state.visitorPhone}
                                           onChange={e => this.setState({visitorPhone:e.target.value})}
                   />
                   </div>
                   <div className="form-details"><center>ENTER HOST'S DETAILS</center></div>
                   <div className="form-group">
                   <input type="text" className="form-control" placeholder="Host Name" required
                                value={this.state.hostName}
                                onChange={e => this.setState({hostName:e.target.value})}
                   
                   />
                   </div>
                   <div className="form-group">
                   <input type="email" className="form-control" placeholder="Host Email" required
                                           value={this.state.hostEmail}
                                           onChange={e => this.setState({hostEmail:e.target.value})}
                   />
                   </div>
                   <div className="form-group">
                  <input type="text" className="form-control" placeholder="Host Contact No." required pattern="[1-9]{1}[0-9]{9}"
                                           value={this.state.hostPhone}
                                           onChange={e => this.setState({hostPhone:e.target.value})}
                   />
                   </div>
                    <center><button type="submit" className="formbutton">Submit</button></center>

                </form>
                </div>
            </div>
        );
    }
}

export default Home;