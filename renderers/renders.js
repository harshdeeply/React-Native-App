import React, {PureComponent} from "react";
import {Image, StyleSheet, View, Text} from "react-native";
import * as Animatable from 'react-native-animatable';

const getRandomKey = () => Math.floor(Math.random() * Math.floor(10000));

class Net extends PureComponent {
    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];
        return (
                <Image
                    style={[{width: 360, height: 360, tintColor: 'red'}, styles.all, {left: x, top: y}]}
                    source={require('../sprites/net.png')}
                />
        );
    }
}

class Score extends PureComponent {
    render() {
        var value = this.props.value;
        let txt = 'Score: ' + value + '.'
        return (
            <View style={{ 
                top: 60, 
                width: '100%', 
                padding: 15,
                display: 'flex', 
                alignItems: 'center' 
            }}>
                <Text style={[
                    styles.all, 
                    {
                        width: 200,
                        fontSize: 30, 
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'white'
                    }
                ]}>
                    {value}
                </Text>
            </View>
        );
    }
}

const getAnimationObject = (x, y, n, direction) => {
    let obj = {};
    for (let i = 0; i <= n; i++) {
        const proportion = i * 1.0 / n;
        if (direction === 'up-right') {
            obj[proportion.toString().substr(0, 3)] = {
                left: Math.floor(x + 80.0 * proportion),
                top: Math.floor(y - 80.0 * proportion),
            }
        } else if (direction === 'up-left') {
            obj[proportion.toString().substr(0, 3)] = {
                left: Math.floor(x - 80.0 * proportion),
                top: Math.floor(y - 80.0 * proportion),
            }
        } else if (direction === 'down-left') {
            obj[proportion.toString().substr(0, 3)] = {
                left: Math.floor(x - 80.0 * proportion),
                top: Math.floor(y + 80.0 * proportion),
            }
        } else if (direction === 'down-right') {
            obj[proportion.toString().substr(0, 3)] = {
                left: Math.floor(x + 80.0 * proportion),
                top: Math.floor(y + 80.0 * proportion),
            }
        } else if (direction === 'up') {
            obj[proportion.toString().substr(0, 3)] = {
                top: Math.floor(y - 80.0 * proportion)
            }
        } else if (direction === 'down') {
            obj[proportion.toString().substr(0, 3)] = {
                top: Math.floor(y + 80.0 * proportion)
            }
        } else if (direction === 'right') {
            obj[proportion.toString().substr(0, 3)] = {
                left: Math.floor(x + 80.0 * proportion)
            }
        } else if (direction === 'left') {
            obj[proportion.toString().substr(0, 3)] = {
                left: Math.floor(x - 80.0 * proportion)
            }
        }
    }
    obj['0'].opacity = 1.0;
    obj[Object.keys(obj).slice(-1)].opacity = 0.0;
    // obj['1'] = {}
    // obj['1'].left = x;
    // obj['1'].top = y;
    // obj['1'].opacity = 1;
    console.log(obj);
    return obj;
}

class L4Tile extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            endAnimation: false  
        };
    }
    
    render() {
        var value = this.props.value;
        // console.log(this.props);
        const x = (value.toString().length > 1) ? this.props.position[0] - 10 : this.props.position[0]
        const y = this.props.position[1];
        let r = (
            <Text style={[styles.all, {left: x, top: y, fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'white'}]}>
                {value == 0 ? '' : value + '.'}
            </Text>
        );
        
        if (!this.state.endAnimation && this.props.animate != null) {
            r = (
                <Animatable.Text 
                    key={getRandomKey()} 
                    duration={1000} 
                    easing="ease-in" 
                    animation={getAnimationObject(x, y, 3, this.props.animate)} 
                    onAnimationEnd={() => this.setState({ endAnimation: true })}
                    style={[
                        styles.all, 
                        {
                            left: x, 
                            top: y, 
                            fontSize: 30, 
                            fontWeight: 'bold', 
                            textAlign: 'center',
                            color: 'white'
                        }
                    ]}
                >
                    {this.props.previousValue ? this.props.previousValue + '.' : value}
                </Animatable.Text>
            );
        }
        
        if (this.state.endAnimation && this.props.pulse) {
            r = (
                <Animatable.Text 
                    key={getRandomKey()} 
                    duration={100}
                    animation="rubberBand"
                    style={[
                        styles.all, 
                        {
                            left: x, 
                            top: y, 
                            fontSize: 30, 
                            fontWeight: 'bold', 
                            textAlign: 'center',
                            color: 'white'
                        }
                    ]}
                >
                    {value == 0 ? '' : value + '.'}
                </Animatable.Text>
            )
        }
        
        return r;
    }
}

class L3Tile extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            endAnimation: false  
        };
    }
    
    render() {
        var value = this.props.value;
        // console.log(this.props);
        const x = (value.toString().length > 1) ? this.props.position[0] - 10 : this.props.position[0]
        const y = this.props.position[1];
        let r = (
            <Text style={[styles.all, {left: x, top: y, fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'white'}]}>
                {value == 0 ? '' : value + '.'}
            </Text>
        );
        
        if (!this.state.endAnimation && this.props.animate != null) {
            r = (
                <Animatable.Text 
                    key={getRandomKey()} 
                    duration={1000} 
                    easing="ease-in" 
                    animation={getAnimationObject(x, y, 3, this.props.animate)} 
                    onAnimationEnd={() => this.setState({ endAnimation: true })}
                    style={[
                        styles.all, 
                        {
                            left: x, 
                            top: y, 
                            fontSize: 30, 
                            fontWeight: 'bold', 
                            textAlign: 'center',
                            color: 'white'
                        }
                    ]}
                >
                    {this.props.previousValue ? this.props.previousValue + '.' : value}
                </Animatable.Text>
            );
        }
        
        if (this.props.pulse) {
            r = (
                <Animatable.Text 
                    key={getRandomKey()} 
                    duration={100}
                    animation="rubberBand"
                    style={[
                        styles.all, 
                        {
                            left: x, 
                            top: y, 
                            fontSize: 30, 
                            fontWeight: 'bold', 
                            textAlign: 'center',
                            color: 'white'
                        }
                    ]}
                >
                    {value == 0 ? '' : value + '.'}
                </Animatable.Text>
            )
        }
        
        return r;
    }
}

class L2Tile extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            endAnimation: false  
        };
    }
    
    render() {
        var value = this.props.value;
        // console.log(this.props);
        const x = (value.toString().length > 1) ? this.props.position[0] - 10 : this.props.position[0]
        const y = this.props.position[1];
        let r = (
            <Text style={[styles.all, {left: x, top: y, fontSize: 30, fontWeight: 'bold', textAlign: 'center',
            color: 'white'}]}>
                {value == 0 ? '' : value + '.'}
            </Text>
        );
        
        if (!this.state.endAnimation && this.props.animate != null) {
            r = (
                <Animatable.Text 
                    key={getRandomKey()} 
                    duration={1000} 
                    easing="ease-in" 
                    animation={getAnimationObject(x, y, 3, this.props.animate)} 
                    onAnimationEnd={() => this.setState({ endAnimation: true })}
                    style={[
                        styles.all, 
                        {
                            left: x, 
                            top: y, 
                            fontSize: 30, 
                            fontWeight: 'bold', 
                            textAlign: 'center',
                            color: 'white'
                        }
                    ]}
                >
                    {this.props.previousValue ? this.props.previousValue + '.' : value}
                </Animatable.Text>
            );
        }
        
        if (this.props.pulse) {
            r = (
                <Animatable.Text 
                    key={getRandomKey()} 
                    duration={100}
                    animation="rubberBand"
                    style={[
                        styles.all, 
                        {
                            left: x, 
                            top: y, 
                            fontSize: 30, 
                            fontWeight: 'bold', 
                            textAlign: 'center',
                            color: 'white'
                        }
                    ]}
                >
                    {value == 0 ? '' : value + '.'}
                </Animatable.Text>
            )
        }
        
        return r;
    }
}

class CoreTile extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            endAnimation: false  
        };
    }
    
    render() {
        var value = this.props.value;
        // console.log(this.props);
        const x = (value.toString().length > 1) ? this.props.position[0] - 10 : this.props.position[0]
        const y = this.props.position[1];
        let r = (
            <Text style={[styles.all, {left: x, top: y, fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'white'}]}>
                {value == 0 ? '' : value + '.'}
            </Text>
        );
        
        if (!this.state.endAnimation && this.props.animate != null) {
            r = (
                <Animatable.Text 
                    key={getRandomKey()} 
                    duration={1000} 
                    easing="ease-in" 
                    animation={getAnimationObject(x, y, 3, this.props.animate)} 
                    onAnimationEnd={() => this.setState({ endAnimation: true })}
                    style={[
                        styles.all, 
                        {
                            left: x, 
                            top: y, 
                            fontSize: 30, 
                            fontWeight: 'bold', 
                            textAlign: 'center',
                            color: 'white'
                        }
                    ]}
                >
                    {this.props.previousValue ? this.props.previousValue + '.' : value}
                </Animatable.Text>
            );
        }
        
        if (this.props.pulse) {
            r = (
                <Animatable.Text 
                    key={getRandomKey()} 
                    duration={100}
                    animation="rubberBand"
                    style={[
                        styles.all, 
                        {
                            left: x, 
                            top: y, 
                            fontSize: 30, 
                            fontWeight: 'bold', 
                            textAlign: 'center',
                            color: 'white'
                        }
                    ]}
                >
                    {value == 0 ? '' : value + '.'}
                </Animatable.Text>
            )
        }
        
        return r;
    }
}

const styles = StyleSheet.create({
    all: {
        position: 'absolute'
    }
});

export {Net, L4Tile, L3Tile, L2Tile, CoreTile, Score};
