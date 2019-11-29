import React from "react";
import {Button, ButtonToolbar, ProgressBar, Table} from "react-bootstrap";

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
                <td width={280}>
                    <ButtonToolbar>
                        <Button variant={"info"} size={"sm"}
                                disabled={worker.isFinished || worker.isPaused ? "disabled" : ""}
                                onClick={() => props.onPauseButtonClick(worker.id)}>Pause</Button>

                        <Button variant={"info"} size={"sm"}
                                disabled={worker.isFinished || !worker.isPaused ? "disabled" : ""}
                                onClick={() => props.onResumeButtonClick(worker.id)}>Resume</Button>

                        <Button variant={"success"} size={"sm"}
                                disabled={!worker.isFinished ? "disabled" : ""}
                                onClick={() => props.onResultsButtonClick(worker.id)}>Results</Button>
                    </ButtonToolbar>
                </td>
            </tr>);
        })
        }
        </tbody>
    </Table>;

export default WorkersTable;