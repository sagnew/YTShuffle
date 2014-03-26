var next = function(){
    timer.clear();
    listenToCurrentTrack(playNextTrack);
}

var previous = function(){
    timer.clear();
    listenToCurrentTrack(playPreviousTrack);
}

$('#eow-description').append( "<input type='button' value='Next' onclick='next();'></input>");
$('#eow-description').append( "<input type='button' value='Previous' onclick='previous();'></input>");
