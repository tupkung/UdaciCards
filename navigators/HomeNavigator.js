import React from 'react';
import {StackNavigator} from 'react-navigation';
import IndividualDeckContainer from '../containers/IndividualDeckContainer';
import DeckNavigator from './DeckNavigator';
import NewQuestionContainer from '../containers/NewQuestionContainer';
import QuizContainer from '../containers/QuizContainer';

const HomeNavigator = StackNavigator({
    Deck: {
        screen: DeckNavigator,
        navigationOptions: {
            header: null
        }
    },
    IndividualDeck: {
        screen: IndividualDeckContainer,
        navigationOptions: {
            title: "udacicards"
        }
    },
    NewQuestion: {
        screen: NewQuestionContainer,
        navigationOptions: {
            title: "Add Card"
        }
    },
    Quiz: {
        screen: QuizContainer,
        navigationOptions: {
            title: "Quiz"
        }
    }
},
{ mode: 'modal' } );


export default HomeNavigator;