var navMusicEl = document.getElementById("nav-music");
var anzhiyu = {
  //切换音乐播放状态
  musicToggle: function (changePaly = true) {
    if (!anzhiyu_musicFirst) {
      musicBindEvent();
      anzhiyu_musicFirst = true;
    }
    let msgPlay = '<i class="fa-solid fa-play"></i><span>播放音乐</span>'; // 此處可以更改為你想要顯示的文字
    let msgPause = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>'; // 同上，但兩處均不建議更改
    if (anzhiyu_musicPlaying) {
      navMusicEl.classList.remove("playing");
      // 修改右键菜单文案为播放
      // document.getElementById("menu-music-toggle").innerHTML = msgPlay;
      document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
      // document.querySelector("#consoleMusic").classList.remove("on");
      anzhiyu_musicPlaying = false;
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.add("playing");
      // 修改右键菜单文案为暂停
      // document.getElementById("menu-music-toggle").innerHTML = msgPause;
      // document.querySelector("#consoleMusic").classList.add("on");
      anzhiyu_musicPlaying = true;
      navMusicEl.classList.add("stretch");
    }
    if (changePaly) document.querySelector("#nav-music meting-js").aplayer.toggle();
  },
  // 音乐伸缩
  musicTelescopic: function () {
    if (navMusicEl.classList.contains("stretch")) {
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.add("stretch");
    }
  },

  //音乐上一曲
  musicSkipBack: function () {
    document.querySelector("#nav-music meting-js").aplayer.skipBack();
  },

  //音乐下一曲
  musicSkipForward: function () {
    document.querySelector("#nav-music meting-js").aplayer.skipForward();
  },

  //获取音乐中的名称
  musicGetName: function () {
    var x = $(".aplayer-title");
    var arr = [];
    for (var i = x.length - 1; i >= 0; i--) {
      arr[i] = x[i].innerText;
    }
    return arr[0];
  },

   // 音乐节目切换背景
   changeMusicBg: function (isChangeBg = true) {
    if (window.location.pathname != "/life/music/") {
      return;
    }
    const anMusicBg = document.getElementById("an_music_bg");

    if (isChangeBg) {
      // player listswitch 会进入此处
      const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
      anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
    } else {
      // 第一次进入，绑定事件，改背景
      let timer = setInterval(() => {
        const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
        // 确保player加载完成
        if (musiccover) {
          clearInterval(timer);
          anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
          // 绑定事件
          anzhiyu.addEventListenerChangeMusicBg();
          anzhiyu.addEventListenerMusic();
          // 暂停nav的音乐
          if (
            document.querySelector("#nav-music meting-js").aplayer &&
            !document.querySelector("#nav-music meting-js").aplayer.audio.paused
          ) {
            anzhiyu.musicToggle();
          }
        }
      }, 100);
    }
  },
  addEventListenerChangeMusicBg: function () {
    const anMusicPage = document.getElementById("anMusic-page");
    const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");

    anMusicPage.querySelector("meting-js").aplayer.on("loadeddata", function () {
      anzhiyu.changeMusicBg();
      console.info("player loadeddata");
    });

    aplayerIconMenu.addEventListener("click", function () {
      document.getElementById("menu-mask").style.display = "block";
      document.getElementById("menu-mask").style.animation = "0.5s ease 0s 1 normal none running to_show";
    });

    document.getElementById("menu-mask").addEventListener("click", function () {
      if (window.location.pathname != "/music/") return;
      anMusicPage.querySelector(".aplayer-list").classList.remove("aplayer-list-hide");
    });
  },
  addEventListenerMusic: function() {
    var t = document.getElementById("anMusic-page")
      , e = t.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu")
      , n = t.querySelector("#anMusicBtnGetSong")
      , o = t.querySelector("#anMusicRefreshBtn")
      , i = t.querySelector("#anMusicSwitching")
      , r = t.querySelector("meting-js").aplayer;
    r.volume(.8, !0),
    r.on("loadeddata", function() {
        anzhiyu.changeMusicBg()
    }),
    e.addEventListener("click", function() {
        document.getElementById("menu-mask").style.display = "block",
        document.getElementById("menu-mask").style.animation = "0.5s ease 0s 1 normal none running to_show",
        t.querySelector(".aplayer.aplayer-withlist .aplayer-list").style.opacity = "1"
    }),
    document.getElementById("menu-mask").addEventListener("click", function e() {
        "/life/music/" != window.location.pathname ? document.getElementById("menu-mask").removeEventListener("click", e) : t.querySelector(".aplayer-list").classList.remove("aplayer-list-hide")
    }),
    n.addEventListener("click", function() {
        var e, t;
        changeMusicListFlag ? (t = (e = document.getElementById("anMusic-page").querySelector("meting-js").aplayer).list.audios,
        t = Math.floor(Math.random() * t.length),
        e.list.switch(t)) : anzhiyu.cacheAndPlayMusic()
    }),
    o.addEventListener("click", function() {
        localStorage.removeItem("musicData"),
        anzhiyu.snackbarShow("已移除相关缓存歌曲")
    }),
    i.addEventListener("click", function() {
        anzhiyu.changeMusicList()
    }),
    "custom" === GLOBAL_CONFIG.music_page_default && anzhiyu.changeMusicList(),
    document.addEventListener("keydown", function(e) {
        "Space" === e.code && (e.preventDefault(),
        r.toggle()),
        39 === e.keyCode && (e.preventDefault(),
        r.skipForward()),
        37 === e.keyCode && (e.preventDefault(),
        r.skipBack()),
        38 === e.keyCode && musicVolume <= 1 && (musicVolume += .1,
        r.volume(musicVolume, !0)),
        40 === e.keyCode && 0 <= musicVolume && (musicVolume += -.1,
        r.volume(musicVolume, !0))
    })
},
};

// 如果有右键事件 可以在这里写。
// addRightMenuClickEvent();

// 调用
anzhiyu.changeMusicBg(false);