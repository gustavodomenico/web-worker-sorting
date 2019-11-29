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
        {props.workers.map(worker => {
            return (<tr key={worker.id}>
                <td>{worker.id}</td>
                <td>{worker.status}</td>
                <td>{worker.message}</td>
                <td>
                    <ProgressBar animated max={worker.max} now={worker.progress}/>
                </td>
                <td>
                    <ButtonToolbar>
                        <Button variant={"secondary"} size={"sm"}
                                onClick={() => props.onResumeButtonClick()}>Resume</Button>&nbsp;&nbsp;
                        <Button variant={"secondary"} size={"sm"}
                                onClick={() => props.onPauseButtonClick()}>Pause</Button>
                    </ButtonToolbar>
                </td>
            </tr>);
        })
        }
        </tbody>
    </Table>;

export default WorkersTable;