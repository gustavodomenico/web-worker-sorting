import React from 'react';
import './App.css';

import {Button, ButtonToolbar, Table} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Form} from "react-bootstrap";

// eslint-disable-next-line import/no-webpack-loader-syntax
import WebWorker from "worker-loader!../workers/WebWorker.worker.js";

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

        const array = Array.from({length: 100000}, (v, k) => Math.floor((Math.random() * 100000) + k));

        const worker = WebWorker();
        worker.postMessage({message: "start", array: array});

        var self = this;
        worker.onmessage = function (e) {
            self.setState({ message: e.data.message });
        };
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
                    <Col>
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
                                            disabled={this.state.started ? "disabled" : ""}>Start</Button>
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
                                            <ButtonToolbar>
                                                <Button variant={"secondary"} size={"sm"}>Resume</Button>
                                                <Button variant={"secondary"} size={"sm"}>Pause</Button>
                                                <Button variant={"warning"} size={"sm"}>Stop</Button>
                                            </ButtonToolbar>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                                }

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
