
import ApproximationMethod from "./ApproximationMethod";
import Function from "./Function";

export default class Euler extends ApproximationMethod {
    static findNext(x, y, h) {
        return y + h * Function.function(x, y);
    }
}