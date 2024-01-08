# Force Graph Generator

https://force-graph-generator.netlify.app/

Force Graph Generator is a project that allows users to create a force directed graph using a textbox, which represents the edge list. This tool is beneficial for visualizing complex networks and understanding their structures. 

## Instructions

Firstly, there is the Graph Data Input textbox, which represents the edge list of the graph. Each line represents an edge from the source node to the target node separating the two with a space between. Every node also has a unique value, meaning the graph cannot have a node with two of the same value. 

Secondly, there is a player controller to show the order of breadth-first traversal. You can play, pause, stop, step forward, or step backward. Stepping through the order will also pause the traversal.
* Play: this will automatically step through the traversal every second
* Pause: this will stop the automatic traversal if it is currently playing
* Stop: this will clear all highlighting and reset the traversal to the first step
* Step Forward: this will move one step forward in the traversal and pause if currently playing
* Step Backward: this will move one step backward in the traversal and pause if currently playing

You can click and drag the nodes on the canvas in order to move them with your mouse. Notice how each node and edges interact with each other when you move them 😎. 
## Implementation
* React
* Typescript
* D3.js

## Installation

To install the Force Graph Generator, follow these steps:
1. Clone the repository: `git clone https://github.com/YingJames/ForceGraphGenerator.git`
2. Navigate to the project folder: `cd ForceGraphGenerator`
3. Install the necessary dependencies: `npm install`

## Motivation for creating the project
I wanted a tool that could visualize graphs more easily since I haven't seen any tool that can do that, especially one that implements breadth-first search. Also, the physics is quit cool, even if it doesn't serve any real function. Hopefully you find this interesting because these features took a month to implement fully 😅.

## Potential New Features
* Allow user customization for styling node sizes and color scheme
* Add depth-first traversal
