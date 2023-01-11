import 'package:flutter/material.dart';

//main method runs the app
void main() {
  runApp(Todo());
}

// Main class
class Todo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: TodoList());
  }
}

// TodoList class
class TodoList extends StatefulWidget {
  @override
  _TodoListState createState() => _TodoListState();
}

// TodoListState class
class _TodoListState extends State<TodoList> {
  // save data
  final List<String> _todoList = <String>[];
  final TextEditingController _textFieldController = TextEditingController();

  // Main build method
  @override
  Widget build(BuildContext context) {
    int tasksLeft = _getTasksLeft();
    String text;
    if (tasksLeft == 0) {
      text = 'All done! You have no more tasks left';
    } else {
      text = 'Welcome! You have $tasksLeft tasks left';
    }
    return Scaffold(
      appBar: AppBar(title: const Text('To-Do List')),
      body: Column(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(text),
          ),
          Expanded(
            child: ListView(children: _getTodoTiles()),
          ),
        ],
      ),

      // "Add item" button
      floatingActionButton: FloatingActionButton(
          onPressed: () => _displayDialog(context),
          tooltip: 'Add Item',
          child: Icon(Icons.add)),
    );
  }

  // Method to add a todo item to the list
  void _addTodoItem(String title) {
    // Wrapping it inside a set state will notify
    // the app that the state has changed
    setState(() {
      _todoList.add(title);
    });
    _textFieldController.clear();
  }

  // Method to delete a todo item from the list
  void _deleteTodoItem(int index) {
    setState(() {
      _todoList.removeAt(index);
    });
  }

  // Method to mark a todo item as completed
  void _markTodoItemAsCompleted(int index) {
    setState(() {
      _todoList[index] = '✅ ' + _todoList[index];
    });
  }

  // Method to calculate the number of tasks left
  int _getTasksLeft() {
    int tasksLeft = 0;
    for (String task in _todoList) {
      if (!task.startsWith('✅')) {
        tasksLeft++;
      }
    }
    return tasksLeft;
  }

  // Creates a tile for each todo item
  List<Widget> _getTodoTiles() {
    final List<Widget> todoTiles = <Widget>[];
    for (int i = 0; i < _todoList.length; i++) {
      todoTiles.add(_buildTodoTile(_todoList[i], i));
    }
    return todoTiles;
  }

  // Displays a dialog to add a new task
  Future<Future> _displayDialog(BuildContext context) async {
    // alter the app state to show a dialog
    return showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Add a task to your list'),
            content: TextField(
              controller: _textFieldController,
              decoration: const InputDecoration(hintText: 'Enter task here'),
            ),
            actions: <Widget>[
              // Cancel button
              TextButton(
                child: const Text('CANCEL'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),

              // Add task button
              TextButton(
                child: const Text('ADD'),
                onPressed: () {
                  Navigator.of(context).pop();
                  _addTodoItem(_textFieldController.text);
                },
              ),
            ],
          );
        });
  }

  // Shows a popup menu with options to delete or mark as completed
  void _showPopupMenu(BuildContext context, int index) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Container(
          height: 120,
          child: Column(
            children: <Widget>[
              ListTile(
                leading: Icon(Icons.delete),
                title: Text('Delete'),
                onTap: () {
                  Navigator.pop(context);
                  _deleteTodoItem(index);
                },
              ),
              ListTile(
                leading: Icon(Icons.done),
                title: Text('Mark as completed'),
                onTap: () {
                  Navigator.pop(context);
                  _markTodoItemAsCompleted(index);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  // Generates a todo tile for an item in the list
  Widget _buildTodoTile(String title, int index) {
    return Padding(
      padding: const EdgeInsets.only(top: 2.0, left: 8.0, right: 8.0),
      child: GestureDetector(
        onTap: () => _showPopupMenu(context, index),
        onLongPress: () => _showPopupMenu(context, index),
        child: Container(
          height: 50,
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.secondary,
            borderRadius: BorderRadius.circular(5),
          ),
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              title,
              style: TextStyle(
                fontSize: 20,
                color: Colors.white,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
