
var config = {
    apiKey: "AIzaSyBchJQ-ZzWvXQWroyXCPSJqa1-msD_4eF4",
    authDomain: "my-awesome-project-2a54c.firebaseapp.com",
    databaseURL: "https://my-awesome-project-2a54c.firebaseio.com",
    projectId: "my-awesome-project-2a54c",
    storageBucket: "my-awesome-project-2a54c.appspot.com",
    messagingSenderId: "562975029800"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = ""
var destination = ""
var rate = ""
var firstTime = ""
var minutesAway = ""
var nextTime = ""

$("#submit").on("click", function(event){

    name = $("#name-input").val().trim()
    destination = $("#destination-input").val().trim()
    firstTime = $("#first-input").val().trim()
    rate = $("#rate-input").val().trim()

    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        rate: rate,
      });

    $("#name-input").val("")
    $("#destination-input").val("")
    $("#first-input").val("")
    $("#rate-input").val("")

    var afterSubmit = $("<h5>").text("You just added " + name + " to our schedule.").addClass("afterSubmit")
    $(".trainAdded").append(afterSubmit)

    setTimeout(function(){
        afterSubmit.hide()
        ; }, 5000);

    
})

database.ref().on("child_added", function(childSnapshot){
    var sv = childSnapshot.val()

    console.log(sv.name)
    console.log(sv.destination)
    console.log(sv.firstTime)
    console.log(sv.rate)

    //this is where i wish I was figuring out minutes until next train and how many minutes away it is!
    //next arrival (is something like) = the smallest number where this is true: (current time - first time) / rate of train arrival = number % 0 , 
    //minutes away = next arrival -- current time
    //would like to use moment js for these but i can't figure out how to make the math work

    var newTr = $("<tr>")
    var tdName = $("<td>").text(sv.name)
    var tdDestination = $("<td>").text(sv.destination)
    var tdRate = $("<td>").text(sv.rate)
    var tdNextArrival = $("<td>").text(sv.firstTime)
    var tdMinutesAway = $("<td>").text("calculate later")

    newTr.append(tdName).append(tdDestination).append(tdRate).append(tdNextArrival).append(tdMinutesAway)
    $("#train-table-body").append(newTr)

}, function(errorObject) {
    console.log("the read failed: " + errorObject.code)
});




