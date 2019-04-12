import React, {Component} from 'react';

import { Button } from 'react-native';

class Demos extends Component {
    render() {
        return (
            <Button
                // onPress={onPressLearnMore}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        )
    }
}

export default Demos;

