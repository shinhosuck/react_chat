import React from 'react'

function People() {
  return (
    <div>People</div>
  )
}

export default People

const objs = [{name:'jack'}, {name:'dan'}, {name:'greg'}]

class NewPeople {
  constructor(list) {
    this.list = list 
  }

  getName() {
    return this.list
  }
}

const person = new NewPeople(objs)

console.log(person.getName())