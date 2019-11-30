import React from "react";
import {Button, ButtonToolbar, ProgressBar, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faPoll} from '@fortawesome/free-solid-svg-icons'

const WorkersTable = props => {
    const getExecutionTime = (worker) => {
        if (worker.isFinished) {
            const dif = worker.endTime - worker.startTime;
            return (dif / 1000) + " secs";
        }
        return "";
    };
    const getAverageMessagesTime = (worker) => {
        if (worker.messagesTimes.length === 0) return 0;

        const sum = worker.messagesTimes.reduce((a, b) => a + b);
        return sum / worker.messagesTimes.length;
    };
    return (
        <div>
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
                        <td width={175}>{worker.messagesTimes.length} / {getAverageMessagesTime(worker).toFixed(3)} avg(ms)</td>
                        <td width={150}>{getExecutionTime(worker)}</td>
                        <td>
                            <ProgressBar max={worker.size} now={worker.progress} label={`${worker.progress} items`}/>
                        </td>
                        <td width={150}>
                            <ButtonToolbar>
                                <Button variant={"info"} size={"sm"}
                                        disabled={worker.isFinished || worker.isPaused ? "disabled" : ""}
                                        onClick={() => props.onPauseButtonClick(worker.id)}>
                                    <FontAwesomeIcon icon={faPause}/></Button>

                                <Button variant={"info"} size={"sm"}
                                        disabled={worker.isFinished || !worker.isPaused ? "disabled" : ""}
                                        onClick={() => props.onResumeButtonClick(worker.id)}>
                                    <FontAwesomeIcon icon={faPlay}/></Button>

                                <Button variant={"success"} size={"sm"}
                                        disabled={!worker.isFinished ? "disabled" : ""}
                                        onClick={() => props.onResultsButtonClick(worker.id)}>
                                    <FontAwesomeIcon icon={faPoll}/></Button>
                            </ButtonToolbar>
                        </td>
                    </tr>);
                })}
                </tbody>
            </Table>
            <Button variant={"secondary"} className={"pull-right"}
                    disabled={!props.workers.every(w => w.isFinished) || !props.splitArray ? "disabled" : ""}
                    onClick={() => props.onCombinedResultsButtonClick(props.workers)}>Combined Results</Button>
        </div>
    )
};

export default WorkersTable;