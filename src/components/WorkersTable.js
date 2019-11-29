import {Button, ButtonToolbar, ProgressBar, Table} from "react-bootstrap";
import React from "react";

const WorkersTable = props =>
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
            <td>{props.status}</td>
            <td>{props.message}</td>
            <td>
                <ProgressBar animated max={props.max} now={props.progress}/>
            </td>
            <td>
                <ButtonToolbar>
                    <Button variant={"secondary"} size={"sm"}
                            onClick={() => props.onResumeButtonClick()}>Resume</Button>&nbsp;&nbsp;
                    <Button variant={"secondary"} size={"sm"}
                            onClick={() => props.onPauseButtonClick()}>Pause</Button>
                </ButtonToolbar>
            </td>
        </tr>
        </tbody>
    </Table>

export default WorkersTable;