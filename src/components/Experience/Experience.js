import React, { Component } from 'react'
import {Form,Button} from 'bootstrap-4-react';
import './css/style.css'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {addExperience} from '../../actions/actions'

class Experience extends Component {
    constructor(props) {
        super(props)

        this.state = {
            index : 0,
            formData: [],
            isFormValid:false   
        }
    }

    addData = (event,index) => {

        // console.log(this.state.formData)

        let formData = this.state.formData;

        for (let i=0; i<=this.state.index;i++){

            if(i===index){

                if(event.target.name ==="to" || event.target.name === "from")
                    {
                        let date = event.target.value;
                        let [,month,,year] = new Date(date).toString().split(' ');
                        let value = `${month}, ${year}`

                        formData[i] = {...formData[i],[event.target.name]:value}
                    }
                    
                    else

                    formData[i] = {...formData[i],[event.target.name]:event.target.value.toString()}
            }
        }

        this.setState({formData:formData})
    }

    renderForm = () => {

        let template = [];

        for(let i=0; i<=this.state.index; i++ )

        {
            template[i] =
                <div key={i} className="form-expr">

                    
               
            
                
            <Form.Input type="text" name="jobTitle" required placeholder="Job Title" onChange={(event) => {this.addData(event,i)}}/>
            <label>From  <Form.Input type="date"  required name="from" onChange={(event) => {this.addData(event,i)}}  /></label> 
            <label>To  <Form.Input  type="date" required name="to" onChange={(event) => {this.addData(event,i)}} /></label> 
            <Form.Input type="text"  name="companyName" required placeholder="Company Name" onChange={(event) => {this.addData(event,i)}}/>
            <Form.Input type="text" name="location" required placeholder="Location" onChange={(event) => {this.addData(event,i)}}/>
            <Form.Textarea name="experience" rows="8" required cols="50" placeholder="Mention your job experience" onChange={(event) => {this.addData(event,i)}}/> 

            <div className="hr">

            </div>
            
           
            </div>   
    
        
        }
            
        return template.map(form => {
            return form
        });
        
    }

    newForm = () => {

        this.setState({index:this.state.index+1})

    }

    removeForm = () => {

        this.setState({index:this.state.index-1},()=> {
            alert('Job removed')
        })
        
    }
    validate = () => {

        let formData = this.state.formData;
        let message = '';
        
        
        if(formData.length !==0){
        for (let i=0; i<=this.state.index;i++){

              let job = formData[i];
              let noofDatafilled = 0;
              for(let ele in job){

                    if(job[ele].trim().length===0|| Boolean(job[ele])===false){
                        message = `Please fill the ${ele} field`
                        break;
                    }

                    noofDatafilled++; 
        }

        console.log(noofDatafilled)

        if(message.trim().length!==0)
              break;
        
        if(noofDatafilled !==6 )
            {
                message = 'Please fill the Job details'
                break;
            }
        
       

    }}

    else
        message = "Please fill the data"

        if(message.trim().length!==0){
            this.setState({isFormValid:false},() => {
                alert(message)
            })
            
        }

        else{

            
            this.setState({isFormValid:true},()=>{
                this.props.addExperience(this.state.formData)
                alert('Data recorded successfully!!')
            })


        }


    }

    render() {
        return (
            <div className="form-container">
                <h2>Experience</h2>
            {this.renderForm()}

            <hr/>
            <Button info className="form-btn" onClick={this.newForm}>Add Job</Button>
            <Button info className="form-btn" onClick={this.removeForm}>Remove Job</Button>


            
             <Button className="form-btn"  onClick={this.validate}>Submit</Button>
            </div>
            )
    }
}


const mapStateToProps = (state) => {


    return {  data : state }

}

const mapDispatchToProps = (dispatch) =>  {

 return bindActionCreators({

 addExperience

 },dispatch)

}

export default connect(mapStateToProps,mapDispatchToProps)(Experience)
