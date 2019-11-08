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


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 200,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    formHelperText: {
        marginLeft: theme.spacing(1),
        width: 300,
    }

}));
export default function render() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        N: 15,
        x0: 0,
        y0: 0,
        X: 5,
        left: 15,
        right: 100
    });
    let equation = '\\begin{cases} y\' = e^{2x} + e^x + y^2 - 2ye^x,\\\\ y(' + values.x0 + ') = ' + values.y0 + 
    ',    \\\\ x \\in [' + values.x0 + ', ' + values.X+'].\\end{cases}';
    let solution = 'y = \\frac{1}{' + Exact.c1(values.x0, values.y0) + ' - x} + e^x';


    const handleChange = name => event => {
        if (event.target.value !== '')
            setValues({ ...values, [name]: parseFloat(event.target.value) });
        else setValues({ ...values, [name]: 0.0 });
    };

    return (
        <div className={classes.root}>
            <h1>Sergey Makarov's Computational practicum on DE</h1>
            <Grid container spacing={1}>

                <Grid item xs={4}>
                    <Plot
                        data={[
                            {
                                x: Exact.graphSolution(values.N, values.x0, values.y0, values.X).x,
                                y: Exact.graphSolution(values.N, values.x0, values.y0, values.X).y,
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: "Black" },
                                line: { width: 2 },
                                name: "Exact"
                            },
                            {
                                x: Euler.graphSolution(values.N, values.x0, values.y0, values.X).x,
                                y: Euler.graphSolution(values.N, values.x0, values.y0, values.X).y,
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: "Red" },
                                line: { width: 2 },
                                name: "Euler"
                            },
                            {
                                x: ImprovedEuler.graphSolution(values.N, values.x0, values.y0, values.X).x,
                                y: ImprovedEuler.graphSolution(values.N, values.x0, values.y0, values.X).y,
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: "Green" },
                                line: { width: 2 },
                                name: "Improved Euler"
                            },
                            {
                                x: RungeKutta.graphSolution(values.N, values.x0, values.y0, values.X).x,
                                y: RungeKutta.graphSolution(values.N, values.x0, values.y0, values.X).y,
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
                            title: 'Graphs',
                            xaxis: { title: 'x' },
                            yaxis: { title: 'y' }
                        }}
                    />

                </Grid>

                <Grid item xs={4}>
                    <Plot
                        data={[
                            {
                                x: Euler.graphLocal(values.N, values.x0, values.y0, values.X).x,
                                y: Euler.graphLocal(values.N, values.x0, values.y0, values.X).y,
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: "Red" },
                                line: { width: 2 },
                                name: "Euler"
                            },
                            {
                                x: ImprovedEuler.graphLocal(values.N, values.x0, values.y0, values.X).x,
                                y: ImprovedEuler.graphLocal(values.N, values.x0, values.y0, values.X).y,
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: "Green" },
                                line: { width: 2 },
                                name: "Improved Euler"
                            },
                            {
                                x: RungeKutta.graphLocal(values.N, values.x0, values.y0, values.X).x,
                                y: RungeKutta.graphLocal(values.N, values.x0, values.y0, values.X).y,
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
                            title: 'Local Errors',
                            xaxis: { title: 'x' },
                            yaxis: { title: 'error' }
                        }}
                    />

                </Grid>
                <Grid item xs={3}>
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

                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <h2>Equation:</h2>

                    <MathJax.Context input='tex'>
                        <h3 className='equation'>
                            <MathJax.Node inline>{equation}</MathJax.Node>
                        </h3>
                    </MathJax.Context>
                </Grid>
                <Grid item xs={2}>
                    <h2>Analytical solution:</h2>

                    <MathJax.Context input='tex'>
                        <h3 className='equation'>
                            <MathJax.Node inline>{solution}</MathJax.Node>
                        </h3>
                    </MathJax.Context>
                </Grid>

                <Grid item xs={4}>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <h3>Change initial conditions:</h3>
                        </Grid>
                        <Grid item xs={4}>
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
                            <TextField
                                id="filled-number"
                                label={
                                    <MathJax.Context input='tex'>
                                        <div>
                                            <MathJax.Node inline>{'x_0'}</MathJax.Node>
                                        </div>
                                    </MathJax.Context>
                                }
                                onChange={handleChange('x0')}
                                type="number"
                                defaultValue={0.0}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <TextField
                                id="filled-number"
                                label='X'
                                defaultValue={5.0}
                                onChange={handleChange('X')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                variant="standard"
                            />
                            <TextField
                                id="filled-number"
                                label={
                                    <MathJax.Context input='tex'>
                                        <div>
                                            <MathJax.Node inline>{'y_0'}</MathJax.Node>
                                        </div>
                                    </MathJax.Context>
                                }
                                defaultValue={0.0}
                                onChange={handleChange('y0')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                variant="standard"
                            />

                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={2}>
                    <h3>
                        Change interval for the N on a graph of global errors
                    </h3>
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        id="filled-number"
                        label='left border'
                        onChange={handleChange('left')}
                        type="number"
                        defaultValue={15.0}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="standard"
                    />
                    <TextField
                        id="filled-number"
                        label='right border'
                        defaultValue={100.0}
                        onChange={handleChange('right')}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="standard"
                    />

                </Grid>
            </Grid>
        </div>
    );

}