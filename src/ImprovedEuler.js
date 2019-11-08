import ApproximationMethod from "./ApproximationMethod";
import Function from "./Function";

export default class ImprovedEuler extends ApproximationMethod {
    static findNext(x, y, h) {
        let k1 = Function.function(x, y);
        let k2 = Function.function(x + h, y + h * k1);
        return y + (h / 2) * (k1 + k2);
    }
}