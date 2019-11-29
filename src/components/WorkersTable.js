import {Button, ButtonToolbar, ProgressBar, Table} from "react-bootstrap";
import React from "react";

const WorkersTable = props =>
    <Table bordered size="sm">
        <thead>
        <tr>
            <th>#</th>
            <th>Status</th>
            <th>Progress</th>
            <th/>
        </tr>
        </thead>
        <tbody>
        {props.workers.map(worker => {
            return (<tr key={worker.id}>
                <td>{worker.id}</td>
                <td width={150}>{worker.status}</td>
                <td>
                    <ProgressBar max={worker.size} now={worker.progress} label={`${worker.progress} items`}/>
                </td>
                <td width={175}>
                    <ButtonToolbar>
                        <Button variant={"secondary"} size={"sm"}
                                disabled={worker.isPaused ? "disabled" : ""}
                                onClick={() => props.onPauseButtonClick(worker.id)}>Pause</Button>
                        <Button variant={"secondary"} size={"sm"}
                                disabled={!worker.isPaused ? "disabled" : ""}
                                onClick={() => props.onResumeButtonClick(worker.id)}>Resume</Button>
                    </ButtonToolbar>
                </td>
            </tr>);
        })
        }
        </tbody>
    </Table>;

export default WorkersTable;