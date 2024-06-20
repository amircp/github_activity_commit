import React, { useState, useEffect } from 'react';
import ActivityList  from './activity'

/*
  HackerRank  Challenge for front end.
  by Amir Canto. January 4, 2024
*/

export function App(props) {

  const [commitTable, setCommitTable] = useState({})
  const [commitDays, setCommitDays] = useState([])

  const decemberMonth = () => {
    // i don't remember the function used to generate the days for January in the challenge
    // therefore i created this one that returns an array containing 31 days for December.
    let date = []
    for(let i = 1; i < 31; i++){
       date.push("2023-12-"+ padNumber(i))
    }
    return date;
  }

  const padNumber = (num) => {
     // to pad numbers below 10 and return them as string.
    if(num < 10) {
      return "0"+num
    }
    return num;
  }
 
  useEffect( () => {
    // this would be the fetch for API
    const groupCommits = (commitList) => {
       // This could turn into a custom hook something like "useMapDays" or something.
    let groupByDate = {}

    for(commit of commitList)  {
      
       if(groupByDate[commit.date]) {
        groupByDate[commit.date] += 1
      } else {
        /// undefined
         groupByDate[commit.date] = 1
      }
       
    }   
    return groupByDate;
  }
    // Creation of hash table with dates -> counted commits
    setCommitTable(groupCommits(ActivityList))
    const workingDays = decemberMonth()
    setCommitDays(workingDays)

  },[])

  const colorBoxClass = (commit) => {
  // Square box class selector
  // same as i wrote in the interview
      let squareClass = "square"
      let squareColor =  ""

      if(commit < 1){
        squareColor = "grey"
      } else if(commit >= 1 && commit <= 3) {
          squareColor = "green"
      } else if(commit >= 4 && commit <= 6) {
        squareColor = "blue"
      } else if(commit >= 7) {
         squareColor = "red"
      }

      return squareClass += " " + squareColor
  }

  const Square = ({day}) => {
     return (<div key={day} className={commitTable[day] === undefined ? colorBoxClass(0) : colorBoxClass(commitTable[day])}></div>)
  }

  const LabelSquare = ({day}) => <span className="commit-date"> {day}</span> 

  const Commit = ({day}) => { 
    return (
      <div key={day} className="commit">
          <span key={day} className="tooltip">{commitTable[day] === undefined ? 0 : commitTable[day]} commits</span>
          <Square day={day} />
          <LabelSquare day={day} />
      </div>)
  }

  const ActivityDiagram = ({data}) => {
    return (
       <div className='container'>
        {
         data.map((day, i) => (
            <Commit key={i} day={day} />
         ))
        }
      </div>
    )
  }

  return (
    <div className='App' aria-labelledby="activity-heading">
      <h1 id="activity-heading">Activity Commits Diagram</h1>
      <ActivityDiagram data={commitDays} />
    </div>
  );
}
