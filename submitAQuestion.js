function submitQuestion()
{
var questionName = document.getElementById("question").value;
var correctAnswer = document.getElementById("correctAnswer").value;
var wrongAnswer1 = document.getElementById("wrongAnswer1").value;
var wrongAnswer2 = document.getElementById("wrongAnswer2").value;
var save = firebase.database().ref('questions/').push({
    questionName: questionName,
    correctAnswer: correctAnswer,
    wrongAnswer1: wrongAnswer1,
    wrongAnswer2: wrongAnswer2
  });
var id = save.key
firebase.database().ref('questions/' + id).update({
    identification: id
})
    firebase.database().ref('Completed/').set("Data is saved", function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
            location.href = "https://jrprogramming.github.io/BBTrivia/homePage"
        }
      });
}
