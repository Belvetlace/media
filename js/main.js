/*global console: false, window: false*/
/*jslint browser: true*/
/*
 * TODO: Complete the code for this file, following the hints in the comments.
 * Do complete the code marked by "TODO" comments,
 * but do NOT re-write function/method signatures
 * (a method's signature is its name, parameters,
 * and the order of the parameters).
 * Make sure you read this entire file and
 * these Web pages BEFORE you start working!:
 * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
 * The "HTML Audio/Video Events" section at:
 * http://www.w3schools.com/tags/ref_av_dom.asp
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
 * Then start below with the "TODO: DO THIS FIRST" section.
 */


window.onload = function() {
    "use strict";
    // Getting the media elements
    var video = document.getElementById('video');
    var audio = document.getElementById('audio');
    // Getting the buttons
    var playOrPauseVideoButton = document
            .getElementById("playOrPauseVideoButton");
    var playOrPauseAudioButton = document
            .getElementById("playOrPauseAudioButton");
    var stopVideoButton = document.getElementById("stopVideoButton");
    var stopAudioButton = document.getElementById("stopAudioButton");
    var increaseVideoVolumeButton = document
            .getElementById("increaseVideoVolumeButton");
    var increaseAudioVolumeButton = document
            .getElementById("increaseAudioVolumeButton");
    var decreaseVideoVolumeButton = document
            .getElementById("decreaseVideoVolumeButton");
    var decreaseAudioVolumeButton = document
            .getElementById("decreaseAudioVolumeButton");

    //funcion for video event listeners
    var videoEventHandlerFunct = function(event) {
        console.log("The " + this.id + " media object is " + event.type + ".");
        mediaIsPlayingOrJustPaused(event);
    };
    //video event listeners
    video.addEventListener('play', videoEventHandlerFunct, false);
    video.addEventListener('pause', videoEventHandlerFunct, false);
    video.addEventListener('ended', mediaHasJustEnded, false);

    //funcion for audio event listeners
    var audioEventHandlerFunct = function(event) {
        console.log("The " + this.id + " media object is " + event.type + ".");
        mediaIsPlayingOrJustPaused(event);
    };
    //audio event listeners
    audio.addEventListener('play', audioEventHandlerFunct, false);
    audio.addEventListener('pause', audioEventHandlerFunct, false);
    audio.addEventListener('ended', mediaHasJustEnded, false);


    var syncPlayOrPauseButtonWithMedia = function(mediaElement, button) {
        /*
         * TODO: Set the button's innerHTML to 'Pause' or 'Play' depending on if
         * the media element is paused or not.
         */
        button.innerHTML = (mediaElement.paused) ? 'Play' : 'Pause';
        console.log("syncPlayOrPauseButtonWithMedia called " + mediaElement + " " + button);
    };

    var mediaIsPlayingOrJustPaused = function(event) {
        console.log("mediaIsPlayingOrJustPaused called with event:", event.type, event.target.id);
        /*
         * TODO: Now that a media element is playing or just paused set the
         * appropriate button's content to 'Pause' or to 'Play' by calling
         * syncPlayOrPauseButtonWithMedia with the correct parameters. Remember
         * both the keyword 'this' and the 'event.target' object refer to
         * whatever HTML Media Element called the mediaIsPlayingOrJustPaused
         * function by triggering a playing or a pause event.
         */
        if (event.target.id === 'video'){
            syncPlayOrPauseButtonWithMedia(event.target, playOrPauseVideoButton);
        } else {
            syncPlayOrPauseButtonWithMedia(event.target, playOrPauseAudioButton);
        }

    };

    var mediaHasJustEnded = function(event) {
        console.log("mediaHasJustEnded called with event:", event);
        /*
         * TODO: Now that the media element has stopped playing set the
         * appropriate button's content to 'Play' by calling
         * syncPlayOrPauseButtonWithMedia with the correct parameters. Remember
         * both the keyword 'this' and the 'event.target' object refer to
         * whatever HTML Media Element called the mediaIsPlayingOrJustPaused
         * function by triggering a playing or a pause event.
         */
        event.target.currentTime = 0;
        if (event.target.id === 'video') {
            syncPlayOrPauseButtonWithMedia(event.target, playOrPauseVideoButton);
        } else {
            syncPlayOrPauseButtonWithMedia(event.target, playOrPauseAudioButton);
        }
    };

    /*
     * TODO: DO THIS FIRST (after reading the instructions at the top of this
     * file). Use addEventListener to bind video and audio elements to call our
     * mediaIsPlayingOrJustPaused(event) function in reaction to 'play' and
     * 'pause' events and call our mediaHasJustEnded(event) function in reaction
     * to the 'ended' event.
     */
    playOrPauseVideoButton.onclick = function(event) {
        // TODO: Add your code here to play or pause the video
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }

        //syncPlayOrPauseButtonWithMedia(video, this);
    };

    playOrPauseAudioButton.onclick = function(event) {
        // TODO: Add your code here to play or pause the audio
        if (audio.paused) {
            //console.log('video.paused: ' + video.paused);
            audio.play();
        } else {
            //console.log('video.paused: ' + video.paused);
            audio.pause();
        }
        syncPlayOrPauseButtonWithMedia(audio, this);
    };

    var stop = function(mediaElement) {
        /*
         * TODO: Add your code here to stop the media element See:
         * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs#Stopping_the_video
         */
        mediaElement.pause();
        mediaElement.currentTime = 0;
    };

    stopVideoButton.onclick = function(event) {
        /*
         * TODO: Stop the media element by calling stop(mediaElement) and then
         * set the video's play/pause button's innerHTML to 'Play'.
         */
        stop(video);

    };

    stopAudioButton.onclick = function(event) {
        /*
         * TODO: Stop the media element by calling stop(mediaElement) and then
         * set the audio's play/pause button's innerHTML to 'Play'.
         */
        stop(audio);

    };

    var increaseVolume = function(mediaElement) {
        /*
         * TODO: Increase the volume property of the media element ONLY when it
         * is safe (don't go higher than a volume of 1.0 because that will cause
         * an error) and set the volume to 1.0 if the current volume is too
         * close to 1.0
         */
        if (mediaElement.volume < 0.95) {
            mediaElement.volume += 0.05;
        } else {
            mediaElement.volume = 1.0;
        }
        console.log("volume", mediaElement.volume);


    };

    increaseVideoVolumeButton.onclick = function(event) {
        increaseVolume(video);
    };

    increaseAudioVolumeButton.onclick = function(event) {
        increaseVolume(audio);
    };

    var decreaseVolume = function(mediaElement) {
        /*
         * TODO: Decrease the volume property of the media element ONLY when it
         * is safe (don't go lower than a volume of 0.0 because that will cause
         * an error) and set the volume to 0.0 if the current volume is too
         * close to 0.0
         */
        if (mediaElement.volume >= 0.05) {
            mediaElement.volume -= 0.05;
        } else if (mediaElement.volume > 0.03) {
            mediaElement.volume -= 0.01;
        } else {
            mediaElement.volume = 0;
        }
        console.log("volume", mediaElement.volume);
    };

    decreaseVideoVolumeButton.onclick = function(event) {
        decreaseVolume(video);
    };

    decreaseAudioVolumeButton.onclick = function(event) {
        decreaseVolume(audio);
    };
};
