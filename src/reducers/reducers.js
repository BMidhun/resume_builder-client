import initialState from './initialState'



const reducer = (prevState=initialState,action) => {

        switch(action.type){

            case 'ADD_BIO' : return {...prevState,Bio:action.payload}
                             
            
            case 'ADD_EXP' : return {...prevState, Experience:action.payload}
                             
            
            case 'ADD_EDU' : return {...prevState, Education:action.payload}
                             
                             
            case 'ADD_SKILLS' : return {...prevState, Skills:action.payload}
                                               

            default : return prevState

        }

}


export default reducer


    

