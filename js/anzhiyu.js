var navMusicEl = document.getElementById("nav-music");
var changeMusicListFlag = true;
var selectRandomSong = [];
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
            // 第一次进入，绑定事件，改背景
          anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
          // 绑定事件
          $("body").css("background","rgb(13, 13, 13)")
          anzhiyu.jayClick();
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
      
    // 第一次进入，绑定事件，改背景
      const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
      const anMusicBg = document.getElementById("an_music_bg");
      anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
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
    r.volume(.2, !0),
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
        // var e, t;
        // changeMusicListFlag ? (t = (e = document.getElementById("anMusic-page").querySelector("meting-js").aplayer).list.audios,
        // t = Math.floor(Math.random() * t.length),
        // e.list.switch(t)) : anzhiyu.cacheAndPlayMusic()
    }),
    // o.addEventListener("click", function() {
    //     localStorage.removeItem("musicData"),
    //     anzhiyu.snackbarShow("已移除相关缓存歌曲")
    // }),
    // i.addEventListener("click", function() {
    //     anzhiyu.changeMusicList()
    // }),
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
changeMusicList: function() {
  var e = _asyncToGenerator(_regeneratorRuntime().mark(function e() {
      var t, n, o, i, r;
      return _regeneratorRuntime().wrap(function(e) {
          for (; ; )
              switch (e.prev = e.next) {
              case 0:
                  t = document.getElementById("anMusic-page"),
                  t = t.querySelector("meting-js").aplayer,
                  n = (new Date).getTime(),
                  o = JSON.parse(localStorage.getItem("musicData")) || {
                      timestamp: 0
                  },
                  i = [],
                  changeMusicListFlag ? (i = defaultPlayMusicList,
                  e.next = 23) : e.next = 9;
                  break;
              case 9:
                  defaultPlayMusicList = t.list.audios,
                  n - o.timestamp < 864e5 ? (i = o.songs,
                  e.next = 23) : e.next = 14;
                  break;
              case 14:
                  return e.next = 16,
                  fetch("/json/music.json");
              case 16:
                  return r = e.sent,
                  e.next = 19,
                  r.json();
              case 19:
                  i = e.sent,
                  o.timestamp = n,
                  o.songs = i,
                  localStorage.setItem("musicData", JSON.stringify(o));
              case 23:
                  t.list.clear(),
                  t.list.add(i),
                  changeMusicListFlag = !changeMusicListFlag;
              case 26:
              case "end":
                  return e.stop()
              }
      }, e)
  }));
  return function() {
      return e.apply(this, arguments)
  }
},
cacheAndPlayMusic: function() {
  if (e = localStorage.getItem("musicData")) {
      var e = JSON.parse(e);
      if ((new Date).getTime() - e.timestamp < 864e5)
          return void anzhiyu.playMusic(e.songs)
  }
  fetch("/json/music.json").then(function(e) {
      return e.json()
  }).then(function(e) {
      var t = {
          timestamp: (new Date).getTime(),
          songs: e
      };
      localStorage.setItem("musicData", JSON.stringify(t))
      anzhiyu.playMusic(e)
  })
},
playMusic: function(e) {
  var t = document.getElementById("anMusic-page").querySelector("meting-js").aplayer
    , n = e[Math.floor(Math.random() * e.length)]
    , o = t.list.audios;
  if (selectRandomSong.includes(n.name)) {
      for (var i, r = !1; !r; ) {
          var a = e[Math.floor(Math.random() * e.length)];
          if (selectRandomSong.includes(a.name) || (t.list.add([a]),
          t.list.switch(o.length),
          selectRandomSong.push(a.name),
          r = !0),
          selectRandomSong.length === e.length)
              break
      }
      r || -1 != (i = o.findIndex(function(e) {
          return e.name === n.name
      })) && t.list.switch(i)
  } else{
    t.list.add([n]),
    t.list.switch(o.length),
    selectRandomSong.push(n.name);
    // new Vue({
    //   data: function () {
    //     this.$notify({
    //       title: "",
    //       message: "本次随机歌曲："+n.name,
    //       position: 'top-left',
    //       offset: 50,
    //       showClose: true,
    //       type: "success",
    //       duration: 5000
    //     });
    //   }
    // })
  }
},
jayClick: function(){
  // 隐藏循环播放
  document.querySelector(".aplayer-icon-loop").style.display = "none";
  var jayBtn = document.querySelector(".aplayer-time");
  var newElement = document.createElement('button');
  newElement.id = "anMusicBtnGetSong";
  newElement.classList.add("aplayer-icon-jay","aplayer-icon");
  newElement.setAttribute("title","随机周董单曲，打开异世界的大梦")
  newElement.innerHTML = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="750" height="750" viewBox="0 0 750 750" enable-background="new 0 0 750 750" xml:space="preserve">  <image id="image0" width="750" height="750" x="0" y="0"
      href="https://tuchuang.voooe.cn/images/2024/05/23/jay.png" ></image>
  </svg>
   `
  jayBtn.appendChild(newElement);
  var playJayBtn = document.querySelector(".aplayer-icon-jay");
  playJayBtn.addEventListener("click", function() {
      anzhiyu.cacheAndPlayMusic()
  })
  
}
};

if ($("#anMusic-page").length) {
  $("#page").addClass("pageClass");
  $("#nav").addClass("navClass")
  $("#web_bg, #footer, #nav-music").hide();
} else {
  $("#page").removeClass("pageClass")
  $("#nav").removeClass("navClass")
  $("#web_bg, #footer, #nav-music").show();
}

// 如果有右键事件 可以在这里写。
// addRightMenuClickEvent();


// 调用
anzhiyu.changeMusicBg(false);