import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';

export default class NewQuestionContainer extends Component {

    constructor(props){
        super(props);
        this.onPressSubmit = this.onPressSubmit.bind(this);
    }

    onPressSubmit(){
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <TextInput placeholder="Question" style={styles.input} value={"What is a component?"}/>
                    <TextInput placeholder="Answer" style={styles.input} value={""}/>
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