var tracks = [];
var tracksInOrder = [];
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
    $('#eow-description').find('a').each(function(index){
        if($(this).text().indexOf(":") !== -1){
            //track is the jQUery object, index is the track number
            tracks.push({
                "track": $(this),
                "index": index
            });
            tracksInOrder.push({
                "track": $(this),
                "index": index
            });
        }
    });
    shuffle(tracks);
}();

var playNextTrack = function(){
    tracks[current].track.click();
    current += 1;
    if(current >= tracks.length){
        //Re-shuffle the array
        shuffle(tracks);
        current = 0;
    }
};

//Figure out how long the current track plays for
var getPlayTime = function(){
    currentTrack = tracks[current];
    var timeArray = currentTrack.track.text().split(":");
    var minutes = timeArray[0];
    var seconds = timeArray[1];
    var currentTrackTime = (minutes*60 + seconds);

    //Now get the time of the previous track
    if(currentTrack.index !== 0){
        timeArray = tracksInOrder[currentTrack.index - 1].track.text().split(":");
    }else{
        timeArray = tracksInOrder[tracksInOrder.length - 1].track.text().split(":");
    }

    minutes = timeArray[0];
    seconds = timeArray[1];
    var previousTrackTime = (minutes*60 + seconds);

    //The difference between the two is the playtime
    return (currentTrackTime - previousTrackTime)*1000;
};

//Play on repeat indefinitely for now with no way of stopping
var listenToCurrentTrack = function(){

    playNextTrack();

    setTimeout(function(){
        listenToCurrentTrack();
    }, getPlayTime());
};
