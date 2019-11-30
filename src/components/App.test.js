import React from "react";
import {shallow} from "enzyme";
import App from "./App";
import WebWorkerPool from "../workers/WebWorkerPool";
import WorkersTable from "./WorkersTable";
import ControlPanel from "./ControlPanel";
import ResultModal from "./ResultModal";

jest.mock("../workers/WebWorkerPool");

describe("processing workflow", () => {

    const mockedWebWorkerPool = WebWorkerPool.mock.instances[0];
    const wrapper = shallow(<App/>);
    const numberOfWorkers = wrapper.find(ControlPanel).prop("workersCount");

    it("starts processing", () => {
        wrapper.find(ControlPanel).prop("onStartButtonClick")();

        expect(wrapper.find(WorkersTable).exists()).toBeTruthy();
        expect(wrapper.find(WorkersTable).prop("workers").length).toBe(numberOfWorkers);
        expect(mockedWebWorkerPool.start).toHaveBeenCalledTimes(1);
    });

    it("pauses a worker", () => {
        wrapper.find(WorkersTable).prop("onPauseButtonClick")(0);
        expect(mockedWebWorkerPool.pause).toHaveBeenCalledTimes(1);
    });

    it("resumes a worker", () => {
        wrapper.find(WorkersTable).prop("onResultsButtonClick")(0);
        expect(wrapper.find(ResultModal).exists()).toBeTruthy();
    });

    it("shows results for a worker", () => {
        wrapper.find(WorkersTable).prop("onResumeButtonClick")(0);
        expect(mockedWebWorkerPool.resume).toHaveBeenCalledTimes(1);
    });

    it("stops processing", () => {
        wrapper.find(ControlPanel).prop("onStopButtonClick")();

        expect(wrapper.find(WorkersTable).exists()).toBeFalsy();
        expect(mockedWebWorkerPool.stop).toHaveBeenCalledTimes(1);
    });

});