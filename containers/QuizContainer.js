import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Animated} from 'react-native';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers';

export default class QuizContainer extends Component {

    constructor(props){
        super(props);
        this.onPressCorrectButton = this.onPressCorrectButton.bind(this);
        this.onPressInCorrectButton = this.onPressInCorrectButton.bind(this);
        this.onPressBackButton = this.onPressBackButton.bind(this);
        this.onPressRestartButton = this.onPressRestartButton.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.showFlipCard = this.showFlipCard.bind(this);
        this.showScore = this.showScore.bind(this);
        this.state = {
            isPressAnswer: false,
            questions: [],
            correctNumber: 0,
            inCorrectNumber: 0,
            currentIndex: 0
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

    componentWillUnmount() {
        this.animatedValue.removeAllListeners();
    }

    componentDidMount() {

        const {navigation} = this.props;
        const {questions} = navigation.state.params;

        this.setState({
            questions: questions,
            correctNumber: 0,
            inCorrectNumber: 0
        });

        clearLocalNotification().then(setLocalNotification);
    }

    onPressCorrectButton(){
        const {correctNumber, currentIndex} = this.state;

        this.setState({
            correctNumber: correctNumber + 1,
            currentIndex: currentIndex + 1
        });
    }

    onPressInCorrectButton(){
        const {inCorrectNumber, currentIndex} = this.state;

        this.setState({
            inCorrectNumber: inCorrectNumber + 1,
            currentIndex: currentIndex + 1
        });
        
    }

    onPressRestartButton() {
        this.setState({
            correctNumber: 0,
            inCorrectNumber: 0,
            currentIndex: 0
        });
    }

    onPressBackButton() {
        const {navigation} = this.props;

        navigation.goBack();
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

    showFlipCard() {
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
        const {isPressAnswer, questions, currentIndex} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.cardNumber}>
                    <Text style={styles.cardNumberText}>{currentIndex + 1}/{questions.length}</Text>
                </View>
                <View style={styles.content}>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle, frontOpacityStyle]}>
                        <Text style={styles.question}>{questions[currentIndex].question}</Text>
                        
                    </Animated.View>
                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack, backOpacityStyle ]}>
                        <Text style={styles.question}>{questions[currentIndex].answer}</Text>
                    </Animated.View>
                    <TouchableOpacity onPress={this.flipCard}>
                        <Text style={styles.answerText}>{isPressAnswer ? "Question" : "Show Answer"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.correctButton} onPress={this.onPressCorrectButton}>
                        <Text style={styles.correctText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inCorrectButton} onPress={this.onPressInCorrectButton}>
                        <Text style={styles.inCorrectText}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    showScore() {
        const {correctNumber, questions} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.result}>
                    <View>
                        <Text style={styles.question}>Your score is </Text>
                    </View>
                    <View>
                        <Text style={styles.scoreText}>{correctNumber}/{questions.length}</Text>
                    </View>
                    <TouchableOpacity style={styles.restartButton} onPress={this.onPressRestartButton}>
                        <Text style={styles.buttonText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backButton} onPress={this.onPressBackButton}>
                        <Text style={styles.buttonText}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        
        const {currentIndex, questions} = this.state;

        return(
            (currentIndex < questions.length) ?
                this.showFlipCard()
            :
                this.showScore()
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
    result: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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
    },
    restartButton: {
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
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 5
    },
    backButton: {
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
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 5
    },
    buttonText: {
        fontSize: 28
    },
    scoreText: {
        fontSize: 38,
        color: "#c94c4c",
        fontWeight: "bold"
    }
});