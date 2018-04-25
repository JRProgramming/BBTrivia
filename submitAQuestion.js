function submitQuestion()
{
  var questionName = document.getElementById("question").value;
  var correctAnswer = document.getElementById("correctAnswer").value;
  var wrongAnswer1 = document.getElementById("wrongAnswer1").value;
  var wrongAnswer2 = document.getElementById("wrongAnswer2").value;
    if(questionName != "" && correctAnswer != "" && wrongAnswer1 != "" && wrongAnswer2 != "")
    {
        //Makes sure that none of the textfields are blank
        var save = firebase.database().ref('questions/').push({
            questionName: questionName,
            correctAnswer: correctAnswer,
            wrongAnswer1: wrongAnswer1,
            wrongAnswer2: wrongAnswer2
        });
        //Saves the question to the database
        var id = save.key
        firebase.database().ref('questions/' + id).update({
            identification: id
        })
        firebase.database().ref('Completed/').set("Data is saved", function(error) {
            if (error) {
                alert("Data could not be saved." + error);
            } else {
                location.href = "questionsubmitted.html"
            }
        });
        //Takes you to a new link after you have submitted your question
    }
    else if(questionName = "" || correctAnswer == "" || wrongAnswer1 == "" || wrongAnswer2 == "")
    {
      alert("You didn't fill out all of the textfields. Please make sure that you fill out all of the textfields before submitting your question.")
    }
    //If one of the textfield is blank, it will notify you to fill out the textfields
}
window.onload = function()
{
  if(sessionStorage.getItem("BBTrivianame") == null)
  {
    location.href = "index.html"
  }
  //Makes sure to see if the user is signed in
}
