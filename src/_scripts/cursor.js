class Cursor {
  constructor() {
    this.enabled = (localStorage.cursorenabled === 'true') ? true : false;
    this.hidden = false;
    this.size = 25;
    this.element = document.querySelector(".cursor");
    this.style = this.element.style;
    this.style.display = "none";
    this.x = 0;
    this.y = 0;
  }
  update(x, y) {
    this.move(x, y);
    if (this.hidden) {
      this.style.display = "none";
    } else {
      this.style.display = "block";
    }
  }
  show() {
    this.hidden = false;
    this.update();
  }
  hide() {
    this.hidden = true;
    this.update();
  }
  move(x, y) {
    this.style.left = x - 25 / 2 + "px";
    this.style.top = y - 25 / 2 + "px";
  }
  set(src) {
    this.element.querySelector("img").setAttribute("src", src);
  }
  track(){
    if(!this.enabled){
      return;
    }
    document.head.innerHTML = document.head.innerHTML + '<style type="text/css">*{cursor: none;}</style>'
    document.head.innerHTML = document.head.innerHTML + '<style type="text/css">iframe{pointer-events: none;}</style>'
    if(this.element == undefined){
      this.element = document.querySelector(".cursor");
      this.style = this.element.style;
    }
    document.body.addEventListener("mousemove", function(e){
        document.querySelectorAll(".pointer").forEach(pointer => {
            pointer.classList.remove("pointer");
        });
        if(e.target.classList.contains("crop")){
            e.target.closest(".window").querySelector("iframe").classList.add("pointer");
            cursor.hide();
            return;
        }
        cursor.update(e.clientX, e.clientY);
        if(e.target.closest(".dot") || e.target.closest(".dropdown") || e.target.closest("a")){
          cursor.set("assets/cursors/posy/posy black hand.cur");
        }else if(e.target.closest(".window")){
          let dir = e.target.dataset.dir;
          if(dir){
            if(dir == "u" || dir == "d"){
              cursor.set("assets/cursors/posy/PosyBlacksizeNS.cur");
              return;
            }else if(dir == "l" || dir == "r"){
              cursor.set("assets/cursors/posy/PosyBlacksizeEW.cur");
              return;
            }
          }
          cursor.set("assets/cursors/posy/PosyBlackmove.cur");
        }else if(e.target.closest(".loading")){
          cursor.hide();
        }else{
          cursor.set("assets/cursors/posy/PosyBlackPoint.cur");
          // default cursor
        }
      })
      window.addEventListener("mouseout", function(){
        cursor.hide();
      });
      window.addEventListener("mouseover", function(){
        cursor.show();
      })
  }
}
let cursor = new Cursor(25);
