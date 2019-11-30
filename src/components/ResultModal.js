import React from "react";
import {Modal, Button} from "react-bootstrap";
import {Card} from 'react-bootstrap';

const ResultModal = props =>
    <Modal size={"xl"} show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Sorting Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Messages times</Card.Title>
                    <Card.Text>
                        {props.messagesTimes.join(" ms, ")} ms
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Original Array</Card.Title>
                    <Card.Text>
                        {props.originalArray.slice(0, 100).join(", ")}
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Sorted Array</Card.Title>
                    <Card.Text>
                        {props.sortedArray.slice(0, 100).join(", ")}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>;

export default ResultModal;