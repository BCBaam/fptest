import {Finger, FingerCurl, FingerDirection, GestureDescription} from "fingerpose";

export const turnLeftGesture = new GestureDescription('turn_left');


for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  turnLeftGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
  turnLeftGesture.addDirection(finger, FingerDirection.HorizontalLeft, 0.7);
  turnLeftGesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.7);
}


