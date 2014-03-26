var next = function(){
    timer.clear();
    listenToCurrentTrack(playNextTrack);
}

var previous = function(){
    timer.clear();
    listenToCurrentTrack(playPreviousTrack);
}

$('#eow-description').prepend( "<input type='button' value='Next' onclick='next();'></input> <br>");
$('#eow-description').prepend( "<input type='button' value='Previous' onclick='previous();'></input>");
