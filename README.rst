Computational Practicum on differential equations
=================================================

Author: Sergey Makarov
----------------------

Preview:
--------

.. figure:: https://i.imgur.com/zeMld43.png
   :alt: 

Part 1: Exact solution
----------------------

.. math:: y' = e^{2x} + e^x + y^2 - 2ye^x

My equation is the Ricatti one, so we should make a substitution
:math:`y = y_0 + z`. As :math:`y_0` I will take :math:`e^x`, as it is
definitely a solution. From this, :math:`y' = z' + e^x`. Now substitute
to the intitial equation:

.. math:: z' + e^x = e^{2x} + e^x + z^2 + 2ze^{x} + e^{2x} - 2 ze^x-2 e^{2x}

simplifying:

.. math:: z' = z^2

This is just a separable equation:

.. math:: \frac{dz}{z^2} = dx

Solution of this is:

.. math:: z(x) = \frac{1}{c_1 - x}

Thus, the general solution is:

.. math:: y = e^x + \frac{1}{c_1 - x}

## Part 2: source code

### GUI I used ``React`` javascript framework, ``plotly.js`` for
plotting graphs, ``material-ui`` styles to make the web page better
looking and ``Mathjax`` library to write formulas with ``tex``. There is
a list of all my dependencies:
``js import Exact from "./Exact"; import Plot from "react-plotly.js" import React from 'react'; import { makeStyles } from '@material-ui/core/styles'; import TextField from '@material-ui/core/TextField'; import Grid from '@material-ui/core/Grid' import MathJax from 'react-mathjax2' import Euler from "./Euler"; import ImprovedEuler from "./ImprovedEuler"; import './App.css' import RungeKutta from "./RungeKutta";``

In my solution there is an ``App.js`` file, which is responsible for the
whole webpage. It consists of some plots from ``plotly.js``:

\`\`\`js ``You can see, that in plots I assign to fields``\ x\ ``and``
y\ ``in``\ Plot\ ``vectors, returned by approximation methods. To approximation methods as arguments I send values, defined by this code:``\ js
const [values, setValues] = React.useState({ N: 15, x0: 0, y0: 0, X: 5,
left: 15, right: 100 }); ``and updated by this code:``\ js const
handleChange = name => event => { if (event.target.value !== '')
setValues({ ...values, [name]: parseFloat(event.target.value) }); else
setValues({ ...values, [name]: 0.0 }); };
``This code checks whether the input is empty and in this case assigns zero, otherwise assigns what is stored in the``\ event.target.value\`\`\`.
There are also several textfields for input, which have approximately
this structure:

.. code:: js

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

Here, I define default value, label, and what to do when value is
changed (call function ``handleChange``, which you saw before).

To adjust layout I used ``<Grid\>`` from the ``material-ui``

Calculations
~~~~~~~~~~~~

First of all, there is class ``Function``, which contains our function,
which is used in all approximation methods:

.. code:: js

    export default class Function {
        static function(x, y) {
            return Math.pow(Math.E, 2 * x) + Math.pow(Math.E, x) + y * y - 2 * y * Math.pow(Math.E, x);
        }
    }

Here, I have a class ``Exact``:

.. code:: js

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

Class ``Approximation method`` contains methods for plotting, but
implementation of ``findNext`` function is up to his child classes.
Classes ``Euler``, ``ImprovedEuler`` and ``Runge-Kutta`` extends him,
adding it's own implementation: ### ApproximationMethod:

.. code:: js

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

Euler, ImprovedEuler and RungeKutta:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: js

    import ApproximationMethod from "./ApproximationMethod";

    export default class Euler extends ApproximationMethod {
        static findNext(x, y, h) {
            return y + h * Function.function(x, y);
        }
    }

.. code:: js

    import ApproximationMethod from "./ApproximationMethod";

    export default class ImprovedEuler extends ApproximationMethod {
        static findNext(x, y, h) {
            let k1 = Function.function(x, y);
            let k2 = Function.function(x + h, y + h * k1);
            return y + (h / 2) * (k1 + k2);
        }
    }

.. code:: js

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

Class diagram:
--------------

.. figure:: https://i.imgur.com/JOE8XjZ.png
   :alt: 


