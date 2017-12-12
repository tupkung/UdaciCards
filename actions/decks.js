import * as api from '../utils/api';

// action type
export const LOAD_DECKS = 'LOAD_DECKS';
export const LOAD_DECK = 'LOAD_DECK';
export const NEW_DECK = 'NEW_DECK';
export const CLEAR_NEW_DECK = 'CLEAR_NEW_DECK';

// action creator
export function createAction(actionType, data) {
    return {
        type: actionType,
        data
    }
};

export function clearNewDeck(data={}) {
    return {
        type: CLEAR_NEW_DECK,
        data
    }
};

// middleware action creator
export const loadDecks = () => dispatch => (
    api.loadDecks()
        .then(data => {
            dispatch(createAction(LOAD_DECKS, data));
        })
);

export const createDeck = (newDeck) => dispatch => (
    api.createDeck(newDeck)
        .then(() => api.loadDecks())
        .then(data => {
            dispatch(createAction(NEW_DECK, newDeck));
            dispatch(createAction(LOAD_DECKS, data));
        })
);

export const loadIndividualDeck = (rowId) => dispatch => (
    api.loadDeck(rowId)
        .then(data => {
            dispatch(createAction(LOAD_DECK, data));
        })
)