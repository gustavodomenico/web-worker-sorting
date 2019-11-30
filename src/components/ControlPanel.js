import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

const ControlPanel = props =>
    <Form>
        <Form.Group as={Row}>
            <Form.Label column sm={3}>Message interval (ms):</Form.Label>
            <Col sm={9}>
                <Form.Control type="number" placeholder="New number interval (ms)"
                              defaultValue={props.newNumberInterval}
                              disabled={props.hasStarted ? "disabled" : ""}
                              onChange={e => props.onIntervalChange(e)}/>
            </Col>
        </Form.Group>
        <Form.Group as={Row}>
            <Form.Label column sm={3}>Number of workers:</Form.Label>
            <Col sm={4}>
                <Form.Control type="number" placeholder="Number of workers"
                              defaultValue={props.workersCount}
                              disabled={props.hasStarted ? "disabled" : ""}
                              onChange={e => props.onWorkersCountChange(e)}/>
            </Col>
            <Col sm={5}>
                <Form.Check checked={props.splitArray}
                            onChange={props.onSplitArrayChange}
                            disabled={props.hasStarted ? "disabled" : ""}
                            type="checkbox" label="Split the array between the workers"  />
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