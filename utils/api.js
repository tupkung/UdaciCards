import { AsyncStorage } from 'react-native';
import {FLASH_CARDS_KEY} from './_flashcards';

/**
 * @description Create new deck
 * @param {object} newDeck 
 * @returns {promise} of new deck key
 */
export function createDeck(newDeck) {
    return AsyncStorage.getItem(FLASH_CARDS_KEY)
            .then((str) => {
                const key = (new Date()).getTime();
                if(str === null) {
                    AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify({
                        decks: {[key]:newDeck}
                    }));
                }else{
                    let data = JSON.parse(str);
                    data.decks[key] = newDeck;
                    AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(data));
                }
                return key;
            });
}

/**
 * @description Load all decks
 * @returns {array} of deck objects
 */
export function loadDecks() {
    return AsyncStorage.getItem(FLASH_CARDS_KEY)
            .then((str) => {
                if(str === null) {
                    return [];
                }else{
                    const data = JSON.parse(str);
                    return data.decks;
                }
            });
}

/**
 * @description load a deck by rowId
 * @param {number} rowId 
 * @returns {object} of a deck
 */
export function loadDeck(rowId) {
    return AsyncStorage.getItem(FLASH_CARDS_KEY)
            .then((str) => {
                const data = JSON.parse(str);
                return data.decks[rowId];
            });
}

/**
 * @description create new Question with answer
 * @param {number} rowId 
 * @param {object} question 
 * @returns {promise}
 */
export function createQuestion(rowId, question) {
    return AsyncStorage.getItem(FLASH_CARDS_KEY)
            .then((str) => {
                const data = JSON.parse(str);
                const deck = data.decks[rowId];
                if(!deck.questions){
                    deck.questions = [];
                }
                deck.questions.push(question);
                deck.cardNumber = deck.questions.length;
                return data;
            })
            .then((data) => {
                return AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(data));
            });
}