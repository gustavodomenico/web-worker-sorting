import React, {useState} from 'react';
import './App.css';

import {Card, Container, Row, Col} from 'react-bootstrap';
import ControlPanel from "./ControlPanel";
import WorkersTable from "./WorkersTable";
import ResultModal from "./ResultModal";

import Configuration from "../common/Configuration";
import WebWorkerPool from "../workers/WebWorkerPool";

const webWorkerPool = new WebWorkerPool();

function App() {
    const [workers, setWorkers] = useState([]);
    const [interval, setInterval] = useState(250);
    const [started, setStarted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [workersCount, setWorkersCount] = useState(2);
    const [originalArray, setOriginalArray] = useState([]);
    const [sortedArray, setSortedArray] = useState([]);

    const handleStartButtonClick = () => {
        const array = Configuration.createArray();

        const onWorkerFinished = (id, m) => {
            setWorkers(prev => prev.map(el => el.id === id ?
                {...el, status: 'Done', isFinished: true, sortedArray: m.data.value, endTime: Date.now()} : el));
        };
        const onWorkerProgress = (id, m) => {
            setWorkers(prev => prev.map(el => el.id === id ?
                {...el, status: 'Working...', progress: m.data.value} : el));};

        const onWorkerUpdated = (id, m) => {
            setWorkers(prev => prev.map(el => el.id === id ? {...el, size: m.data.value} : el));};

        webWorkerPool.start(workersCount, array, interval,
            onWorkerFinished, onWorkerProgress, onWorkerUpdated);

        setStarted(true);
        setWorkers(Configuration.createWorkers(workersCount));
        setOriginalArray(array);
    };

    const handleStopButtonClick = () => {
        webWorkerPool.stop();
        setStarted(false);
    };

    const handlePauseButtonClick = (w) => {
        webWorkerPool.pause(w);
        setWorkers(prev => prev.map(el => el.id === w ? {...el, status: "Paused", isPaused: true} : el));};

    const handleResumeButtonClick = (w) => {
        webWorkerPool.resume(w);
        setWorkers(prev => prev.map(el => el.id === w ? {...el, isPaused: false} : el));
    };

    const handleResultsButtonClick = (w) => {
        setShowResults(true);
        setSortedArray(workers[w].sortedArray);
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
                                hasStarted={started}
                                newNumberInterval={interval}
                                workersCount={workersCount}
                            />
                            <br/>
                            {started &&
                            <WorkersTable
                                workers={workers}
                                onPauseButtonClick={(w) => handlePauseButtonClick(w)}
                                onResumeButtonClick={(w) => handleResumeButtonClick(w)}
                                onResultsButtonClick={(w) => handleResultsButtonClick(w)}
                            />
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col/>
            </Row>
            <ResultModal originalArray={originalArray}  sortedArray={sortedArray}  show={showResults}
                         onHide={() => setShowResults(false)}
            />
        </Container>
    );
}

export default App;
