import { NOTES_DELETE_FAIL, NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_UPDATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS } from "../constants/notesConstants";

export const noteListReducer = ( state ={notes : []} ,action) => {
    switch(action.type){
        case NOTES_LIST_REQUEST:
            return {loading : true};
        case NOTES_LIST_SUCCESS:
            return {loading : false , notes : action.payload};
        case NOTES_LIST_FAIL:
            return {loading : false , error : action.payload};
        default:
            return state;
    }
}

export const noteCreateReducer = (state = {},action)=>{
    switch(action.type){
        case NOTE_CREATE_REQUEST:
            return {loading: true};
        case NOTE_CREATE_SUCCESS:
            return {loading : false,success:true};
        case NOTE_CREATE_FAIL:
            return {loading : false,error:action.payload};
        default:
            return state;
    }
} 

export const noteUpdateReducer = (state = {},action)=>{
    switch(action.type){
        case NOTE_UPDATE_REQUEST:
            return {loading: true};
        case NOTE_UPDATE_SUCCESS:
            return {loading : false,success:true};
        case NOTE_UPDATE_FAIL:
            return {loading : false,error:action.payload,success:false};
        default:
            return state;
    }
};

export const noteDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case NOTES_DELETE_REQUEST:
        return { loading: true };
      case NOTES_DELETE_SUCCESS:
        return { loading: false, success: true };
      case NOTES_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };