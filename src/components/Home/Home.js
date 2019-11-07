import React, { Component } from 'react'
import {Button} from 'bootstrap-4-react'
import Bio from '../Bio/Bio';
import Experience from '../Experience/Experience';
import Education from '../Education/Education';
import Skills from '../Skills/Skills';
import { ListGroup } from 'bootstrap-4-react';
import './home.css'
import { connect } from "react-redux";
import axios from "axios";
import {saveAs} from 'file-saver'


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
                
            renderType : ''
        }
    }


    renderForm = (formType) => {

        switch(formType) {

            case 'Bio' : return  <Bio />

            case 'Expr': return <Experience />

            case 'Edu': return <Education />

            case 'Skills' : return <Skills /> 

            default : return <Bio />
        }

    }

    changeForm = (renderType) => {

        this.setState({renderType})
    }

    submitForm = () => {

        // console.log(this.props.data)

        axios.post('https://cryptic-garden-96376.herokuapp.com/generatePDF',this.props.data,{responseType:'blob',headers:{"Content-Type":"application/json"}})
        .then(res => {

            const pdf = new Blob([res.data,{type:'application/pdf'}]);

            saveAs(pdf,'resume.pdf');
            
        })


    

    }

    render() {
        return (
            
            <div className="home">
                
                <div className="optionsClass" style={{marginLeft:'2%'}}>

                 <ListGroup  className="options">
                    <ListGroup.Item onClick={() => {this.changeForm('Bio')}}>Personal Info</ListGroup.Item>
                    <ListGroup.Item onClick={() => {this.changeForm('Expr')}} >Experience</ListGroup.Item>
                    <ListGroup.Item onClick={() => {this.changeForm('Edu')}}>Education</ListGroup.Item>
                    <ListGroup.Item onClick={() => {this.changeForm('Skills')}}>Skills</ListGroup.Item>
                    
                </ListGroup>


                <Button primary onClick={() => this.submitForm()} style={{margin: '6% 0% 6% 0%'}}>Submit Resume</Button>
                    


                </div>

                {this.renderForm(this.state.renderType)}

            </div>

            
        )
    }
}

const mapStateToProps = (state) => {

    return {data : state}

}

export default connect(mapStateToProps,null)(Home);
