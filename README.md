# Computational Practicum on differential equations

## Author: Sergey Makarov
## Preview:
    
![](https://i.imgur.com/zeMld43.png)



## Part 1: Exact solution 


<p align="center"><img src="https://rawgit.com/SgMakarov/ComputationalPracticum (fetch/master/svgs/84e3d8c83ad291f60b87ca0b147c3f4f.svg?invert_in_darkmode" align=middle width=181.8663pt height=17.399085pt/></p>
My equation is the Ricatti one, so we should make a substitution <img src="https://rawgit.com/SgMakarov/ComputationalPracticum (fetch/master/svgs/70b61f28e8af29488f2dc72e423fce31.svg?invert_in_darkmode" align=middle width=74.45955pt height=19.17828pt/>. As <img src="https://rawgit.com/SgMakarov/ComputationalPracticum (fetch/master/svgs/14adeddbb1889c9aba973ba30e7bce77.svg?invert_in_darkmode" align=middle width=14.61207pt height=14.15535pt/> I will take <img src="https://rawgit.com/SgMakarov/ComputationalPracticum (fetch/master/svgs/b6b70db98c2a5c2031dea120886f8211.svg?invert_in_darkmode" align=middle width=15.108555pt height=21.8394pt/>, as it is definitely a solution. From this, <img src="https://rawgit.com/SgMakarov/ComputationalPracticum (fetch/master/svgs/f45167ac1d27e822f9411e7ad52c0672.svg?invert_in_darkmode" align=middle width=83.358pt height=24.71634pt/>. Now substitute to the intitial equation:

<p align="center"><img src="https://rawgit.com/SgMakarov/ComputationalPracticum (fetch/master/svgs/4c7a43a119b3dfb891dd0e798b2cb5ff.svg?invert_in_darkmode" align=middle width=363.0198pt height=15.572667pt/></p>
simplifying:

<p align="center"><img src="https://rawgit.com/SgMakarov/ComputationalPracticum (fetch/master/svgs/6af8a51776d4fe26e84d5980f5e5eb5c.svg?invert_in_darkmode" align=middle width=49.817295pt height=14.2027875pt/></p>

This is just a separable equation:

<p align="center"><img src="https://rawgit.com/SgMakarov/ComputationalPracticum (fetch/master/svgs/9a445c304eb40fafee2012a803edc1d3.svg?invert_in_darkmode" align=middle width=58.76475pt height=33.81213pt/></p>

Solution of this is:

<p align="center"><img src="https://rawgit.com/SgMakarov/ComputationalPracticum (fetch/master/svgs/b4adb285675fc20b3075404955ad25e0.svg?invert_in_darkmode" align=middle width=98.412765pt height=35.45586pt/></p>

Thus, the general solution is:

<p align="center"><img src="https://rawgit.com/SgMakarov/ComputationalPracticum (fetch/master/svgs/2e17feb336766cd601b4081561c19a38.svg?invert_in_darkmode" align=middle width=112.535445pt height=35.45586pt/></p>

 

 ## Part 2: source code

 ### GUI
 I used ```React ``` javascript framework, ```plotly.js``` for plotting graphs, ```material-ui``` styles to make the web page better looking and ```Mathjax``` library to write formulas with ```tex```.  There is a list of all my dependencies:
 ```js
import Exact from "./Exact";
import Plot from "react-plotly.js"
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import MathJax from 'react-mathjax2'
import Euler from "./Euler";
import ImprovedEuler from "./ImprovedEuler";
import './App.css'
import RungeKutta from "./RungeKutta";
 ```

 In my solution there is an ```App.js``` file, which is responsible for the whole webpage. It consists of some plots from ```plotly.js```:
 
 ```js
<Plot
    data={[
        {
            x: Euler.graphGlobal(values.left, values.right, values.x0, values.y0, values.X).x,
            y: Euler.graphGlobal(values.left, values.right, values.x0, values.y0, values.X).y,
            type: 'scatter',
            mode: 'lines',
            marker: { color: "Red" },
            line: { width: 2 },
            name: "Euler"
        },
        {
            x: ImprovedEuler.graphGlobal(values.left, values.right, values.x0, values.y0, values.X).x,
            y: ImprovedEuler.graphGlobal(values.left, values.right, values.x0, values.y0, values.X).y,
            type: 'scatter',
            mode: 'lines',
            marker: { color: "Green" },
            line: { width: 2 },
            name: "Improved Euler"
        },
        {
            x: RungeKutta.graphGlobal(values.left, values.right, values.x0, values.y0, values.X).x,
            y: RungeKutta.graphGlobal(values.left, values.right, values.x0, values.y0, values.X).y,
            type: 'scatter',
            mode: 'lines',
            marker: { color: "Blue" },
            line: { width: 2 },
            name: "Runge-Kutta"
        },

    ]
    }
    layout={{
        width: 650,
        height: 700,
        title: 'Global Errors',
        xaxis: { title: 'N' },
        yaxis: { title: 'error' }
    }}
/>
 ```
You can see, that in plots I assign to fields ```x``` and``` y``` in ```Plot``` vectors, returned by approximation methods. To approximation methods as arguments I send values, defined by this code:
```js
const [values, setValues] = React.useState({
        N: 15,
        x0: 0,
        y0: 0,
        X: 5,
        left: 15,
        right: 100
    });
```
and updated by this code:
```js
const handleChange = name => event => {
        if (event.target.value !== '')
            setValues({ ...values, [name]: parseFloat(event.target.value) });
        else setValues({ ...values, [name]: 0.0 });
    };
```
This code checks whether the input is empty and in this case assigns zero, otherwise assigns what is stored in the ```event.target.value```. There are also several textfields for input, which have approximately this structure:

```js
<TextField
    id="filled-number"
    label="N"
    variant='standard'
    defaultValue={15.0}
    onChange={handleChange('N')}
    type="number"
    className={classes.textField}
    InputLabelProps={{
        shrink: true,
    }}
    margin="normal"
/>
```
Here, I define default value, label, and what to do when value is changed (call function ```handleChange```, which you saw before). 

To adjust layout I used ```<Grid\>``` from the ```material-ui```

### Calculations
First of all, there is class ```Function```, which contains our function, which is used in all approximation methods:
```js
export default class Function {
    static function(x, y) {
        return Math.pow(Math.E, 2 * x) + Math.pow(Math.E, x) + y * y - 2 * y * Math.pow(Math.E, x);
    }
}
```


Here, I have a class ```Exact```:

```js
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
```

Class ```Approximation method``` contains methods for plotting, but implementation of ```findNext``` function is up to his child classes. Classes ```Euler```, ```ImprovedEuler``` and ```Runge-Kutta``` extends him, adding it's own implementation:
### ApproximationMethod:

```js
import Exact from "./Exact";
import Function from "./Function";

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
```

### Euler, ImprovedEuler and RungeKutta:

```js
import ApproximationMethod from "./ApproximationMethod";

export default class Euler extends ApproximationMethod {
    static findNext(x, y, h) {
        return y + h * Function.function(x, y);
    }
}
```
```js
import ApproximationMethod from "./ApproximationMethod";

export default class ImprovedEuler extends ApproximationMethod {
    static findNext(x, y, h) {
        let k1 = Function.function(x, y);
        let k2 = Function.function(x + h, y + h * k1);
        return y + (h / 2) * (k1 + k2);
    }
}
```
```js
import ApproximationMethod from "./ApproximationMethod";

export default class RungeKutta extends ApproximationMethod {
    static findNext(x, y, h) {
        let k1 = Function.function(x, y);
        let k2 = Function.function(x + h / 2, y + (h / 2) * k1);
        let k3 = Function.function(x + h / 2, y + (h / 2) * k2);
        let k4 = Function.function(x + h, y + h * k3);
        return y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4)
    }

}
```

## Class diagram:
    
![](https://i.imgur.com/hT0hvUx.png)

<<<<<<< HEAD

=======
>>>>>>> b7375c5f4d901995f328c80c2bcef9e268640f60

