import Function from "./Function";
import ApproximationMethod from "./ApproximationMethod";

export default class Euler extends ApproximationMethod {
    static findNext(x, y, h) {
        return y + h * Function.function(x, y);
    }
}