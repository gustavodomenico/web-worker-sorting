import React from 'react';
import './App.css';

import {Button} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Form} from "react-bootstrap";

import WebWorkerSetup from "../worker/WebWorkerSetup";
import WebWorker from "../worker/WebWorker";

function App() {
    const handle = event => {
        const worker = new WebWorkerSetup(WebWorker);
        worker.postMessage("Fetch Users");
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
                                        <Form.Control type="number" placeholder="Interval"/>
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" onClick={handle}>Start</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
