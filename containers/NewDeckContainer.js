import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export default class NewDeckContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.question}>What is the title of your new deck?</Text>
                    <TextInput placeholder="Deck Title" style={styles.deckTitleInput}/>
                    <TouchableOpacity style={styles.button}>
                        <Text >Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
    question: {
        fontWeight: "bold",
        fontSize: 52,
        textAlign: "center"
    },
    deckTitleInput: {
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
        shadowRadius: 5
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

    }
});