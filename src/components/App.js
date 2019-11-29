import React from 'react';
import './App.css';

import {Button, ButtonToolbar, ProgressBar, Table} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Form} from "react-bootstrap";

// eslint-disable-next-line import/no-webpack-loader-syntax
import WebWorker from "worker-loader!../workers/WebWorker.worker.js";
import Messages from "../common/Messages";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            interval: 0,
            started: false
        }
    };

    startProcessing(event) {
        this.setState({started: true});

        const array = Array.from({length: 100000}, (v, k) => Math.floor((Math.random() * 10000) + k));

        this.worker = WebWorker();
        this.worker.postMessage({message: Messages.START, array: array});

        var self = this;

        this.worker.onmessage = function (e) {
            if (e.data.message === Messages.PROGRESS) {
                self.setState({progress: e.data.value});
                self.setState({message: e.data.value});
            } else if (e.data.message === Messages.FINISHED) {
                self.setState({status: "Finished"});

                console.log(e.data.value.length);
                console.log(array.length);

                let sorted = true;
                for (let i = 0; i < e.data.value.length - 1; i++) {
                    if (e.data.value[i] > e.data.value[i+1]) {
                        sorted = false;
                        break;
                    }
                }
                console.log(sorted);

            } else
                self.setState({status: e.data.message});
        };

        this.clock = setInterval(function () {
            self.worker.postMessage({message: Messages.ADD_NUMBER, value: Math.floor((Math.random() * 100000))});
        }, this.state.interval);
    };

    abortProcessing(event) {
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
                    <Col />
                    <Col sm={9}>
                        <Card>
                            <Card.Header>Web Worker Sorting</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Form.Label column sm={3}>
                                            Message interval (ms):
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="number" placeholder="Message interval (ms)"
                                                          defaultValue={this.state.interval}
                                                          disabled={this.state.started ? "disabled" : ""}
                                                          onChange={(v) => this.setInterval(v)}/>
                                        </Col>
                                    </Form.Group>
                                    <Button variant="primary"
                                            onClick={(v) => this.startProcessing(v)}
                                            disabled={this.state.started ? "disabled" : ""}>Start</Button>&nbsp;
                                    <Button variant="primary"
                                            onClick={(v) => this.abortProcessing(v)}
                                            disabled={!this.state.started ? "disabled" : ""}>Stop</Button>
                                </Form>
                                <br/>

                                {this.state.started &&
                                <Table bordered>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Worker Name</th>
                                        <th>Status</th>
                                        <th>Last Message</th>
                                        <th>Progress</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>0</td>
                                        <td>Inspire</td>
                                        <td>{this.state.status}</td>
                                        <td>{this.state.message}</td>
                                        <td>
                                            <ProgressBar animated max={100000} now={this.state.progress}/>
                                        </td>
                                        <td>
                                            <ButtonToolbar>
                                                <Button variant={"secondary"} size={"sm"}
                                                        onClick={(v) => this.resumeProcessing(v)}>Resume</Button>
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
                    <Col />
                </Row>
            </Container>
        );
    }
}

export default App;
