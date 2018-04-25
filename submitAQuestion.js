function submitQuestion()
{
  var questionName = document.getElementById("question").value;
  var correctAnswer = document.getElementById("correctAnswer").value;
  var wrongAnswer1 = document.getElementById("wrongAnswer1").value;
  var wrongAnswer2 = document.getElementById("wrongAnswer2").value;
  var previousNumberOfQuestionsSubmitted = 0
  var identity = null
  var userArray = []
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
              var updateData = firebase.database().ref("user");
                updateData.on("child_added", function(data, prevChildKey) {
                var data = data.val()
                userArray.push(data)
              })
              //Searches up all of the users in the database
              firebase.database().ref('Completed/').set("Data is saved", function(error) {
                  if (error) {
                      alert("Data could not be saved." + error);
                  } else {
                    for(var i=0;i<userArray.length;i++)
                    {
                      if(userArray[i].username == sessionStorage.getItem("BBTrivianame"))
                      {
                        //Finds the user that match
                        previousNumberOfQuestionsSubmitted = userArray[i].questionsSubmitted
                        identity = userArray[i].identification
                        //Collects the identiciation key and the amount of questions that they have previously submitted
                      }
                    }
                    var totalQuestions = previousNumberOfQuestionsSubmitted + 1
                    var save = firebase.database().ref('user/' + identity).update({
                        questionsSubmitted: totalQuestions
                    });
                    //Registers into the database the new data
                    firebase.database().ref('Completed/').set("Data is saved", function(error) {
                        if (error) {
                            alert("Data could not be saved." + error);
                        } else {
                          location.href = "questionsubmitted.html"
                          //Takes you to a new link after you have submitted your question
                        }
                    });
                  }
              });


            }
        });
        
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
