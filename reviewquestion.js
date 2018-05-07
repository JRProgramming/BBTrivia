var identity = null
var question = null
var correct = null
var wrong1 = null
var wrong2 = null
function authenticateUser(x)
{
  var text = document.getElementById("text").value
  console.log(x)
  if(text == "JRamirez2603" || x == "Allowed")
  {
    document.getElementById("text").value = ""
    var questionArray = []
    var updateData = firebase.database().ref("questionFactory");
      updateData.on("child_added", function(data, prevChildKey) {
      var data = data.val()
      questionArray.push(data)
    })
    //Gathers up all of the questions that are on the database
    firebase.database().ref("Completed/").set("Data is logged", function(error) {
      if (error) {
          alert("Data could not be saved." + error);
      } else {
        document.getElementById("acceptQuestion").disabled = false
        document.getElementById("rejectQuestion").disabled = false
        question = questionArray[0].questionName
        correct = questionArray[0].correctAnswer
        wrong1 = questionArray[0].wrongAnswer1
        wrong2 = questionArray[0].wrongAnswer2
        document.getElementById("question").innerHTML = "Question: " + questionArray[0].questionName
        document.getElementById("mc1").innerHTML = "Correct Answer: "  + questionArray[0].correctAnswer
        document.getElementById("mc2").innerHTML = "Wrong Answer: " + questionArray[0].wrongAnswer1
        document.getElementById("mc3").innerHTML = "Wrong Answer: " + questionArray[0].wrongAnswer2
        identity = questionArray[0].identification
      }
    })
  }
}
function submitQuestion()
{
      var save = firebase.database().ref('questions/').push({
          questionName: question,
          correctAnswer: correct,
          wrongAnswer1: wrong1,
          wrongAnswer2: wrong2
      });
      //Saves the question to the database
      var id = save.key
      firebase.database().ref('questions/' + id).update({
          identification: id
      })
      firebase.database().ref("Completed/").set("Data is logged", function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
          deleteQuestion(identity)
        }
      })
}

function deleteQuestion(x)
{
  firebase.database().ref('questionFactory/' + x).update({
      questionName: null,
      correctAnswer: null,
      wrongAnswer1: null,
      wrongAnswer2: null,
      identification: null
  });
  firebase.database().ref("Completed/").set("Data is logged", function(error) {
    if (error) {
        alert("Data could not be saved." + error);
    } else {
      authenticateUser("Allowed")
    }
  });
}
