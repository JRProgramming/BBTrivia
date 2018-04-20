var array = []
var correctAnswerNumber = null
var randomNumber = null
window.onload = function()
{
  var updateData = firebase.database().ref("user");
    updateData.on("child_added", function(data, prevChildKey) {
    var data = data.val()
    array.push(data)

  })
  firebase.database().ref('Completed/').set("Data is saved", function(error) {
      if (error) {
          alert("Data could not be saved." + error);
      } else {
        for(var i=0;i<array.length;i++)
        {
          if(array[i].username == sessionStorage.getItem("BBTrivianame"))
          {
            var day = new Date().getDay()
            if(array[i].eligible == true)
            {
              generateQuestion()
            }
            else if (array[i].date != day) {
              firebase.database().ref('user/' + array[i].identification).update({
                eligible: true
              })
              firebase.database().ref('Completed/').set("Data is saved", function(error) {
                  if (error) {
                      alert("Data could not be saved." + error);
                  } else {
                    generateQuestion()
                  }
               })
            }
            else
            {
              alert("Sorry, you can't play today.")
              location.href = "homePage.html"
            }
          }
        }
      }
    });
}
var questionsAnswered = 0;
var isPlaying = true

function submitAnswer1()
{
    if(correctAnswerNumber == 1)
	  {
	     questionsAnswered += 1
       firebase.database().ref('questions/' + array[randomNumber].identification).update({
           questionName: null,
           correctAnswer: null,
           wrongAnswer1: null,
           wrongAnswer2: null,
           identification: null
       });
       firebase.database().ref('Completed/').set("Data is saved", function(error) {
           if (error) {
               alert("Data could not be saved." + error);
           } else {
              generateQuestion()
           }
         });
	  }
    else
    {
        isPlaying = false
        gameOver()
	  }
}

function submitAnswer2()
{
    if(correctAnswerNumber == 2)
	{
		questionsAnswered += 1
    firebase.database().ref('questions/' + array[randomNumber].identification).set({
        questionName: null,
        correctAnswer: null,
        wrongAnswer1: null,
        wrongAnswer2: null,
        identification: null
    });
    firebase.database().ref('Completed/').set("Data is saved", function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
           generateQuestion()
        }
      });
	}
    else
	{
      isPlaying = false
      gameOver()
	}
}

function submitAnswer3()
{
	if(correctAnswerNumber == 3)
	{
		questionsAnswered += 1
    firebase.database().ref('questions/' + array[randomNumber].identification).update({
        questionName: null,
        correctAnswer: null,
        wrongAnswer1: null,
        wrongAnswer2: null,
        identification: null
    });
    firebase.database().ref('Completed/').set("Data is saved", function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
           generateQuestion()
        }
      });
	}
    else
	{
    isPlaying = false
    gameOver()
	}
}
function generateQuestion(){
  var updateData = firebase.database().ref("questions");
    updateData.on("child_added", function(data, prevChildKey) {
    var data = data.val()
    array.push(data)
    console.log()
  })
  firebase.database().ref("Completed/").set("Data is logged", function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
          randomNumber = Math.floor((Math.random() * array.length))
          document.getElementById("question").innerHTML = array[randomNumber].questionName
          var mcArray = [1,2,3]
          correctAnswerNumber = Math.floor((Math.random() * 3) +1)
          mcArray.splice((correctAnswerNumber - 1), 1)
          document.getElementById("mc" + correctAnswerNumber).innerHTML = array[randomNumber].correctAnswer
          var wrongAnswer1number = Math.floor((Math.random() * 2) + 1)
          document.getElementById("mc" + mcArray[wrongAnswer1number - 1]).innerHTML = array[randomNumber].wrongAnswer1
          mcArray.splice((wrongAnswer1number - 1), 1)
          document.getElementById("mc" + mcArray).innerHTML = array[randomNumber].wrongAnswer2
        }
      });
}

function gameOver()
{
  var updateData = firebase.database().ref("user");
    updateData.on("child_added", function(data, prevChildKey) {
    var data = data.val()
    array.push(data)

  })
  firebase.database().ref('Completed/').set("Data is saved", function(error) {
      if (error) {
          alert("Data could not be saved." + error);
      } else {
        for(var i=0;i<array.length;i++)
        {
          if(array[i].username == sessionStorage.getItem("BBTrivianame"))
          {
            array[i].eligible = false
            var day = new Date().getDay()
            firebase.database().ref('user/' + array[i].identification).update({
                eligible: false,
                date: day
            })
            firebase.database().ref('Completed/').set("Data is saved", function(error) {
                if (error) {
                  alert("Data could not be saved." + error)
                }
                else{
                  location.href = "gameOver.html"
                }
            });
          }
        }
      }
    });
}
