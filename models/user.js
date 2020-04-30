const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(username, email, _id) {
    this.username = username;
    this.email = email;
    this.id = _id ? new mongodb.ObjectId(_id) : null;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      dbOperation = db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperation = db.collection("users").insertOne(this);
    }
    return dbOperation
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
