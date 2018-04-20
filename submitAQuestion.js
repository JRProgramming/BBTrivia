function submitQuestion()
{
    var questionName = document.getElementById("question").value;
    var correctAnswer = document.getElementById("correctAnswer").value;
    var wrongAnswer1 = document.getElementById("wrongAnswer1").value;
    var wrongAnswer2 = document.getElementById("wrongAnswer2").value;
    if(sessionStorage.getItem("BBTrivianame") != null && questionName != "" && correctAnswer != "" && wrongAnswer1 != "" && wrongAnswer2 != "")
    {

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
                location.href = "homePage.html"
            }
        });
    }
    else if(questionName = "" || correctAnswer == "" || wrongAnswer1 == "" || wrongAnswer2 == "")
    {
      alert("You didn't fill out all of the textfields. Please make sure that you fill out all of the textfields before submitting your question.")
    }
    else
    {
        alert("You haven't signed in yet.")
    }
}
