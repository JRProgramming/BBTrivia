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

}
