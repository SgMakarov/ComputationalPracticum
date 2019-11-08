import ApproximationMethod from "./ApproximationMethod";
import Function from "./Function";

export default class RungeKutta extends ApproximationMethod {
    static findNext(x, y, h) {
        let k1 = Function.function(x, y);
        let k2 = Function.function(x + h / 2, y + (h / 2) * k1);
        let k3 = Function.function(x + h / 2, y + (h / 2) * k2);
        let k4 = Function.function(x + h, y + h * k3);
        return y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4)
    }

}