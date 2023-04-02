import React, { Component } from 'react';
import PathFindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './Visualizer.css'
import AIVisualizer from './AIVisualizer/AIVisualizer';

export default class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'main',
            rendering: false,
            algorithms: [],
            currentAlgorithm: null,
            goFunction: () => { },
            resetFunction: () => { },
            setAlgorithm: () => { },
            sortingClicked: false,
            pathClicked: false,
            AIClicked: false,
            aicount: 0,
        };
        this.getFunctions = this.getFunctions.bind(this);
        this.changeRenderingState = this.changeRenderingState.bind(this);
    }

    changeRenderingState(rendering) {
        this.setState({ rendering: rendering });
    }

    getFunctions(go, reset, setAlgo, algorithms) {
        this.state.goFunction = go;
        this.state.resetFunction = reset;
        this.state.setAlgorithm = setAlgo;
        this.state.algorithms = algorithms;
        this.setState({ algorithms: algorithms });
    }

    render() {
        let renderObj = null;
        if (this.state.mode === 'pathfinding') {
            renderObj = <PathFindingVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions} />;
        }
        else if (this.state.mode === 'sorting') {
            renderObj = <SortingVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions} />;
        }
        else if (this.state.mode === 'ai') {
            renderObj = <AIVisualizer count={this.state.aicount} setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions}></AIVisualizer>
        }
        else {
            renderObj =
                <div class="welbotron">

                    <div class="container welc">

                        <h1 class='welcome'>Hello, algorithms.
                            <p class="quote">
                                
                                
                            </p>

                            <p class="lead">This website might help you understand algorithms better by visualizing them.</p>
                            <p class="secondline lead">Click on one of the categories below to visualize algorithms.</p>

                        </h1>
                        <a href='#' class='mainpage-b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'pathfinding' });
                                this.setState({ currentAlgorithm: null, pathClicked: true });
                            }
                        }} data-bs-toggle={this.state.pathClicked ? "" : "modal"} data-bs-target="#pathIntroModal">
                            <span></span>
                            PATH FINDING
                        </a>
                        <a href='#' class='mainpage-b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'sorting', currentAlgorithm: null, sortingClicked: true });
                            }
                        }} data-bs-toggle={this.state.sortingClicked ? "" : "modal"} data-bs-target="#sortingIntroModal">
                            <span></span>
                            SORTING
                        </a>
                        <a href='#' class='mainpage-b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'ai', currentAlgorithm: null, AIClicked: true });
                            }
                        }} data-bs-toggle={this.state.AIClicked ? "" : "modal"} data-bs-target="#aiIntroModal">
                            <span></span>
                            ARTIFICIAL INTELLIGENCE
                        </a>
                    </div>
                </div>
        }
        let invisibleOrNot = '';
        if (this.state.mode === 'main') invisibleOrNot = ' invisible';
        let algorithms = this.state.algorithms;
        return (
            <>
                <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-dark">
                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'main' });
                            }
                        }}
                        type="button" class="btn btn-dark navbtn"
                        disabled={this.state.rendering}
                    >Main</button>

                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'pathfinding', currentAlgorithm: null, pathClicked: true });
                                this.state.setAlgorithm(-1);
                            }
                        }}
                        type="button" class="btn btn-dark navbtn"
                        data-bs-toggle={this.state.pathClicked ? "" : "modal"} data-bs-target="#pathIntroModal"
                        disabled={this.state.rendering}
                    >Pathfinding</button>

                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'sorting', currentAlgorithm: null, sortingClicked: true });
                                this.state.setAlgorithm(-1);
                            }
                        }}
                        type="button" class="btn btn-dark navbtn"
                        data-bs-toggle={this.state.sortingClicked ? "" : "modal"} data-bs-target="#sortingIntroModal"
                        disabled={this.state.rendering}
                    >Sorting</button>

                    <button
                        onClick={() => {

                            if (!this.state.rendering) {
                                this.setState({ mode: 'ai', currentAlgorithm: null, AIClicked: true });
                                this.state.setAlgorithm(-1);
                            }
                        }}
                        type="button" class="btn btn-dark navbtn"
                        data-bs-toggle={this.state.AIClicked ? "" : "modal"} data-bs-target="#aiIntroModal"
                        disabled={this.state.rendering}
                    >AI</button>

                    <div class={"Dropdown" + invisibleOrNot}>
                    <button class="btn btn-secondary dropdown-toggle navbtn" type="button" id="DropdownMenuButton" data-bs-toggle="Dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.state.rendering}>
                            {this.state.currentAlgorithm == null ? 'Algorithms' : this.state.currentAlgorithm}
                        </button>
                        <div class="Dropdown-menu" aria-labelledby="DropdownMenuButton">
                            
                                {algorithms.map((algorithm, algoId) => {
                                    return (<button type="button" class="btn btn-light navbtn" onClick={() => {
                                        this.state.setAlgorithm(algoId);
                                        this.setState({ currentAlgorithm: this.state.algorithms[algoId] });
                                    }}>{algorithm}</button>);
                                }
                                )
                                }
                        </div>
                    </div>

                    <div class={"Dropdown" + invisibleOrNot}>
                       
                        <div class="Dropdown-menu" aria-labelledby="DropdownMenuButton">
                            
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.state.goFunction()} data-toggle={this.state.currentAlgorithm === null ? "modal" : ""} data-target="#setAlgoModal" disabled={this.state.mode === "ai" && this.state.currentAlgorithm === "Minimax"}>Go!</button>
                                <button type="button" class="btn btn-light navbtn" onClick={() => this.state.resetFunction()}>Reset</button>
                            
                            
                        </div>
                    </div>

                    


                    <a href="" style={{ marginLeft: "30%" }}>
                        <img class="githubimg" src="data:image/png;base64,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" width="40px" height="40px" style={{ opacity: "0.7 !important"}} alt></img>
                    </a>
                </nav>

                <div class="modal fade" id="setAlgoModal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h5 class="modal-title">No Algorithm Selected</h5>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body-alert">
                                <p>Please select an algorithm first.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-dark" data-dismiss="modal" style={{ width: '100px' }}>OK</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="modal fade" id="pathIntroModal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content intro">

                            <div class="modal-header">
                                <h5 class="modal-title">Pathfinding</h5>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body intro">
                                <p>
                                    Pathfinding is generally the process of finding a route between two points. It is closely related to the shortest path problem in graph theory,
                                    which examines how to identify the "best" paths valued by different criteria (Ex. distance, cost, time consumption).
                                </p>
                                <p>Pathfinding is also similar to Searching in some circumstances. For instance, we can use [breadth-first search] to find the shortest path in a grid world.</p>
                                <p>
                                    In our scenario, the paths are valued by the number of cells they passed from START:
                                    <div class="simg" width="20" height="20"></div>
                                    to the TARGET:
                                    <div class="fimg" width="20" height="20"></div>
                                    .
                                </p>
                                <p>You may drag the START and TARGET icons to change their positions, and click on the blank nodes to add Walls.</p>

                                <p>Now please choose a sorting algorithm and visualize it!</p>
                                <p class='tips'>(after choosing an algorithm, click on the [Actions] button.)</p><br />
                                <p class='tips'>Note: there could be multiple "best" paths, so paths generated by different algorithms may not be consistent.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-dark" data-dismiss="modal" style={{ width: '100px' }}>OK</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="modal fade" id="sortingIntroModal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content intro">

                            <div class="modal-header">
                                <h5 class="modal-title">Sorting</h5>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body intro">
                                <p>Sorting is a process of arranging an ordered sequence. It is a common operation in many applications.</p>
                                <p>Common uses of sorted sequences are:
                                    <div class='uses-list'>
                                        <p>·lookup or search efficiently</p>
                                        <p>·merge sequences efficiently</p>
                                        <p>·process data in a defined order</p>
                                    </div>
                                Now please choose a sorting algorithm and visualize it!
                                </p>
                                <p class='tips'>(after choosing an algorithm, click on the [Actions] button.)</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-dark" data-dismiss="modal" style={{ width: '100px' }}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="aiIntroModal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content intro">

                            <div class="modal-header">
                                <h5 class="modal-title">Artificial Intelligence</h5>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body intro">
                                <p>
                                    Artificial intelligence (AI) is intelligence demonstrated by machines.
                                    Leading textbooks define the field as the study of "intelligent agents":
                                    any device that perceives its environment and takes actions that maximize its
                                    chance of successfully achieving its goals.
                                </p>
                                <p>
                                    In this category, you will experience with powerful AI algorithms
                                    based on fundamental ideas. Please try to understand those ideas behind through the visualizations,
                                    and I would try my best to demonstrate those principles.
                                </p>
                                <p> Now please choose an algorithm and begin your journey!</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-dark" data-dismiss="modal" style={{ width: '100px' }}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {renderObj}
                </div>
            </>
        )
    }
}
