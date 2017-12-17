import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import actions from '../actions';

class NewQuestionContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: {
                question: "",
                answer: ""
            }
        };
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onChangeAnswer = this.onChangeAnswer.bind(this);
    }

    componentDidUpdate() {
        if(this.props.uiState.isCreatedNewQuestion){
            const {navigation} = this.props;
            const {rowId} = navigation.state.params;
            this.props.loadDeck(rowId);
            this.props.loadDecks();
            this.props.navigation.goBack();
        }
    }

    onPressSubmit(){
        const {createNewQuestion, navigation} = this.props;
        const {rowId} = navigation.state.params;
        const {data} = this.state;
        if(
            this.state.data.question !== undefined
            && this.state.data.answer !== undefined
            && this.state.data.question !== "" 
            && this.state.data.answer !== ""){
            createNewQuestion(rowId, data);
        }
    }

    onChangeQuestion(str) {
        const {answer} = this.state.data;
        this.setState({
            data: {
                question: str,
                answer: answer
            }
        });
    }

    onChangeAnswer(str) {
        const {question} = this.state.data;
        this.setState({
            data: {
                question: question,
                answer: str
            }
        });
    }

    render() {
        return (
            (this.props.uiState.isCreatedNewQuestion) ?
            <View/>
            :
            <View style={styles.container}>
                <View style={styles.content}>
                    <TextInput placeholder="Question" style={styles.input} onChangeText={(str) => this.onChangeQuestion(str)} />
                    <TextInput placeholder="Answer" style={styles.input} onChangeText={(str) => this.onChangeAnswer(str)} />
                    <TouchableOpacity style={styles.button} onPress={this.onPressSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 5
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    input: {
        marginTop: 10,
        padding: 5,
        width: "80%",
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        opacity: 0.8,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        fontSize: 18
    },
    button: {
        width: "60%",
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
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 5
    },
    buttonText: {
        fontSize: 28
    }
});

const mapStateToProps = ({decks}) => ({
    uiState: decks.uiState
});

const mapDispatchToProps = (dispatch) => ({
    createNewQuestion: (rowId, question) => dispatch(actions.createQuestion(rowId, question)),
    loadDeck: (rowId) => dispatch(actions.loadIndividualDeck(rowId)),
    loadDecks: () => dispatch(actions.loadDecks())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewQuestionContainer);