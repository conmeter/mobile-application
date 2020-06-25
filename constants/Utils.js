export const roundToTwo = (num) => {    
    return +(Math.round(num + "e+2")  + "e-2");
}

import { Vibration } from 'react-native';

export const vibratePhone = (time) => {
    Vibration.vibrate(time);
}