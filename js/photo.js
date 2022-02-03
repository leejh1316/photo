$(function () {
  const photoPreview = $(".photoPreview");
  const targetFile = $("#photoAddInput");
  const finishBtns = $(".finishBtns");
  const photoInner = $(".photoInner");
  const albumMain = $(".albumMain");
  const photoEditCon = $(".photoEditCon");
  let albumCount = 0;
  const event = {
    btFinish: function () {
      photoInner.prepend(
        `<div class="photo"><img src=${photoPreview[0].src} class="imgAdj"></div>`
      );
      event.photoOverflow();
      photoEditCon.css("zIndex", "-3");
      photoEditCon.css("opacity", "0");
    },
    files: function (e) {
      if (!$(this)[0].files[0].type.match(/image\//)) {
        alert("이미지 파일이 아님");
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        photoPreview[0].src = `${e.target.result}`;
      };
      reader.readAsDataURL($(this)[0].files[0]);
      photoEditCon.css("zIndex", "3");
      photoEditCon.css("opacity", "1");
      targetFile.val("");
    },

    photoOverflow: function (e) {
      if (photoInner[albumCount].children.length > 5) {
        albumMain.prepend(
          `<div class="albumCon"><div class="arrowLeft"></div><div class="arrowRight"></div><div class="photoInner"></div></div>`
        );
        $(".nowAlbum").animate(
          {
            left: `${20}`,
            height: `70%`,
          },
          600
        );
      }
    },
  };

  targetFile.on("change", event.files);
  finishBtns.on("click", event.btFinish);
});
