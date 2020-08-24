//Тоглоомын бүх газар ашиглагдах Глобал хувьсагчдыг энд хагалъя
//Тоглоом пууссан эсэхийг хадгалах төлөвийн хэвьсагч
var isNewGame;
//Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална
var activePlayer;
//Хоёр тоглогчийн цуглуулсан оноонууд
var scores;
//Идэвхитэй тоглогчийн цуглуулж байгаа ээлжийн оноо
var roundScore;
//Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод энд хадгалъя
var diceDom = document.querySelector(".dice");

//Тоглоомыг эхлүүлнэ
initGame();
//Тоглоомыг шинээр эхлэхэд бэлтгэнэ
function initGame() {
  //Тоглоом эхэллээ гэдэг тлөвт оруулна
  isNewGame = true;
  // Тоглогчийн ээлжийг хадгалах хувьсагч,  нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе
  activePlayer = 0;

  // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадглах хувьсагч
  roundScore = 0;

  //Программ эхлэхэд бэлтгэе
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Тоглогчдын нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}
// Шоог шидэх Eventlistener
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isNewGame) {
    // 1-6 доторх санамсаргүй тоо гаргаж авна
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    // Шооны зургийг вэб дээрээ гаргаж ирнэ
    diceDom.style.display = "block";
    //Буусан санамсаргүй тоонд харгалзах шүүны зургийг вэб дээр гаргаж ирнэ
    diceDom.src = "dice-" + diceNumber + ".png";
    // Буусан тоо нь 1ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ
    if (diceNumber !== 1) {
      // 1 ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө
      roundScore = roundScore + diceNumber;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. New Game товчийг дарж шинээр эхлэнэ үү.");
  }
});
// Hold товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isNewGame) {
    //Уг тоглогчийн цуглуулсан ээлжний оноог глобл оноон дээр нь нэмж өгнө
    scores[activePlayer] = scores[activePlayer] + roundScore;
    // Дэлгэц дээр оноог нь өөрчлөнө
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];
    //Уг тоглогч хожсон эсэхийг (оноо нь 100ас их эсэхийг) шалгах
    if (scores[activePlayer] >= 100) {
      //Тоглоомыг дууссан төлөвт оруулна
      isNewGame = false;
      //Ялагч гэсэн текстийг нэрнийх нь оронд гаргана
      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      //Тоглогчийн ээлжийг солино
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. New Game товчийг дарж шинээр эхлэнэ үү.");
  }
});
//Энэ функц нь тоглох ээлжийг дараагийн тоглогч рүү шилжүүлнэ
function switchToNextPlayer() {
  //Ээлжийн оноог нь 0 болгоно
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = "0";
  //Тоглогчийн ээлжийг солино
  // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог  0 болгоно
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  //Тоглогчийн ээлжиййг нөгөө тоглогч руу шилжүүлнэ
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //Шоог түр алга болгоно
  diceDom.style.display = "none";
}

//Шинэ тоглоом эхлүүлэх товчны эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
