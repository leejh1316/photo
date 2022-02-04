$(function () {
  const photoPreview = $(".photoPreview");
  const targetFile = $("#photoAddInput");
  const albumMain = $(".albumMain");
  // const finishBtns = $(".finishBtns");
  // const photoEditCon = $(".photoEditCon");

  const event = {
    // btFinish: function () {
    //   const activeAlbum = $(".activeAlbum");
    //   activeAlbum
    //     .children()
    //     .eq(2)
    //     .prepend(
    //       `<div class="photo"><img src=${photoPreview[0].src} class="imgAdj"><div class="photoBtns"></div></div>`
    //     );
    //   event.photoOverflow();
    //   photoEditCon.css("zIndex", "-3");
    //   photoEditCon.css("opacity", "0");
    // },
    files: function (e) {
      if (!$(this)[0].files[0].type.match(/image\//)) {
        alert("이미지 파일이 아님");
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        // photoPreview[0].src = `${e.target.result}`;
        const activeAlbum = $(".activeAlbum");
        activeAlbum
          .children()
          .eq(2)
          .prepend(
            `<div class="photo"><img src=${e.target.result} class="imgAdj"><div class="photoBtns"><label for="edit" class="editLabel">🔨</label><input type="file" id="edit"/><button class="del">❌</button></div></div>`
          );
        event.photoOverflow();
        console.dir($(".photo"));
        const photo = document.querySelector(".photo");
        console.dir(photo);
        photo.addEventListener("mouseenter", event.photoBtnsEnter);
        photo.addEventListener("mouseleave", event.photoBtnsLeave);
      };
      reader.readAsDataURL($(this)[0].files[0]);
      // photoEditCon.css("zIndex", "90");
      // photoEditCon.css("opacity", "1");
      targetFile.val("");
    },

    photoOverflow: function (e) {
      const photoCount = $(".activeAlbum").children().eq(2).children().length; //사진이 넣어질 앨범의 사진개수 반환받음
      const activeAlbum = $(".activeAlbum");
      if (photoCount > 5) {
        $(".unActiveAlbum").each(function () {
          $(this).animate(
            {
              left: `${$(this).position().left + 1100}px`,
            },
            600
          );
        });
        activeAlbum.animate(
          {
            left: `1100px`,
            height: `70%`,
          },
          600
        );
        activeAlbum.css("zIndex", "-3");
        activeAlbum.addClass("unActiveAlbum");
        activeAlbum.removeClass("nowAlbum");
        activeAlbum.removeClass(".firstAlbum");
        activeAlbum.removeClass("activeAlbum");
        albumMain.prepend(
          `<div class="albumCon createAlbum activeAlbum nowAlbum firstAlbum "><div class="arrowLeft"></div><div class="arrowRight"></div><div class="photoInner"></div></div>`
        );
        $(".createAlbum").animate(
          {
            opacity: `1`,
          },
          800,
          function () {
            $(".createAlbum").removeClass("createAlbum");
          }
        );
        $(".arrowLeft").on("click", this.btLeft);
        $(".arrowRight").on("click", this.btRight);
        $(".activeAlbum").children().eq(0).off("click", this.btLeft);
        $(".lastAlbum").children().eq(1).off("click", this.btRight);
        $(".beginningAlbum").children().eq(1).off("click", this.btRight);
      }
    },
    btLeft: function () {
      const nowAlbum = $(".nowAlbum");
      nowAlbum
        .prev()
        .prevAll()
        .each(function () {
          $(this).animate(
            {
              left: `${$(this).position().left + 1100}px`,
            },
            600
          );
        });
      nowAlbum.nextAll().each(function () {
        $(this).animate(
          {
            left: `${$(this).position().left + 1100}px`,
          },
          600
        );
      });
      nowAlbum.prev().animate(
        {
          height: `100%`,
          left: `0px`,
        },
        600
      );
      nowAlbum.animate(
        {
          height: `70%`,
          left: `1100px`,
        },
        600,
        function () {
          nowAlbum.css("zIndex", "-3");
          nowAlbum.prev().css("zIndex", "2");
          nowAlbum.prev().addClass("nowAlbum");
          nowAlbum.removeClass("nowAlbum");
        }
      );
    },
    btRight: function () {
      const nowAlbum = $(".nowAlbum");
      nowAlbum
        .next()
        .nextAll()
        .each(function () {
          $(this).animate(
            {
              left: `${$(this).position().left - 1100}px`,
            },
            600
          );
        });
      nowAlbum.prevAll().each(function () {
        $(this).animate(
          {
            left: `${$(this).position().left - 1100}px`,
          },
          600
        );
      });

      nowAlbum.next().animate(
        {
          height: `100%`,
          left: `0px`,
        },
        600
      );
      nowAlbum.animate(
        {
          height: `70%`,
          left: `-1100px`,
        },
        600,
        function () {
          nowAlbum.css("zIndex", "-3");
          nowAlbum.next().css("zIndex", "2");
          nowAlbum.next().addClass("nowAlbum");
          nowAlbum.removeClass("nowAlbum");
        }
      );
    },
    photoBtnsEnter: function (e) {
      console.dir(e);
      changeURL = e.target.children[0];
      console.dir(e.target.children[0]);
      e.target.style.opacity = "0.5";
      e.target.children[1].style.display = "block";
      e.target.children[1].children[1].addEventListener(
        "change",
        event.imgChange
      ); // input btn
      e.target.children[1].children[2]; // del btn
    },
    photoBtnsLeave: function (e) {
      console.dir(e);
      e.target.style.opacity = "1";
      e.target.children[1].style.display = "none";
    },
    imgChange: function (e) {
      if (!$(this)[0].files[0].type.match(/image\//)) {
        alert("이미지 파일이 아님");
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        changeURL.src = `${e.target.result}`;
      };
      reader.readAsDataURL($(this)[0].files[0]);
      targetFile.val("");
    },
  };

  targetFile.on("change", event.files);
  // finishBtns.on("click", event.btFinish);
});

//NowAlbum = 지금 보고있는 앨범
//ActiveAlbum = 사진이 넣어질 앨범
//createAlbum = 새로생긴 앨범 이벤트 진행후 없어짐
//albumCon = 기본 앨범 틀
