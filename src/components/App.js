import React from 'react';
import './App.css';

import {Button} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Form} from "react-bootstrap";

// eslint-disable-next-line import/no-webpack-loader-syntax
import WebWorker from "worker-loader!../workers/WebWorker.worker.js";

function App() {
    const startProcessing = event => {
        const array = Array.from({length: 100000}, (v, k) => Math.floor((Math.random() * 100000) + k));

        const worker = WebWorker();
        worker.postMessage({message: "start", array: array});

        worker.onmessage = function (e) {
            console.log('Message Worker: ' + e.data);
        };
    };

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
                                        <Form.Control type="number" placeholder="Message interval (ms)"/>
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" onClick={startProcessing}>Start</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
