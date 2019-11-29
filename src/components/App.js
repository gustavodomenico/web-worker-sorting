import React from 'react';
import './App.css';

import {Card, Container, Row, Col} from 'react-bootstrap';

import ControlPanel from "./ControlPanel";
import WorkersTable from "./WorkersTable";

import Configuration from "../common/Configuration";
import WebWorkerPool from "../workers/WebWorkerPool";
import ResultModal from "./ResultModal";

// import IsArraySorted from "../algorithm/IsArraySorted";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workers: [],
            interval: 250,
            started: false,
            showResults: false,
            workersCount: 2,
            originalArray: [],
            sortedArray: []
        }
    };

    handleStartButtonClick() {
        const workersCount = this.state.workersCount;
        let workers = [...Array(workersCount).keys()].map((n) => ({
            id: n,
            isPaused: false,
            isFinished: false,
            progress: 0,
            status: "Working",
            size: Configuration.ARRAY_SIZE
        }));

        const array = Array.from({length: Configuration.ARRAY_SIZE}, (v, k) => Math.floor((Math.random() * Configuration.ARRAY_SIZE) + k));

        const onWorkerFinished = (id, m) => {
            this.setState(prevState => ({
                workers: prevState.workers.map(
                    el => el.id === id ? {...el, status: 'Done', isFinished: true, sortedArray: m.data.value} : el
                )
            }))
        };

        const onWorkerProgress = (id, m) => {
            this.setState(prevState => ({
                workers: prevState.workers.map(
                    el => el.id === id ? {...el, status: 'Working...', progress: m.data.value} : el
                )
            }))
        };

        const onWorkerUpdated = (id, m) => {
            this.setState(prevState => ({
                workers: prevState.workers.map(
                    el => el.id === id ? {...el, size: m.data.value} : el
                )
            }))
        };

        this.webWorkerPool = new WebWorkerPool();
        this.webWorkerPool.start(workersCount,
            array, this.state.interval, onWorkerFinished, onWorkerProgress, onWorkerUpdated);

        this.setState(
            {
                started: true,
                workers: workers,
                originalArray: array
            });
    };

    handleStopButtonClick() {
        this.webWorkerPool.stop();
        this.setState({started: false});
    };

    handleIntervalChange(e) {
        this.setState({interval: e.target.value});
    };

    handleWorkersCountChange(e) {
        if (e.target.value)
            this.setState({workersCount: parseInt(e.target.value)});
    };

    handlePauseButtonClick(w) {
        this.webWorkerPool.pause(w);
        this.setState(prevState => ({
            workers: prevState.workers.map(
                el => el.id === w ? {...el, status: "Paused", isPaused: true} : el
            )
        }))
    };

    handleResumeButtonClick(w) {
        this.webWorkerPool.resume(w);
        this.setState(prevState => ({
            workers: prevState.workers.map(
                el => el.id === w ? {...el, isPaused: false} : el
            )
        }))
    };

    handleResultsButtonClick(w) {
        this.setState({
            showResults: true,
            sortedArray: this.state.workers[w].sortedArray
        });
    };

    handleResultsModalHide() {
        this.setState({showResults: false});
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col/>
                    <Col sm={9}>
                        <Card>
                            <Card.Header>Web Worker Sorting</Card.Header>
                            <Card.Body>
                                <ControlPanel
                                    onStartButtonClick={() => this.handleStartButtonClick()}
                                    onStopButtonClick={() => this.handleStopButtonClick()}
                                    onIntervalChange={(e) => this.handleIntervalChange(e)}
                                    onWorkersCountChange={(e) => this.handleWorkersCountChange(e)}

                                    hasStarted={this.state.started}
                                    newNumberInterval={this.state.interval}
                                    workersCount={this.state.workersCount}
                                />
                                <br/>
                                {this.state.started &&
                                <WorkersTable
                                    workers={this.state.workers}
                                    onPauseButtonClick={(w) => this.handlePauseButtonClick(w)}
                                    onResumeButtonClick={(w) => this.handleResumeButtonClick(w)}
                                    onResultsButtonClick={(w) => this.handleResultsButtonClick(w)}
                                />
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col/>
                </Row>
                <ResultModal originalArray={this.state.originalArray}
                             sortedArray={this.state.sortedArray}
                             show={this.state.showResults}
                             onHide={() => this.handleResultsModalHide()}
                />
            </Container>
        );
    }
}

export default App;
