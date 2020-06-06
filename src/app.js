class CatFightCLub {
    constructor(data) {
      this.data = data;
      this.leftFighter = 0;
      this.rightFighter = 0;
    }
  
    initialize() {
      this.onClick();
    }
  
    onClick() {
      const leftContainer = document.querySelector("#firstSide");
      const rightContainer = document.querySelector("#secondSide");
      let fighterRight = rightContainer.querySelectorAll(".fighter-box");
      Array.from(fighterRight).forEach((item) => {
        const fighterImage = item.getElementsByTagName("img");
        let id = JSON.parse(item.dataset.info).id;
        fighterImage[0].addEventListener("click", (e) => {
            this.selectFighter("right", id);
        });
      });
      let fighterLeft = leftContainer.querySelectorAll(".fighter-box");
      Array.from(fighterLeft).forEach((item) => {
        const fighterImage = item.getElementsByTagName("img");
        let id = JSON.parse(item.dataset.info).id;
        fighterImage[0].addEventListener("click", (e) => {
         this.selectFighter("left", id);
        });
      });
      const rButton = document.querySelector("#randomFight").addEventListener("click", (e) => {
          this.selectRandomFighters();
        });
      document.querySelector("#generateFight").disabled = true;
      const pButton = document.querySelector("#generateFight").addEventListener("click", (e) => {
          this.fight();
        });
    }
  
    selectRandomFighters() {
      let left = 0;
      let right = 0;
      const temp = document.querySelector("#firstSide").querySelectorAll(".fighter-box");
      while (left == right) {
        left = Math.floor(Math.random() * temp.length);
        right = Math.floor(Math.random() * temp.length);
      }
      this.selectFighter("left", JSON.parse(temp[left].dataset.info).id);
      this.selectFighter("right", JSON.parse(temp[right].dataset.info).id);
    }
  
    checkForFight() {
      if (this.leftFighter != 0 && this.rightFighter != 0) {
        document.querySelector("#generateFight").disabled = false;
      }
    }
  
    selectFighter(side, id) {
        this.reset();
      const fighterBox = document.querySelectorAll(".fighter-box");
      if (
        (side == "right" && id != this.leftFighter) ||
        (side == "left" && id != this.rightFighter)
      ) {
        Array.from(fighterBox).forEach((c) => {
            const _id = JSON.parse(c.dataset.info).id;
          if (_id == id) {
            if (side == "right" && c.classList.contains("right")) {

              this.rightFighter = id;
              c.querySelector("img").style.border="10px solid black";
              this.newInformation(id, side);
            } else if (side=="left" && c.classList.contains("left"))
            {
                this.leftFighter=id;
                c.querySelector("img").style.border="10px solid black";
                this.newInformation(id, side);
            }
          }
          else {
              if (!(side=="right" && _id==this.leftFighter))
              c.querySelector("img").style.border="";
          }
        });
      }
    }
  
    newInformation(id, side) {
        let item=this.getFighter(id);
      const fighterInfo = JSON.parse(item.dataset.info);
      var mSide;
      if (side == "right") {
        mSide = document.querySelector("#secondSide");
      } else {
        mSide = document.querySelector("#firstSide");
      }
      const mImage = mSide.querySelector(".featured-cat-fighter-image");
      const mName = mSide.querySelector(".name");
      const mAge = mSide.querySelector(".age");
      const mInfo = mSide.querySelector(".skills");
      const mRecord = mSide.querySelector(".record");
      mName.textContent = fighterInfo.name;
      mAge.textContent = fighterInfo.age;
      mInfo.textContent = fighterInfo.catInfo;
      mRecord.textContent = "Wins: " + fighterInfo.record.wins+" Loss: "+fighterInfo.record.loss;
      mImage.src = item.getElementsByTagName("img")[0].src;
      this.checkForFight();
    }
  
    fight() {
        this.reset();
      document.querySelector("body").style.pointerEvents = "none";
      const clock = document.querySelector("#clock");
      document.querySelector("h2").textContent="";
      const gameOverTime = new Date().getTime() + 3000;
      const interval = setInterval(() => {
        let time = new Date().getTime();
        let delta = gameOverTime - time;
        clock.textContent = delta / 1000;
        if (delta <= 0) {
          clearInterval(interval);
          clock.textContent="";
          const fighterLeft = this.getFighter(this.leftFighter);
          const leftFighterInfo = JSON.parse(fighterLeft.dataset.info);
          
          const fighterRight = this.getFighter(this.rightFighter);
          const rightFighterInfo = JSON.parse(fighterRight.dataset.info);
          const leftP =
            leftFighterInfo.record.wins /
            (leftFighterInfo.record.wins + leftFighterInfo.record.loss);
          const rightP =
            rightFighterInfo.record.wins /
            (rightFighterInfo.record.wins + rightFighterInfo.record.loss); //RF
          const mDelta = leftP - rightP;
          let temp = 0.5;
          let fightWineer;
          if (mDelta >= 0) {
            if (mDelta > 0.1) {
              temp = 0.69;
            } else {
              temp = 0.59;
            }
          } else {
            if (mDelta > -0.1) {
              temp = 0.29;
            } else {
              temp = 0.39;
            }
          }
          const v = Math.random();
          if (v <= temp)
          {
              fightWineer = "left";
          }
          else
          {
              fightWineer = "right";
          }
          const cRight = document.querySelector("#secondSide");
          const iRight = cRight.querySelector(".featured-cat-fighter-image");
          const cLeft = document.querySelector("#firstSide");
          const iLeft = cLeft.querySelector(".featured-cat-fighter-image");
  
          if ((fightWineer == "right")) {
            iRight.style.border = " 10px solid green";
            iLeft.style.border = "10px solid red";

            document.querySelector("#message").textContent = "WINNER IS" + rightFighterInfo.name;
            this.update(fighterRight, fighterLeft, fightWineer);
  
          } 
          else {
            iRight.style.border = "10px solid red";
            iLeft.style.border = "10px solid green";

            document.querySelector("#message").textContent = "WINNER IS" + leftFighterInfo.name;
            this.update(fighterLeft, fighterRight, fightWineer);

          }
          document.querySelector("body").style.pointerEvents = "auto";
        }
      }, 1);
    }
    
    reset() {
        const temp = document.querySelectorAll(".featured-cat-fighter-image");
        document.querySelector("#message").textContent="";
        //CHOSE YOUR CAT
        Array.from(temp).forEach((c) => {
            c.style.border="";
        })
    }
    
    getFighter(id)
    {
        const temp = document.querySelector("#firstSide").querySelectorAll(".fighter-box");
        let c;
        Array.from(temp).forEach((item) => {
            const _temp_id = JSON.parse(item.dataset.info).id
            if (id==_temp_id)
            {
                c = item;
            }
        })
        return c;
    }

    update(winner, loser, side)
    {
        const winnerTemp = JSON.parse(winner.dataset.info);
        const loserTemp = JSON.parse(loser.dataset.info);
        let _side;
        if(side=="right")
        {
            _side="left";
        }
        else
        {
             _side="right";
        }
        winnerTemp.record.wins++;
        loserTemp.record.loss++;
        winner.setAttribute("data-info",JSON.stringify(winnerTemp));
        loser.setAttribute("data-info",JSON.stringify(loserTemp));
        this.newInformation(winnerTemp.id,side)
        this.newInformation(loserTemp.id,_side);

        let data = new FormData();
        data.append('winner',winnerTemp.id);
        data.append('wins',winnerTemp.record.wins);
        data.append('loser',loserTemp.id);
        data.append('loss',loserTemp.record.loss);

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
            {
                console.log(":)");
            }
        }; 
        xmlhttp.open("GET", "./controller/db/Update.php?winner=" +winnerTemp.id +
                                                      "&wins=" +winnerTemp.record.wins +
                                                        "&loser=" +loserTemp.id +
                                                        "&loss=" + loserTemp.record.loss ,true);
        xmlhttp.send();
    }
  }

  const match = new CatFightCLub();
  match.initialize();