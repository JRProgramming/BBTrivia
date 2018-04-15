window.onload = function()
{   
  console.log("lasdkfja")
  var array = []
  var updateData = firebase.database().ref("questions");
    updateData.on("child_added", function(data, prevChildKey) {
    var data = data.val() 
    array.push(data)
    console.log(array)
  })
}
