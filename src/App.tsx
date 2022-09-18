import React from 'react';
import './App.css';
import TodoList from "./TodoList";

function App() {
    const todoListTitle = "What to buy"
    const tasks = [
        {id:1, title: "HTML&CSS", isDone: true},
        {id:2, title: "JS", isDone: true},
        {id:3, title: "React", isDone: false},
    ]
    const todoListTitle_2 = "What to buy"
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false }
    ]


    return (
        <div className="App">
            <TodoList  tasks={tasks} title={todoListTitle}/>
            <TodoList  tasks={tasks2} title={todoListTitle_2}/>
        </div>
    );
}

export default App;
