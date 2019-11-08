import ApproximationMethod from './ApproximationMethod'

export default class Exact {

    static c1(x0, y0) {
        return x0 - 1 / (-y0 + Math.pow(Math.E, x0));
    }

    static solution(x0, y0, x) {
        return ((1 / (this.c1(x0, y0) - x)) + Math.pow(Math.E, x));
    }


    static graphSolution(N, x0, y0, X) {
        let h = (X - x0) / N;

        if (h <= 0)
            return [[x0], [y0]];
        let x = [];
        let y = [];
        for (let i = x0; i <= X + 0.0000001; i += h) {
            x.push(i);
            y.push(this.solution(x0, y0, i));
        }
        return {x: x, y: y};
    }


}
