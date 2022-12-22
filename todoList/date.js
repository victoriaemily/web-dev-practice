//jshint esversion:6

module.exports = getDate;

function getDate() {
    var today = new Date();    
    var options = {
        weekday: "long",
        day: "numeric",
        month:"long"
    };

    var date = today.toLocaleDateString("en-US", options);

    return date;
}
