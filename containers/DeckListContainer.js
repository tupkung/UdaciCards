import React, {Component} from 'react';
import {View, Text, StyleSheet, ListView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import actions from '../actions';

class DeckListContainer extends Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.createTime !== r2.createTime});
        this.state = {
            dataSource: ds.cloneWithRows([{title: "udacicards", cardNumber: 3, createTime: new Date().getTime()}, {title: "new deck", cardNumber: 0, createTime: new Date().getTime()}, {title: "New deck2", cardNumber: 0, createTime: new Date().getTime()}])
        }
    }

    componentDidMount() {
        const {loadDecks} = this.props;
        loadDecks();
    }

    onCardPress(rowId) {
        this.props.navigation.navigate("IndividualDeck",{rowId: rowId});
    }

    render() {
        const {decksList} = this.props;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.createTime !== r2.createTime});
        const dataSource =  ds.cloneWithRows(decksList)
        return (
            <View style={{flex:1}}>
                
                {(dataSource.getRowCount() <= 0)?
                    <View style={styles.noCard}><Text style={styles.noCardText}>No Cards</Text></View>
                    : 
                    <ListView
                        dataSource={dataSource}
                        renderRow={(rowData, sectionId, rowId) => 
                        <TouchableOpacity onPress={()=>{this.onCardPress(rowId)}}>
                            <View style={styles.card}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{rowData.title} </Text>
                                    <Text style={styles.cardNumber}>{rowData.cardNumber} cards</Text>
                                </View>
                            </View>
                        </TouchableOpacity>}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 150,
        padding: 5,
        flexDirection: "column"
    },
    cardContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#87b9ff",
        opacity: 0.8,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#ddd",
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 42
    },
    cardNumber: {
        fontWeight: "100",
        fontSize: 22
    },
    noCard: {
        flex: 1,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    noCardText: {
        fontWeight: "bold",
        fontSize: 48
    }
});

const mapStateToProps = ({decks}) => ({
    decksList: decks.dataCollection,
    uiState: decks.uiState
});

const mapDispatchToProps = (dispatch) => ({
    loadDecks: () => dispatch(actions.loadDecks())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckListContainer);