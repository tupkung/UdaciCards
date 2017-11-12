import React from 'react';
import {TabNavigator} from 'react-navigation';
import DeckListContainer from '../containers/DeckListContainer';
import NewDeckContainer from '../containers/NewDeckContainer';

const DeckNavigator = TabNavigator({
    Decks: {
        screen: DeckListContainer,
        navigationOptions: {
            tabBarLabel: 'Decks'
        }
    },
    NewDeck: {
        screen: NewDeckContainer,
        navigationOptions: {
            tabBarLabel: 'New Deck'
        }
    }
});

export default DeckNavigator;