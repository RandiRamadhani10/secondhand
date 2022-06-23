import {Animated, PanResponder, Dimensions} from 'react-native';

const ANIMATED = {
  HIDDEN: -350,
  FULL_OPEN: -100,
  VISIBLE: -300,
};

const {height} = Dimensions.get('window');

const STARTING_POSITION = ANIMATED.HIDDEN - ANIMATED.FULL_OPEN;

const animatedPosition = new Animated.Value(STARTING_POSITION);

function animateMove(toValue) {
  Animated.spring(animatedPosition, {
    toValue,
    tension: 120,
  }).start();
}

function movementValue(gestureState) {
  return height - gestureState.moveY + ANIMATED.VISIBLE;
}

function onMoveShouldSetPanResponder(_, gestureState) {
  return gestureState.dy >= 10 || gestureState.dy <= -10;
}

function onPanResponderMove(_, gestureState) {
  const toValue = Math.min(0, movementValue(gestureState));

  animateMove(toValue);
}

function onPanResponderRelease(_, gestureState) {
  const isMovedMoreThenThird =
    movementValue(gestureState) < ANIMATED.HIDDEN / 3;
  const toValue = isMovedMoreThenThird ? STARTING_POSITION : 0;

  animateMove(toValue);
}

const panGesture = PanResponder.create({
  onPanResponderMove,
  onPanResponderRelease,
  onMoveShouldSetPanResponder,
  onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
});

export {animatedPosition, panGesture};
