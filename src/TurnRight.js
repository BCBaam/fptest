import {Finger, FingerCurl, FingerDirection, GestureDescription} from "fingerpose";

export const turnRightGesture = new GestureDescription('turn_right');

turnRightGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, .9)
turnRightGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, .9)
turnRightGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, .9)
turnRightGesture.addCurl(Finger.Index, FingerCurl.NoCurl, .9)

turnRightGesture.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 0.25)
turnRightGesture.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.25)
turnRightGesture.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 0.25)
turnRightGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.25)
