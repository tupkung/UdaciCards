import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Animated} from 'react-native';

export default class QuizContainer extends Component {

    constructor(props){
        super(props);
        this.onPressCorrectButton = this.onPressCorrectButton.bind(this);
        this.onPressInCorrectButton = this.onPressInCorrectButton.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.state = {
            isPressAnswer: false
        };
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value })=>{
            this.value = value
        });
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        });
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        });
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        });
    
        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        });
    }

    onPressCorrectButton(){
        
    }

    onPressInCorrectButton(){
        
    }

    flipCard() {
        if (this.value >= 90){
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
        this.setState({
            isPressAnswer: !this.state.isPressAnswer
        });
    }

    render() {
        const frontAnimatedStyle = {
            transform: [
                { rotateX: this.frontInterpolate}
            ]
        };
        const backAnimatedStyle = {
            transform: [
                { rotateX: this.backInterpolate}
            ]
        };
        const frontOpacityStyle = {
            opacity: this.frontOpacity
        };
        const backOpacityStyle = {
            opacity: this.backOpacity
        };
        const {isPressAnswer} = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.cardNumber}>
                    <Text style={styles.cardNumberText}>2/2</Text>
                </View>
                <View style={styles.content}>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle, frontOpacityStyle]}>
                        <Text style={styles.question}>What is the title of your new deck?</Text>
                        
                    </Animated.View>
                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack, backOpacityStyle ]}>
                        <Text style={styles.question}>Yes!</Text>
                    </Animated.View>
                    <TouchableOpacity onPress={this.flipCard}>
                        <Text style={styles.answerText}>{isPressAnswer ? "Question" : "Answer"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.correctButton} onPress={this.onPressCorrectButton}>
                        <Text style={styles.correctText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inCorrectButton} onPress={this.onPressInCorrectButton}>
                        <Text style={styles.inCorrectText}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flipCard: {
        width: "100%",
        backfaceVisibility: "hidden",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 15
    },
    flipCardBack: {
        backfaceVisibility: "hidden",
        position: "absolute",
        top: 0
    },
    cardNumber: {
        flex: 1,
        padding: 5
    },
    cardNumberText: {
        fontSize: 18
    },
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 5
    },
    content: {
        flex: 9,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    question: {
        fontWeight: "bold",
        fontSize: 52,
        textAlign: "center"
    },
    correctButton: {
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        height: 50,
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: "#E8F5E9",
        opacity: 0.8,
        borderColor: "#ddd",
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 5
    },
    inCorrectButton: {
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        height: 50,
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: "#FFEBEE",
        opacity: 0.8,
        borderColor: "#ddd",
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 5
    },
    correctText: {
        fontSize: 28,
        color: "#4CAF50"
    },
    inCorrectText: {
        fontSize: 28,
        color: "#EF5350"
    },
    answerText: {
        fontSize: 28,
        fontWeight: "100",
        opacity: 0.5
    },
    questionText: {
        fontSize: 28
    }
});