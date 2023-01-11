import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = taskText => TasksCollection.insert({ text: taskText });

// If the collection is empty, fill it in with some dummy values
Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'Finish 279',
      'Submit work',
      'Go outside',
      'Drink water',
      'Do stuff',
      'Another task',
      'Yet another Task'
    ].forEach(insertTask)
  }
});
