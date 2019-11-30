import React from "react";
import {Modal, Button} from "react-bootstrap";
import {Card} from 'react-bootstrap';
import {CSVLink} from "react-csv";

const ResultModal = props =>
    <Modal size={"xl"} show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Sorting Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.messagesTimes.length > 0 &&
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Messages times</Card.Title>
                    <Card.Text>
                        {props.messagesTimes.join(" ms, ")} ms
                    </Card.Text>
                </Card.Body>
            </Card>
            }
            <br/>
            {props.originalArray.length > 0 &&
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Original Array Sample</Card.Title>
                    <Card.Text>
                        {props.originalArray.slice(0, 50).join(", ")}
                        <br/><br/>
                        <CSVLink data={props.originalArray.toString()}>Download full array</CSVLink>
                    </Card.Text>
                </Card.Body>
            </Card>
            }
            <br/>
            {props.sortedArray.length > 0 &&
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Sorted Array Sample</Card.Title>
                    <Card.Text>
                        {props.sortedArray.slice(0, 50).join(", ")}
                        <br/><br/>
                        <CSVLink data={props.sortedArray.toString()}>Download full array</CSVLink>
                    </Card.Text>
                </Card.Body>
            </Card>
            }
        </Modal.Body>
        <Modal.Footer>
            <Button
                variant="secondary"
                onClick={props.onHide}> Close </Button>
        </Modal.Footer>
    </Modal>;

export default ResultModal;