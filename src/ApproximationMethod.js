import Exact from "./Exact";

export default class ApproximationMethod {
    static graphSolution(N, x0, y0, X) {
        if (X <= x0) {
            return {x: [x0], y: [y0]};
        }
        let h = (X - x0) / N;

        let x = [x0];
        let y = [y0];
        for (let i = 1; i <= N; i++) {
            x.push(x[i - 1] + h);
            y.push(this.findNext(x[i - 1], y[i - 1], h));
        }
        return {x: x, y: y};

    }

    static findNext(x, y, x1) {
    };

    static graphLocal(N, x0, y0, X) {
        if (X <= x0) {
            return {x: [0], y: [0]};
        }
        let h = (X - x0) / N;
        let x = [x0];
        let y = [0];
        for (let i = 1; i <= N; i++) {
            x.push(x[i - 1] + h);
            y.push(Math.abs(Exact.solution(x0, y0, x[i - 1] + h) - this.findNext(x[i - 1], Exact.solution(x0, y0, x[i - 1]), h)));
        }
        return {x: x, y: y};
    }

    static graphGlobal(N0, N1, x0, y0, X) {
        let x = [];
        let y = [];
        if (X <= x0) {
            return {x: [0], y: [0]};
        }

        for (let i = N0; i <= N1; i++) {
            let x1 = x0;
            let h = (X - x0) / i;
            x.push(i);
            let max = 0.0;
            let graph = this.graphSolution(i, x0, y0, X);
            for (let j = 1; j <= i; j++) {
                max = Math.max(max,Math.abs(Exact.solution(x0, y0, x1 + h) - graph.y[j]));
                x1 += h;
            }
            y.push(max);
        }
        return {x: x, y: y};
    }

}
