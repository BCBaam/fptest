import {Finger, FingerCurl, FingerDirection, GestureDescription} from "fingerpose";

export const turnLeftGesture = new GestureDescription('turn_left');
//ring
turnLeftGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, .9);
turnLeftGesture.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 0.25);
//pinky
turnLeftGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, .9);
turnLeftGesture.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 0.25);
//middle
turnLeftGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, .9);
turnLeftGesture.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 0.25);
//index
turnLeftGesture.addCurl(Finger.Index, FingerCurl.NoCurl, .9);
turnLeftGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.25);
//thumb




