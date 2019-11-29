import React from 'react';
import './App.css';

import {Card, Container, Row, Col} from 'react-bootstrap';

import ControlPanel from "./ControlPanel";
import WorkersTable from "./WorkersTable";

import Messages from "../common/Messages";
import Configuration from "../common/Configuration";
import IsArraySorted from "../algorithm/IsArraySorted";

// eslint-disable-next-line import/no-webpack-loader-syntax
import WebWorker from "worker-loader!../workers/WebWorker.worker.js";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            interval: 250,
            started: false
        }
    };

    startProcessing() {
        this.setState({started: true});

        const array = Array.from({length: Configuration.ARRAY_SIZE}, (v, k) => Math.floor((Math.random() * Configuration.ARRAY_SIZE) + k));

        this.worker = WebWorker();
        this.worker.postMessage({message: Messages.START, array: array});

        const self = this;
        this.worker.onmessage = function (e) {
            if (e.data.message === Messages.PROGRESS) {
                self.setState({progress: e.data.value});
                self.setState({message: e.data.value});
            } else if (e.data.message === Messages.FINISHED) {
                self.setState({status: "Finished"});
                self.worker.terminate();
                console.log(IsArraySorted.check(e.data.value));
                self.setState({message: e.data.value.length});
            } else
                self.setState({status: e.data.message});
        };

        this.clock = setInterval(function () {
            self.worker.postMessage({
                message: Messages.ADD_NUMBER,
                value: Math.floor((Math.random() * Configuration.ARRAY_SIZE))
            });
        }, this.state.interval);
    };

    stopProcessing() {
        this.worker.terminate();
        clearInterval(this.clock);
        this.setState({started: false});
    };

    pauseProcessing() {
        this.worker.postMessage({message: Messages.PAUSE});
    };

    resumeProcessing() {
        this.worker.postMessage({message: Messages.RESUME});
    };

    setInterval(event) {
        this.setState({
            interval: event.target.value
        });
    };

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
                                    onStartButtonClick={() => this.startProcessing()}
                                    onStopButtonClick={() => this.stopProcessing()}
                                    onIntervalChange={(e) => this.setInterval(e)}
                                    hasStarted={this.state.started}
                                    newNumberInterval={this.state.interval}
                                />
                                <br/>
                                {this.state.started &&
                                <WorkersTable
                                    onResumeButtonClick={() => this.resumeProcessing()}
                                    onPauseButtonClick={() => this.pauseProcessing()}
                                    max={100000}
                                    progress={this.state.progress}
                                    status={this.state.status}
                                    message={this.state.message}
                                />
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        );
    }
}

export default App;
