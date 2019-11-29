import React from 'react';
import './App.css';

import {Card, Container, Row, Col} from 'react-bootstrap';
import {Button, ButtonToolbar, ProgressBar, Table} from 'react-bootstrap';

import ControlPanel from "./ControlPanel";

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

    startProcessing(event) {
        this.setState({started: true});

        const array = Array.from({length: Configuration.ARRAY_SIZE}, (v, k) => Math.floor((Math.random() * Configuration.ARRAY_SIZE) + k));

        this.worker = WebWorker();
        this.worker.postMessage({message: Messages.START, array: array});

        var self = this;

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

    stopProcessing(event) {
        this.worker.terminate();
        clearInterval(this.clock);
        this.setState({started: false});
    };

    pauseProcessing(event) {
        this.worker.postMessage({message: Messages.PAUSE});
    };

    resumeProcessing(event) {
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
                                    onStartProcessing={(e) => this.startProcessing(e)}
                                    onStopProcessing={(e) => this.stopProcessing(e)}
                                    hasStarted={this.state.started}
                                    newNumberInterval={this.state.interval}
                                />

                                <br/>

                                {this.state.started &&
                                <Table bordered>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Status</th>
                                        <th>Last Message</th>
                                        <th>Progress</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>0</td>
                                        <td>{this.state.status}</td>
                                        <td>{this.state.message}</td>
                                        <td>
                                            <ProgressBar animated max={100000} now={this.state.progress}/>
                                        </td>
                                        <td>
                                            <ButtonToolbar>
                                                <Button variant={"secondary"} size={"sm"}
                                                        onClick={(v) => this.resumeProcessing(v)}>Resume</Button>&nbsp;&nbsp;
                                                <Button variant={"secondary"} size={"sm"}
                                                        onClick={(v) => this.pauseProcessing(v)}>Pause</Button>
                                            </ButtonToolbar>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
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
