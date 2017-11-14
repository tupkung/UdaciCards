import React from 'react';
import {TabNavigator} from 'react-navigation';
import DeckListContainer from '../containers/DeckListContainer';
import NewDeckContainer from '../containers/NewDeckContainer';
import {Entypo} from "@expo/vector-icons";

const DeckNavigator = TabNavigator({
    Decks: {
        screen: DeckListContainer,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => (
                <Entypo name="list" size={20}/>
            )
        }
    },
    NewDeck: {
        screen: NewDeckContainer,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({tintColor}) => (
                <Entypo name="add-to-list" size={20}/>
            )
        }
    }
});

export default DeckNavigator;