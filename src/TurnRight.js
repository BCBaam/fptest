import {Finger, FingerCurl, FingerDirection, GestureDescription} from "fingerpose";

export const turnRightGesture = new GestureDescription('turn_right');

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  turnRightGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
  turnRightGesture.addDirection(finger, FingerDirection.HorizontalRight, 0.7);
  turnRightGesture.addDirection(finger,FingerDirection.DiagonalUpRight, 0.7);
}
