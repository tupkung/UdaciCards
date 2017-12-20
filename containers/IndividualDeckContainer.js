import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import actions from '../actions';

class IndividualDeckContainer extends Component {

    constructor(props){
        super(props);

        this.onPressAddCard = this.onPressAddCard.bind(this);
        this.onPressStartQuiz = this.onPressStartQuiz.bind(this);
    
    }

    componentDidMount() {
        const {navigation, loadDeck} = this.props;
        const {rowId} = navigation.state.params;
        loadDeck(rowId);
    }
    

    onPressAddCard() {
        const {navigation} = this.props;
        const {rowId} = navigation.state.params;
        navigation.navigate("NewQuestion", {rowId: rowId});
    }

    onPressStartQuiz() {
        const {deckData} = this.props;
        if(deckData.cardNumber > 0) {
            this.props.navigation.navigate("Quiz", {questions: deckData.questions});
        }
        
    }


    render() {
        const {deckData} = this.props;
        return (
            deckData?
                <View style={{flex:1}}>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>{deckData.title}</Text>
                        <Text style={styles.contentCardNumber}>{deckData.cardNumber} cards</Text>
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.button} onPress={this.onPressAddCard}>
                            <Text style={styles.buttonText}>Create New Question</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.onPressStartQuiz}>
                            <Text style={styles.buttonText}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    contentText: {
        fontWeight: "bold",
        fontSize: 42
    },
    contentCardNumber: {
        fontWeight: "100",
        fontSize: 22
    },
    buttonGroup: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        width: "70%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        height: 50,
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: "#69c6e5",
        opacity: 0.8,
        borderColor: "#ddd",
        borderBottomWidth: 0,
        shadowColor: "#ddd",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 5
    },
    buttonText: {
        fontSize: 28
    }
});

const mapStateToProps = ({decks}) => ({
    deckData: decks.data
});

const mapDispatchToProps = (dispatch) => ({
    loadDeck: (createTime) => dispatch(actions.loadIndividualDeck(createTime))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualDeckContainer);