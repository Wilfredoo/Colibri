// jon created this for uids
makeUID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 64; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    console.log("makeUID result: ", text);
    this.setState({
        uid: text
    })
}


// this was pushing users to database in regform
firebase.database().ref('/users').push(
    {
      id: this.state.uid,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      bio: this.state.bio,
      email: this.state.email,
      password: this.state.password
    }
)
