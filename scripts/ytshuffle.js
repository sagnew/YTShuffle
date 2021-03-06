var tracks = [];
var tracksInOrder = [];
var current = 0;
var timer;
var paused = false;
var ytplayer = document.getElementById("movie_player");

//Function that populates the tracks array with jQuery <a> objects.
var populateTracks = function(){
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

var playPreviousTrack = function(){
    current -= 1;
    if(current < 0){
        //Re-shuffle the array
        shuffle(tracks);
        current = tracks.length;
    }
    tracks[current].track.click();
};

//Figure out how long the current track plays for
var getPlayTime = function(){
    currentTrack = tracks[current];
    var timeArray = currentTrack.track.text().split(":");
    var minutes = parseInt(timeArray[0], 10);
    var seconds = parseInt(timeArray[1], 10);
    var currentTrackTime = (minutes*60 + seconds);
    console.log("Current track: " + currentTrack.index);
    console.log("Current track time: " + currentTrack.track.text());
    console.log("Current track seconds: " + currentTrackTime);

    var nextTrackTime;
    //Now get the time of the next track
    if(currentTrack.index < tracks.length - 1){
        timeArray = tracksInOrder[currentTrack.index + 1].track.text().split(":");
        minutes = parseInt(timeArray[0], 10);
        seconds = parseInt(timeArray[1], 10);
        nextTrackTime = (minutes*60 + seconds);
    }else{
        nextTrackTime = ytplayer.getDuration();
    }

    console.log("Next track: " + tracksInOrder[currentTrack.index + 1].track.text());
    console.log("Next track time: " + minutes + ":" + seconds);
    console.log("Next track seconds: " + nextTrackTime);

    //The difference between the two is the playtime
    return (nextTrackTime - currentTrackTime)*1000;
};

//Play on repeat indefinitely for now with no way of stopping
//play is a function that determines which track to play
var listenToCurrentTrack = function(play){

    var playTime = getPlayTime();
    play();

    timer = new Timer(function(){
        listenToCurrentTrack(playNextTrack);
    }, playTime);

    //Intentionally global...YouTube's video player API is garbage.
    onPlayerStateChange = function (state) {
        if(state === 2 || state === 3) {
            timer.pause();
            paused = true;
        }else if(state === 1 && paused){
            console.log("Video unpaused");
            timer.resume();
            paused = false;
        }
    };

    ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
};

listenToCurrentTrack(playNextTrack);
