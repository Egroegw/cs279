import { Mongo } from 'meteor/mongo';
 
// Define the collection to hold our tasks
export const TasksCollection = new Mongo.Collection('tasks');
