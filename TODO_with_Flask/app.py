from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# /// = relative path, //// = absolute path
# These are configurations for SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# We start an SQLAlchemy database
db = SQLAlchemy(app)

# This represents the class of items on our todo list
class Todo(db.Model):
    # The id is the identifier of each item on our todo list
    id = db.Column(db.Integer, primary_key=True)
    # Title is the human-readable label of each todo item
    title = db.Column(db.String(100))
    # complete is a Boolean that indicates whether a task is finished.
    complete = db.Column(db.Boolean)

# This is our start page
@app.route("/")
def home():
    todo_list = Todo.query.all()
    # Render the homepage with the list of items in todo_list
    return render_template("base.html", todo_list=todo_list)


# This adds a new item to the todo list
@app.route("/add", methods=["POST"])
def add():
    title = request.form.get("title")
    new_todo = Todo(title=title, complete=False)
    db.session.add(new_todo)
    db.session.commit()
    # refreshes the home page, without which our todo app crashes
    return redirect(url_for("home"))

# This toggles the complete/incomplete status of a todo item
@app.route("/update/<int:todo_id>")
def update(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    # todo.complete is a boolean, so this is legal
    todo.complete = not todo.complete
    db.session.commit()
    # refreshes the home page, without which our todo app crashes
    return redirect(url_for("home"))


# This deletes an item from the todo list
@app.route("/delete/<int:todo_id>")
def delete(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    db.session.delete(todo)
    db.session.commit()
    # refreshes the home page, without which our todo app crashes
    return redirect(url_for("home"))


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    # if debug=True, we don't need to reload our server every time a change in our code is made.
    app.run(debug=False)
