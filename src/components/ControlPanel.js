import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

const ControlPanel = props =>
    <Form>
        <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
                Message interval (ms):
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="number" placeholder="New number interval (ms)"
                              defaultValue={props.newNumberInterval}
                              disabled={props.started ? "disabled" : ""}
                              onChange={(text) => props.onIntervalChange(text)}/>
            </Col>
        </Form.Group>
        <Button variant="primary"
                onClick={() => props.onStartButtonClick()}
                disabled={props.hasStarted ? "disabled" : ""}>Start</Button>&nbsp;
        <Button variant="primary"
                onClick={() => props.onStopButtonClick()}
                disabled={!props.hasStarted ? "disabled" : ""}>Stop</Button>
    </Form>;

export default ControlPanel;