import React from 'react';
import {shallow} from 'enzyme';
import WorkersTable from "./WorkersTable";
import Configuration from "../common/Configuration";
import {Button, ProgressBar} from "react-bootstrap";

it('shows the workers table with clicking functionality', () => {
    const timestamp = Date.now();
    const callback = jest.fn();

    const worker = {
        id: 100,
        isPaused: true,
        isFinished: true,
        progress: 50,
        status: "Working",
        size: Configuration.ARRAY_SIZE,
        startTime: timestamp,
        endTime: timestamp + 10,
        messagesTimes: [5, 5, 5],
    };

    const wrapper = shallow(
        <WorkersTable
            workers={[worker]}
            splitArray={true}
            onPauseButtonClick={callback}
            onResumeButtonClick={callback}
            onResultsButtonClick={callback}
            onCombinedResultsButtonClick={callback}
        />);

    expect(wrapper.find('tbody > tr > td').at(0)).toHaveText(worker.id.toString());
    expect(wrapper.find('tbody > tr > td').at(1)).toHaveText(worker.status.toString());
    expect(wrapper.find('tbody > tr > td').at(2)).toHaveText("3 / 5.000 avg(ms)");
    expect(wrapper.find('tbody > tr > td').at(3)).toHaveText("0.01 secs");

    expect(wrapper.find(ProgressBar).first()).toHaveProp("now", worker.progress);
    expect(wrapper.find(ProgressBar).first()).toHaveProp("max", worker.size);

    expect(wrapper.find(Button).at(0)).toHaveProp("disabled", "disabled");
    expect(wrapper.find(Button).at(1)).toHaveProp("disabled", "disabled");
    expect(wrapper.find(Button).at(2)).toHaveProp("disabled", "");
    expect(wrapper.find(Button).at(3)).toHaveProp("disabled", "");

    // Test button clicks
    wrapper.find(Button).at(0).simulate('click');
    wrapper.find(Button).at(1).simulate('click');
    wrapper.find(Button).at(2).simulate('click');
    wrapper.find(Button).at(3).simulate('click');

    // The click simulation will not hornor the disabled attribute
    // ref: https://github.com/airbnb/enzyme/issues/386
    expect(callback).toHaveBeenCalledTimes(4);
});
