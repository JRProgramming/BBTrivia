var array = []
var correctAnswerNumber = null
window.onload = function()
{ 
  var updateData = firebase.database().ref("questions");
    updateData.on("child_added", function(data, prevChildKey) {
    var data = data.val() 
    array.push(data)
  })
  firebase.database().ref("Completed/").set("Data is logged", function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
var randomNumber = Math.floor((Math.random() * array.length))
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
function submitAnswer1()
{
    if(correctAnswerNumber == 1)
	{
		alert("yah")
	}
    else 
    {

	}
}

function submitAnswer2()
{
    if(correctAnswerNumber == 2)
	{
		alert("yah")
	}
    else
	{

	}
}

function submitAnswer3()
{
	if(correctAnswerNumber == 3)
	{
		alert("yah")
	}
    else
	{
	
	}
}
