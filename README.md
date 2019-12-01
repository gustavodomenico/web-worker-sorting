## Web Worker Sorting

[![application](https://heroku-badge.herokuapp.com/?app=web-worker-sorting)](https://web-worker-sorting.herokuapp.com/)

### Table of contents

1. [General Info](#general-info)
2. [Technologies](#technologies)
    1. [References](#references)
3. [Setup](#setup)
4. [Usage](#usage)
5. [Implementation](#implementation)
    1. [Structure](#structure)
    2. [Testing](#testing)
### General Info
Application to show the usage of web workers and how to have responsive UIs while doing some heavy computation in the background.

### Technologies

The project was bootstrapped with the `create-react-app` tool, but it has been ejected because `react-scripts` does not support web workers ([#issue-1277](https://github.com/facebook/create-react-app/issues/1277)). Additionally, the following packages have been added:

* __[react-bootstrap](https://react-bootstrap.github.io)__: React components implementing the bootstap framework.
* __[react-csv](https://www.npmjs.com/package/react-csv)__: library for CSV file generation.
* __[worker-loader](https://github.com/webpack-contrib/worker-loader)__: webpack module to support web workers.
* __[enzyme](https://airbnb.io/enzyme/)__: testing framework for React components.

Typescript was added to remove a dependency warning ([#issue-386](https://github.com/airbnb/enzyme/issues/386)). The goal was to build the application using Javascript. All other libraries/modules have been added by the bootstrap tool.

#### References

Few references that have been extremely helpful:

* [Web workers inside react](https://stackoverflow.com/questions/47475360/creating-a-web-worker-inside-react)
* [Insertion sort](https://medium.com/javascript-algorithms/javascript-algorithms-insertion-sort-59b6b655373c)
* [Using webpack worker-loader](https://stackoverflow.com/questions/53966156/how-to-load-web-worker-using-webpacks-worker-loader)
* [Jest and worker-loader](https://stackoverflow.com/questions/42567535/resolving-imports-using-webpacks-worker-loader-in-jest-tests)

### Setup

* Clone the repository: `git clone https://github.com/gustavodomenico/web-worker-sorting`.
* Start the application: `yarn start`.
* Run the test suite: `yarn test`.

*if you have an issue with the `react-dev-utils` package, please add it: `yarn add react-dev-utils`.

### Usage

In the initial panel you can configure the execution of the web workers:

* __New number interval (ms)__: interval that new number messages will be sent to the workers.
* __Number of workers__: how many web workers will be created.
* __Split the array between the workers__: check if you want to split the array into the multiple workers. Otherwise, the array will be individually sorted by each worker.

After configuring the behaviour of the execution, you can press start to watch the web workers execution. A worker can also be paused and resumed while still receiving messages from the UI.

When the execution is complete you can view the results for an individual worker or, if you have split the array, check the combined results.

*If you want to check that the messages to the worker are processed in constant time, you need to have just one worker.


### Implementation

All React components are stateless except the main component ([App.js](https://github.com/gustavodomenico/web-worker-sorting/blob/master/src/components/App.js)). All state is managed by the main component using [Hooks](https://reactjs.org/docs/hooks-intro.html) and every action/event in a child component is handled by callbacks. Giving the amount of components, the size of the state and simplicity of the interactions, a state container like React-Redux is not necessary.

The [WebWorkerPool.js](https://github.com/gustavodomenico/web-worker-sorting/blob/master/src/workers/WebWorkerPool.js) class is in charge of managing the workers. Also, it has the timer that will send new numbers for the workers.

Then, the class [WebWorker.worker.js](https://github.com/gustavodomenico/web-worker-sorting/blob/master/src/workers/WebWorker.worker.js) is the web worker itself that will be running in the background. It has all the communication logic with the UI and a reference to the [ExecutionContext.js](https://github.com/gustavodomenico/web-worker-sorting/blob/master/src/workers/ExecutionContext.js) class, where the sorting actually happens. Since the web worker is running in a single thread, the sorting have to happen in chunks, to allow the thread to listen for new messages coming from the UI.

Finally, you have the [InsertionSort.js](https://github.com/gustavodomenico/web-worker-sorting/blob/master/src/algorithms/InsertionSort.js) class that will perform the insertion sort in chunks. Given the nature of this sorting algorithm, we can keep adding new numbers to the end of the array while it is still processing without any side effect. 

#### Structure

Folder | Description
--- | --- | 
algorithms | Common array operations used in the application, including the insertion sort. Each class has one specific operation with proper unit testing.
common | Constants used by the application.
components | React components.
workers | Web worker code and infrastructure to manage them.

#### Testing

Each class has it's corresponding unit test, it is my first time creating unit tests for React components and for complex classes like the [WebWorkerPool.js](https://github.com/gustavodomenico/web-worker-sorting/blob/master/src/workers/WebWorkerPool.js) class.

*Click simulation with `enzyme` does not honour the disabled state of the buttons ([#issue-386](https://github.com/airbnb/enzyme/issues/386)).


