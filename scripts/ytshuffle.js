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
