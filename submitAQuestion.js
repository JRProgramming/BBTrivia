function submitQuestion()
{
alert("You have submited a question. Great job!")


var save = firebase.database().ref('user/').push({
    username: name,
    email: email
  });
var id = save.key
firebase.database().ref('user/' + id).update({
identification: id
})
    firebase.database().ref('Completed/').set("Data is saved", function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
            localStorage.setItem("login", true)
            location.href = "https://jrprogramming.github.io/BBTrivia/homePage"
        }
      });
}
