import React, { Component } from 'react'
import {Form,Button } from 'bootstrap-4-react';
import './css/style.css'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {addEducation} from '../../actions/actions'


class Education extends Component {
    constructor(props) {
        super(props)

        this.state = {
          index : 0,       
          formData : [],
          isFormValid : false
        }
    }

    addData = (event,index) => {

        let formData = this.state.formData;

        for (let i=0; i<=this.state.index;i++){

            if(i===index){

                    formData[i] = {...formData[i],[event.target.name]:event.target.value.toString()}
            }
        }

        this.setState({formData:formData})

    }

    renderForm = () => {

        let template=[]

        for(let i=0; i<=this.state.index;i++){  
            
            
            template[i] = <div key={i} className="form-edu"> 

{/*defaultValue={element.length!==0 ? element[i].degree : ''}  */}
                 <Form.Input type="text" name="degree"    placeholder="Name of degree" onChange={(event) => {this.addData(event,i)}}/>
                 <Form.Input type="text"  name="yearPassed"   placeholder="Year Passed" onChange={(event) => {this.addData(event,i)}}/>
                 <Form.Input type="text" name="stream"    placeholder="Stream" onChange={(event) => {this.addData(event,i)}}/>
                 <Form.Input type="text" name="percentage"   placeholder="Percentage" onChange={(event) => {this.addData(event,i)}}/>
                 <Form.Input type="text" name="institution"   placeholder="Name of Institution" onChange={(event) => {this.addData(event,i)}}/>
                 <Form.Input type="text" name="location"    placeholder="Location of Institution" onChange={(event) => {this.addData(event,i)}}/>

                <div className="hr">

                </div>

              </div>

    }

    return template.map(form => {return form})
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
    let message = ''
    if(formData.length===0)
        message = 'Please fill the data'
    
    else{

        for(let i=0; i<=this.state.index; i++){

            let education = formData[i]
            let noofDataFilled = 0;

            for(let ele in education){

                if(ele === 'stream')
                    continue;

                if(education[ele].trim().length !==0){

                    

                     if(ele === 'yearPassed')
                        {
                            console.log('year Passed')
                            const pat = /[0-9]/;
                            (education[ele].length === 4 && pat.test(education[ele])) ? message = '' : message='Please enter a valid year'
                        }  

                        noofDataFilled++;

                }

                else { message =`Please enter ${ele} field`; 
                       break }

            if(message.trim().length!==0)
                break;

            }
            console.log('NoofDataFilled:',noofDataFilled)
            if(noofDataFilled < 5)
                {
                    message = 'Please fill the required fields'
                    break;
                }


            if(message.trim().length!==0)
                break;

        }


    }

    if(message.trim().length!==0){
        this.setState({isFormValid:false})
        alert(message)
    }
    else{

        
        this.setState({isFormValid:true},()=>{
            this.props.addEducation(this.state.formData)
            alert('Data recorded successfully!!')

        })
    }

}

    render() {
        return (
            <div className="form-container">
                <h2>Education</h2>
                {this.renderForm()}
                <Button info onClick={this.newForm} className="form-btn">Add Education</Button >
                <Button info className="form-btn" onClick={this.removeForm}>Remove Education</Button>

                <Button className="form-btn" onClick={this.validate}>Submit</Button >

            </div>
        )
    }
}


const mapStateToProps = (state) => {


return {  data : state }

}

const mapDispatchToProps = (dispatch) =>  {

return bindActionCreators({

addEducation

},dispatch)

}

export default connect(mapStateToProps,mapDispatchToProps)(Education)
