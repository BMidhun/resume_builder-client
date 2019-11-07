import React, { Component } from 'react'
import ReactTags from 'react-tag-autocomplete';
import suggestions from './suggestion';
import {Button} from 'bootstrap-4-react'
import './css/style.css';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {addSkills} from '../../actions/actions'


class Skills extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
            tags: [],
            suggestions: suggestions,
            skills:[]
            
        }
    }

    handleDelete (i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        const skills = []
        for (let tag in tags){
            skills.push(tags[tag].name)
        }
        this.setState({ tags, skills })
      }
     
      handleAddition (tag) {
        const tags = [].concat(this.state.tags, tag)
        const skills = []
        for (let tag in tags){
            skills.push(tags[tag].name)
        }
        this.setState({ tags , skills})
      }


      submitSkills = () => {

            this.props.addSkills(this.state.skills)
            alert('Data recorded successfully!!')

      }

    componentDidMount(){

        alert('Press Enter to add skills to Skill box!!')
    }
     
    render() {

        return (

            <>
            <div className="tags-container">
                <h2>Add your Skills</h2>
            <ReactTags
                 tags={this.state.tags}
                 suggestions={this.state.suggestions}
                 handleDelete={this.handleDelete.bind(this)}
                 handleAddition={this.handleAddition.bind(this)}
                 allowNew = {true} 
                 placeholder = 'Add your Skills.Press Enter to add skills to the box'
                 autoresize = {false}/>
                
                    <Button onClick={this.submitSkills}className="btnDiv">Submit Skills</Button>
                
               
            </div>
           

            </>
        )
    }
}



const mapStateToProps = (state) => {


    return {  data : state }

}

const mapDispatchToProps = (dispatch) =>  {

 return bindActionCreators({

 addSkills

 },dispatch)

}


export default connect(mapStateToProps,mapDispatchToProps)(Skills)


