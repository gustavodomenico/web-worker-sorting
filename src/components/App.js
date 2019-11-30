import React, {useState} from 'react';
import './App.css';

import {Card, Container, Row, Col} from 'react-bootstrap';
import ControlPanel from "./ControlPanel";
import WorkersTable from "./WorkersTable";
import ResultModal from "./ResultModal";

import Configuration from "../common/Configuration";
import WebWorkerPool from "../workers/WebWorkerPool";
import IsArraySorted from "../algorithms/IsArraySorted";
import SplitArray from "../algorithms/SplitArray";
import CombineSortedArrays from "../algorithms/CombineSortedArrays";

const webWorkerPool = new WebWorkerPool();

function App() {
    const [workers, setWorkers] = useState([]);
    const [interval, setInterval] = useState(250);
    const [started, setStarted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [workersCount, setWorkersCount] = useState(2);
    const [originalArray, setOriginalArray] = useState([]);
    const [sortedArray, setSortedArray] = useState([]);
    const [messagesTimes, setMessagesTimes] = useState([]);
    const [splitArray, setSplitArray] = useState(false);

    const handleStartButtonClick = () => {
        const array = Configuration.createArray();

        const workers = Configuration.createWorkers(workersCount, array);
        if (splitArray) {
            const arrays = SplitArray.run(array, workersCount);
            workers.forEach((el, index) => el.originalArray = arrays[index]);
        }

        const onWorkerFinished = (id, m) => {
            setWorkers(prev => prev.map(el => el.id === id ?
                {...el, status: 'Done', isFinished: true, sortedArray: m.data.value, endTime: Date.now()} : el));

            if (!IsArraySorted.run(sortedArray))
                throw new Error("Array is not sorted after the worker operation.");
        };
        const onWorkerProgress = (id, m) => {
            setWorkers(prev => prev.map(el => el.id === id ?
                {...el, status: 'Working', progress: m.data.value} : el));
        };

        const onWorkerUpdated = (id, m) => {
            const lastMessageTime = Date.now() - (m.data.timestamp);
            setWorkers(prev =>
                prev.map(el => el.id === id ?
                    {...el, size: m.data.value, messagesTimes: [...el.messagesTimes, lastMessageTime]} :
                    el));
        };

        webWorkerPool.start(workers, interval, onWorkerFinished, onWorkerProgress, onWorkerUpdated);

        setStarted(true);
        setWorkers(workers);
    };

    const handleStopButtonClick = () => {
        webWorkerPool.stop();
        setStarted(false);
    };

    const handlePauseButtonClick = (w) => {
        webWorkerPool.pause(w);
        setWorkers(prev => prev.map(el => el.id === w ? {...el, status: "Paused", isPaused: true} : el));
    };

    const handleResumeButtonClick = (w) => {
        webWorkerPool.resume(w);
        setWorkers(prev => prev.map(el => el.id === w ? {...el, isPaused: false} : el));
    };

    const handleResultsButtonClick = (w) => {
        setShowResults(true);
        setOriginalArray(workers[w].originalArray);
        setSortedArray(workers[w].sortedArray);
        setMessagesTimes(workers[w].messagesTimes);
    };

    const handleCombinedResultsButtonClick = (w) => {
        setShowResults(true);

        let combinedArray = CombineSortedArrays.run(w.map(e => e.sortedArray));
        if (!IsArraySorted.run(combinedArray))
            throw new Error("Array is not sorted after the worker operation.");
        setSortedArray(combinedArray);

        let combineOriginalArray = w.reduce((a, b) => a.concat(b.originalArray), []);
        setOriginalArray(combineOriginalArray);

        setMessagesTimes([]);
    };

    return (
        <Container>
            <Row>
                <Col/>
                <Col sm={9}>
                    <Card>
                        <Card.Header>Web Worker Sorting</Card.Header>
                        <Card.Body>
                            <ControlPanel
                                onStartButtonClick={() => handleStartButtonClick()}
                                onStopButtonClick={() => handleStopButtonClick()}
                                onIntervalChange={(e) => setInterval(e.target.value)}
                                onWorkersCountChange={(e) => setWorkersCount(e.target.value ? parseInt(e.target.value) : 1)}
                                onSplitArrayChange={(e) => setSplitArray(prev => !prev)}
                                hasStarted={started}
                                newNumberInterval={interval}
                                workersCount={workersCount}
                                splitArray={splitArray}
                            />
                            <br/>
                            {started &&
                            <WorkersTable
                                workers={workers}
                                onPauseButtonClick={(w) => handlePauseButtonClick(w)}
                                onResumeButtonClick={(w) => handleResumeButtonClick(w)}
                                onResultsButtonClick={(w) => handleResultsButtonClick(w)}
                                onCombinedResultsButtonClick={(w) => handleCombinedResultsButtonClick(w)}
                            />
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col/>
            </Row>
            <ResultModal originalArray={originalArray} sortedArray={sortedArray} messagesTimes={messagesTimes}
                         show={showResults} onHide={() => setShowResults(false)}
            />
        </Container>
    );
}

export default App;
