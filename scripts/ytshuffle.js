var tracks = [];
var current = 0;

//The Knuth shuffling algorithm
var shuffle = function(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Function that populates the tracks array with jQuery <a> objects.
var getTrackTimes = function(){
    tracks = [];
    $('#eow-description').find('a').each(function(){
        if($(this).text().indexOf(":") !== -1){
            tracks.push($(this));
        }
    });
    shuffle(tracks);
}();

var playNextTrack = function(){
    tracks[current].click();
    current += 1;
    if(current >= tracks.length){
        //Re-shuffle the array
        shuffle(tracks);
        current = 0;
    }
};

//Play on repeat indefinitely for now with no way of stopping
var listenToCurrentTrack = function(){
    var timeArray = tracks[current].text().split(":");
    var minutes = timeArray[0];
    var seconds = timeArray[1];
    var playTime = (minutes*60 + seconds)*1000;

    setTimeout(function(){
        playNextTrack();

        timeArray = tracks[current].text().split(":");
        minutes = timeArray[0];
        seconds = timeArray[1];
        playTime = (minutes*60 + seconds)*1000;

        setTimeout(listenToCurrentTrack, playTime);
    }, playTime);
}();
