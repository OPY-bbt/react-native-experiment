import React, {Component} from 'react';

import { Button, View, StyleSheet } from 'react-native';

class Demos extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Home'),
        };
    }

    state = {
        routes: [
            {
                title: '弹框',
                path: 'modal',
            },
            {
                title: '上传图片',
                path: 'gallery',
            },
            {
                title: '医生端',
                path: 'spa',
            }, {
                title: '拍照',
                path: 'camera',
            }
        ],
    }

    navigateTo = (route) => {
        this.props.navigation.navigate(route.path, route);
    }

    render() {
        const { routes } = this.state;

        return (
            <View style={styles.container}>
                {
                    routes.map((route) => (
                        <View
                            key={route.title}
                            style={styles.link}
                        >
                            <Button
                                onPress={this.navigateTo.bind(null, route)}
                                title={route.title}
                                color="#841584"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        </View>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
    },
    link: {
        backgroundColor: '#F5FCFF',
        paddingTop: 10,
        paddingBottom: 10,
    }
});

export default Demos;
