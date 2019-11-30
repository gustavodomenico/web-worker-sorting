import React from "react";
import {Button, ButtonToolbar, ProgressBar, Table} from "react-bootstrap";

const WorkersTable = props => {
    const getExecutionTime = (worker) => {
        if (worker.isFinished) {
            const dif = worker.endTime - worker.startTime;
            return (dif / 1000) + " secs";
        }
        return "";
    };
    const getAverageMessagesTime = (worker) => {
        if (worker.messageTimes.length === 0) return 0;

        const sum = worker.messageTimes.reduce((a, b) => a + b);
        return sum / worker.messageTimes.length;
    };
    return (
        <Table bordered size="sm">
            <thead>
            <tr>
                <th>#</th>
                <th>Status</th>
                <th>Messages</th>
                <th>Time</th>
                <th>Progress</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {props.workers.map(worker => {
                return (<tr key={worker.id}>
                    <td>{worker.id}</td>
                    <td width={120}>{worker.status}</td>
                    <td width={150}>{worker.messageTimes.length} / {getAverageMessagesTime(worker).toFixed(3)} ms</td>
                    <td width={150}>{getExecutionTime(worker)}</td>
                    <td>
                        <ProgressBar max={worker.size} now={worker.progress} label={`${worker.progress} items`}/>
                    </td>
                    <td width={280}>
                        <ButtonToolbar>
                            <Button variant={"info"} size={"sm"}
                                    disabled={worker.isFinished || worker.isPaused ? "disabled" : ""}
                                    onClick={() => props.onPauseButtonClick(worker.id)}>
                                <i className="fa fa-pencil"></i> Pause</Button>

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
        </Table>)
};

export default WorkersTable;