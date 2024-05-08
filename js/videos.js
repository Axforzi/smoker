const videos = document.querySelectorAll(".video-card");

videos.forEach(e => {
    const video = e.querySelector("video");
    const play = e.querySelector(".controls .play span");
    const fullscreen = e.querySelector(".controls .fullscreen span")
    const volume = e.querySelector(".controls .volume span");

    // PLAY BUTTON
    play.onclick = () =>{
        if (video.paused) {
            play.innerText = "pause";
            video.play();   
        }
        else{
            play.innerText = "play_arrow";
            video.pause();   
            e.querySelector(".play-resume").classList.toggle("hide");
        }
    }

    // VOLUME BUTTON
    volume.onclick = () => {
        if(video.volume === 1){
            volume.innerText = "volume_off";
            video.volume = 0;
        } else{
            volume.innerText = "volume_up";
            video.volume = 1;
        }
    };

    // FULLSCREEN BUTTON
    fullscreen.onclick = () =>{
        if(document.fullscreenElement){
            fullscreen.innerText = "fullscreen"
            document.exitFullscreen();

            // CHANGE RESOLUTION
            const container = e.querySelector(".container-controls");
            container.classList.toggle("fullscreen");
            container.style.maxWidth = `100%`
        }
        else{
            fullscreen.innerText = "close_fullscreen"
            e.requestFullscreen();

            // CHANGE RESOLUTION
            const container = e.querySelector(".container-controls");
            container.classList.toggle("fullscreen");
            container.style.maxWidth = `${video.getBoundingClientRect().width()}px`;
        }
    }
    e.onfullscreenchange = () => { // CHANGE BUTTON STYLE EVEN IF EXIT FULLSCREEN BY PRESSING ESC BUTTON
        if(!document.fullscreenElement){
            const container = e.querySelector(".container-controls");
            if (container.classList.contains("fullscreen")){
                container.classList.toggle("fullscreen");
            }
            fullscreen.innerText = "fullscreen";
        }
    };

    video.ontimeupdate = (event) => {
        let { currentTime, duration } = event.target;
        let percent = (currentTime / duration) * 100;

        if(currentTime === duration) { 
            e.querySelector(".play-resume").classList.toggle("hide");
            e.querySelector(".play-resume span").innerText = "replay";
        } else{
            e.querySelector(".current-time").style.height= `2px`;
            e.querySelector(".current-time").style.width = `${percent}%`
        }
    };
});

const playVideo = (e) =>{
    e.currentTarget.querySelector("span").innerText = "play_arrow"

    const card = e.currentTarget.parentNode;
    const video = card.querySelector("video");

    card.querySelector(".controls .play span").innerText = "pause";
    e.currentTarget.classList.toggle("hide");
    video.play();
}