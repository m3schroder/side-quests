import React from 'react';
import LottieView from 'lottie-react-native';

function SuccessIndicator({visible = false}) {
    if (!visible) return null;
    return (
        <LottieView
        autoPlay
        source={require("../assets/animations/check.json")}
        />
    );
}

export default SuccessIndicator;