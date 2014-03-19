var tracks = [];
var current = 0;

//Function that populates the tracks array with jQuery <a> objects.
var getTrackTimes = function(){
    $('#eow-description').find('a').each(function(){
        if($(this).text().indexOf(":") !== -1){
            tracks.push($(this));
        }
    });
};

var playNextTrack = function(){
    tracks[current].click();
    current += 1;
    if(current >= tracks.length){
        //Re-shuffle the array
        current = 0;
    }
};
