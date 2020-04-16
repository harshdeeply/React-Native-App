import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { GameEngine } from "react-native-game-engine";
import { Net, L4Tile, L3Tile, L2Tile, CoreTile, Score } from "./renderers/renders";
import { Move } from "./systems/systems";
import * as Google from 'expo-google-app-auth';
import * as Animatable from 'react-native-animatable';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// import androidKey from './androidKey';
// import iosKey from './iosKey';

// const RootStack = createStackNavigator({
//     Game: {
//         screen: LoginPage,
//     },
//     LoggedInScreen: {
//         screen: LoggedInPage,
//     },
// },
//     {
//         initialRouteName: 'Home',
//     }
// );

// const createAppContainer = createAppContainer(RootStack);

const getRandomKey = () => Math.floor(Math.random() * Math.floor(10000));

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signedIn: false,
            name: "",
            photoUrl: ""
        }
    }
    signIn = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: '415053361677-aiug48esgc1nmdn7qbku43f9m78s7dqk.apps.googleusercontent.com',
                iosClientId: '415053361677-sdkod1ubvute2b9m8pifdjrs48cugd7d.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                console.log('success')
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    photoURL: result.user.photoUrl
                })
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log(e)
            return { error: true };
        }
    }
    render() {
        return this.state.signedIn ? (
                    <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
                ) : <LoginPage signIn={this.signIn} />
    }
}

const LoginPage = props => {
    return (
        <ImageBackground source={require('./bg.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ 
                    top: 150,
                    paddingTop: 85, 
                    width: '95%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    borderColor: 'white', 
                    borderWidth: 10, 
                    borderRadius: 500,
                    height: 400
                }}>
                    <Text style={{ fontSize: 80, textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Circular 2048</Text>
                </View>
                <View style={styles.loginPage}>
                    <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>Click below to sign in</Text>
                    <View style={{ width: 200, padding: 15 }}>
                        <Button title='Sign in' onPress={() => props.signIn()} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const LoggedInPage = props => {
    const screenWidth = Dimensions.get('window').width;
    const halfGridWidth = 180;
    const [k, setK] = useState(1);
    
    return (
        <ImageBackground source={require('./bg.jpg')} style={{width: '100%', height: '100%'}}>
        <GameEngine
        key={k}
        style={styles.container}
        systems={[Move]}
        entities={{
            1: {position: [254, 165], value: 0, renderer: <L4Tile/>},
            2: {position: [334, 248], value: 2, renderer: <L4Tile/>},
            3: {position: [334, 365], value: 2, renderer: <L4Tile/>},
            4: {position: [254, 448], value: 0, renderer: <L4Tile/>},
            5: {position: [132, 448], value: 0, renderer: <L4Tile/>},
            6: {position: [50, 365], value: 0, renderer: <L4Tile/>},
            7: {position: [50, 248], value: 0, renderer: <L4Tile/>},
            8: {position: [132, 165], value: 0, renderer: <L4Tile/>},
            9: {position: [268, 234], value: 4, renderer: <L3Tile/>},
            10: {position: [268, 384], value: 0, renderer: <L3Tile/>},
            11: {position: [118, 384], value: 0, renderer: <L3Tile/>},
            12: {position: [118, 234], value: 0, renderer: <L3Tile/>},
            13: {position: [254, 310], value: 0, renderer: <L2Tile/>},
            14: {position: [130, 310], value: 0, renderer: <L2Tile/>},
            15: {position: [194, 310], value: 0, renderer: <CoreTile/>},
            16: {position: [Math.floor(0.5*screenWidth) - halfGridWidth, 150], renderer: <Net/>},
            17: {value: 0, renderer: <Score/>},
            18: {value: 0, renderer: <ShowDirection />}
        }}>
            <StatusBar hidden={true}/>
            <View style={{ marginTop: 15, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Welcome: {props.name}</Text>
            </View>
            
        </GameEngine>
            
        <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 500, backgroundColor: '#2288dc' }}>
                <Button
                    buttonStyle={{ padding: 15 }}
                    title="start a new game ↺"
                    onPress={() => setK(getRandomKey())} 
                />
            </View>
        </View>
        </ImageBackground>
    )

}

const ShowDirection = props => {
    const animations = [
        {
            0: {
                top: 1000
            }, 
            1: {
                top: 500
            }
        },
        {
            0: {
                top: 0
            }, 
            1: {
                top: 500
            }
        },
        {
            0: {
                marginLeft: 1000
            }, 
            1: {
                marginLeft: 0
            }
        },
        {
            0: {
                marginLeft: -500
            }, 
            1: {
                marginLeft: 0
            }
        },
        "rubberBand"
    ];
    return props.gameLost ? (
        <View style={{ width:'100%', display: 'flex', alignItems: 'center', top: 500 }}>
            <Image style={{ height: 200, width: 300 }} source={{ uri: 'https://media.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif' }} />
        </View>
    ) : (
        <Animatable.Text
            key={props.usekey ? props.usekey : 0}
            duration={props.direction != undefined || props.direction != null ? 200 : 100} 
            animation={props.direction != undefined || props.direction != null ? animations[props.direction] : "rubberBand"} 
            style={{ top: 500, fontSize: 80, width: '100%', textAlign: 'center', color: 'white' }}
        >
            { props.direction != undefined || props.direction != null
                ? ['↑', '↓', '←', '→', '◎'][props.direction] : 'Swipe to play' }
        </Animatable.Text>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(46, 29, 73, 0.7)',
        alignContent: 'center',
        // justifyContent: 'center'
    },
    loginPage: {
        marginTop: 250,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
