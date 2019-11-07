import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addBio } from '../../actions/actions'
import { bindActionCreators } from 'redux'
import {Form,Button} from 'bootstrap-4-react';
import './css/style.css'


class Bio extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addSocial:false,
            socialIndex : -1,
            formData : {

                FirstName : '',
                LastName  : '',
                AddressLine1 : '',
                AddressLine2 : '',
                AddressLine3 : '',
                Email : '',
                Phone : '',
                Summary :'' ,
                socialAccounts : [],
                
            },
            isFormValid:false
            
        }

        // this.renderSocial = this.renderSocial.bind(this)
    }


    addSocialData = (key,value) => {

       let socialAccounts = this.state.formData.socialAccounts;
        socialAccounts[key] = value

        this.setState({formData:{...this.state.formData,socialAccounts}})
    }

    renderSocial = () => {

        
        // console.log(this.state.socialIndex,this.state.formData.socialAccounts)

        let template = []
            for (let i=0; i<=this.state.socialIndex; i++)

                {
                        
                        template.push(i);
                }

        return template.map(val => {
            

            return <Form.Input type="text" placeholder="social" key={val} onChange={(event) => this.addSocialData(val,event.target.value)} /> 
        })
        
    }

    addFormData = (event) => {

        event.preventDefault()

        this.setState({formData:{...this.state.formData,[event.target.name]:event.target.value}})
        

    }

    renderForm = () => {

        // const Bio = this.props.data.Bio
        let Tags = []

        for (let element in this.state.formData){
            
            if(element === 'socialAccounts')
                continue
            Tags.push(element)
           
        }

        return Tags.map(ele => {

            // console.log(ele)
            if(ele === 'Summary') 
               return   <Form.Textarea key={ele} required name = {ele}  rows="8" cols="12"   placeholder="Write about yourself" onChange={this.addFormData}></Form.Textarea>

            return     <Form.Input key={ele} type="text"  placeholder={`${ele}`} required name= {ele}  onChange={this.addFormData}></Form.Input>
        })

    }

    validate = () => {

        let message = '';


        const formData = this.state.formData;

        // console.log('Email:',formData['Email'])

        for(let element in formData) {

        
            if(element !== 'socialAccounts'){

            if(formData[element].trim().length !== 0)
                {
                    
                    switch(element){

                        case 'Email' : const emailpattern =  /^[a-z][a-z|.][a-z|0-9|.]+@[a-z]+.com/
                                       emailpattern.test(formData[element]) ? message = '' : message='Please enter a valid email id'
                                        break;
                        case 'Phone' : const phonepattern = /^[+|0-9][0-9]+/
                                       phonepattern.test(formData[element]) && (formData[element].length===10 || formData[element].length === 13) ? message='' : message=`Please enter a valid phone number` 
                                       break;
                        default : message = ''
                    }

                    if(message)
                        break;

                }

                else {
                    message = `Please fill ${element} field`
                    break;
                }
            }
            else{

                  const socialAccount = formData[element]
                for(let index in socialAccount)
                {
                    if(socialAccount[index].trim().length === 0)
                        {message = 'Please enter a social account'
                        break;}
                }
            }

            
        
    }
     if(message.trim().length !== 0){
        this.setState({isFormValid:false})
        // console.log(this.state.formData)
        alert(message);
     }
    
    else{
        const formData = this.state.formData
        this.props.addBio(formData)
        this.setState({isFormValid:true},()=>{

            alert('Data recorded successfully!!')
        })
    }

    }


    // componentDidMount() {

    //     console.log(this.props)
    // }

    render() {

        // console.log(this.props)
        return (
            <div className="form-container">
                <h2>Personal Info</h2> <hr/>
                <Form className="form-bio">
                {this.renderForm()}
                {this.renderSocial()} 
                </Form>
                <Button  className="form-btn" info onClick={() => this.setState({addSocial:true,socialIndex : this.state.socialIndex+1})}>Add Social Link</Button>
                <Button  className="form-btn" info onClick={() => this.setState({addSocial:true,socialIndex : this.state.socialIndex-1})}>Remove Social Link</Button>
               <Button   className = "form-btn" onClick={this.validate}>Submit</Button> 
                
                
            </div>
        ) 
    }
}


const mapStateToProps = (state) => {


      return {  data : state }

}

const mapDispatchToProps = (dispatch) =>  {

   return bindActionCreators({

    addBio

   },dispatch)

}

export default connect(mapStateToProps,mapDispatchToProps)(Bio) 
