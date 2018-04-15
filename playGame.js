window.onload = function()
{   
  var array = [];
  var updateData = firebase.database().ref("questions");
    updateData.on("child_added", function(data, prevChildKey) {
    var data = data.val() 
   array = data.identification
  })
firebase.database().ref('questions/').set("Data is logged", function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
document.getElementById("j").innerHTML = array.count
        }
      });
}
