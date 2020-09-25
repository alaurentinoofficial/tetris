function AudioComponent(audioComponent) {
    return {
        component: audioComponent
        , Play: function() {
            audioComponent.play();
        }
        , Pause: function() {
            audioComponent.pause();
        }
        , Stop: function () {
            audioComponent.pause();
            audioComponent.currentTime = 0;
        }
        , SetVolume: function (volume) {
            audioComponent.volume = volume;
        }
        , SetLoop: function (state) {
            audioComponent.loop = state;
        } 
    };
}

var AudioMixer = (function () {
    var instance;
    var audios = {}

    function AddAudio(name, audioComponent) {
        audios[name] = new AudioComponent(audioComponent);
    }

    function GetAudios() {
        return audios;
    }
 
    function constructor() {
        var object = {
            AddAudio: AddAudio
            , GetAudios: GetAudios
        };

        return object;
    }
 
    return {
        GetInstance: function () {
            if (!instance) {
                instance = constructor();
            }
            return instance;
        }
    };
})();