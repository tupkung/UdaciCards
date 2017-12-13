import actionType from '../actions';

const defaultState = {data:{}, dataCollection:[], newData:{}, uiState:{}};

export function decks(state=defaultState, action){
    switch (action.type) {
        case actionType.LOAD_DECKS:
            return {
                ...state,
                dataCollection: action.data
            };
        case actionType.NEW_DECK:
            return {
                ...state,
                newData: action.data,
                uiState: {
                    isCreatedNewDeck: true
                }
            };
        case actionType.NEW_QUESTION:
            return {
                ...state,
                uiState: {
                    isCreatedNewQuestion: true
                }
            };
        case actionType.CLEAR_NEW_QUESTION:
            return {
                ...state,
                uiState: {
                    isCreatedNewQuestion: false
                }
            };
        case actionType.LOAD_DECK:
            return {
                ...state,
                data: action.data
            };
        case actionType.CLEAR_NEW_DECK:
            return {
                ...state,
                newData: action.data,
                uiState: {
                    isCreatedNewDeck: false
                }
            };
        default:
            return state;
    }
}