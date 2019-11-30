import React from "react";
import {shallow, mount} from "enzyme";
import ResultModal from "./ResultModal";
import {Button} from "react-bootstrap";

it("shows the modal with the worker information", () => {
    const originalArray = [3, 2, 1],
        sortedArray = [1, 2, 3],
        messagesTimes = [4, 5, 6],
        showResults = true,
        callback = jest.fn();

    const wrapper = shallow(
        <ResultModal originalArray={originalArray}
                     sortedArray={sortedArray}
                     messagesTimes={messagesTimes}
                     show={showResults}
                     onHide={callback}/>);

    expect(wrapper).toIncludeText(originalArray.join(", "));
    expect(wrapper).toIncludeText(sortedArray.join(", "));
    expect(wrapper).toIncludeText(messagesTimes.join(" ms, "));

    wrapper.find(Button).simulate("click");
    expect(callback).toHaveBeenCalledTimes(1);
});

it("does not show the modal if trigger is false", () => {
    const wrapper = mount(
        <ResultModal
            messagesTimes={[]}
            sortedArray={[]}
            originalArray={[]}
            show={false}/>
    );

    expect(wrapper).toBeEmptyRender();
});