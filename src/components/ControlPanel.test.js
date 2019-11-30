import React from 'react';
import {shallow} from 'enzyme';
import ControlPanel from "./ControlPanel";
import {Button, FormCheck, FormControl} from "react-bootstrap";

it('shows initial values', () => {
    const wrapper = shallow(
        <ControlPanel
            hasStarted={false}
            newNumberInterval={1}
            workersCount={2}
            splitArray={true}
        />);

    expect(wrapper.find(FormControl).at(0)).toHaveProp("defaultValue", 1);
    expect(wrapper.find(FormControl).at(1)).toHaveProp("defaultValue", 2);
    expect(wrapper.find(FormCheck)).toHaveProp("checked", true);
    expect(wrapper.find(Button).at(1)).toHaveProp("disabled", "disabled"); // Stop
});

it('disables panel if has already started', () => {
    const wrapper = shallow(
        <ControlPanel
            hasStarted={true}
        />);

    expect(wrapper.find(FormControl).at(0)).toHaveProp("disabled", "disabled");
    expect(wrapper.find(FormControl).at(1)).toHaveProp("disabled", "disabled");
    expect(wrapper.find(FormCheck)).toHaveProp("disabled", "disabled");
    expect(wrapper.find(Button).at(0)).toHaveProp("disabled", "disabled"); // Start
});

it('calls the callbacks for the form changes', () => {
    const callback = jest.fn();

    const wrapper = shallow(
        <ControlPanel
            onStartButtonClick={callback}
            onStopButtonClick={callback}
            onIntervalChange={callback}
            onWorkersCountChange={callback}
            onSplitArrayChange={callback}
        />);

    wrapper.find(Button).at(0).simulate('click');
    wrapper.find(Button).at(1).simulate('click');

    wrapper.find(FormCheck).simulate('change', { target: { checked: true }});
    wrapper.find(FormControl).at(0).simulate('change', { target: { value: 1 } });
    wrapper.find(FormControl).at(1).simulate('change', { target: { value: 2 } });

    expect(callback).toHaveBeenCalledTimes(5);
});