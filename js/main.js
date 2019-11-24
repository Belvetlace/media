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



    var syncPlayOrPauseButtonWithMedia = function(mediaElement, button) {
        /*
         * button's innerHTML set to 'Pause' or 'Play' depending on if
         * the media element is paused or not.
         */
        button.innerHTML = (mediaElement.paused) ? 'Play' : 'Pause';
        console.log("syncPlayOrPauseButtonWithMedia called " + mediaElement + " " + button);
    };

    var mediaIsPlayingOrJustPaused = function(event) {
        console.log("mediaIsPlayingOrJustPaused called with event:", event.type, event.target.id);
        /*
         * when the media is playing or just paused calls
         * syncPlayOrPauseButtonWithMedia with parameters (mediaElement, button)
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
         * appropriate button's content is set to 'Play' by calling
         * syncPlayOrPauseButtonWithMedia with parameters: (mediaElement, button).
         */
        event.target.currentTime = 0;
        if (event.target.id === 'video') {
            syncPlayOrPauseButtonWithMedia(event.target, playOrPauseVideoButton);
        } else {
            syncPlayOrPauseButtonWithMedia(event.target, playOrPauseAudioButton);
        }
    };

    /*
     * Binding video and audio elements
     * call mediaIsPlayingOrJustPaused(event) in reaction to 'play' and 'pause' events
     * and call our mediaHasJustEnded(event) in reaction to the 'ended' event.
     */
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
    
    playOrPauseVideoButton.onclick = function(event) {
        // video is set to play or pause on button click
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }

        //syncPlayOrPauseButtonWithMedia(video, this);
    };

    playOrPauseAudioButton.onclick = function(event) {
        // audio is set to play or pause on button click
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        syncPlayOrPauseButtonWithMedia(audio, this);
    };

    var stop = function(mediaElement) {
        /*
         * media element is stopped and set to the beginning
         */
        mediaElement.pause();
        mediaElement.currentTime = 0;
    };

    stopVideoButton.onclick = function(event) {
        /*
         * media element stopped by calling stop(mediaElement).
         * audio's play/pause button's set to 'Play' by event listeners.
         */
        stop(video);

    };

    stopAudioButton.onclick = function(event) {
        /*
         * media element stopped by calling stop(mediaElement).
         * audio's play/pause button's set to 'Play' by event listeners.
         */
        stop(audio);

    };

    var increaseVolume = function(mediaElement) {
        /*
         * Volume property of the media element  increased ONLY when it
         * is loweer than 1.0
         * Volume is set to 1.0 if the current volume is too close to 1.0
         */
        if (mediaElement.volume <= 0.9) {
            mediaElement.volume = (mediaElement.volume*10 + 0.1*10)/10;
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
         * Volume property of the media element is decreased
         * ONLY when it is higher than 0.0
         * Volume is set to 0.0 if the current volume is too close to 0.0
         */
        if (mediaElement.volume >= 0.1) {
            mediaElement.volume = (mediaElement.volume*10 - 0.1*10)/10;
        } else {
            mediaElement.volume = 0.0;
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
