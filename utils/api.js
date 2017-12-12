import { AsyncStorage } from 'react-native';
import {FLASH_CARDS_KEY} from './_flashcards';

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
                return newDeck;
            });
}

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

export function loadDeck(rowId) {
    return AsyncStorage.getItem(FLASH_CARDS_KEY)
            .then((str) => {
                const data = JSON.parse(str);
                return data.decks[rowId];
            })
}