const quiz = [
  {
    question: "「メロンパン」の名前の由来は？",
    answers: ["メロンの形", "メロンの香り", "メロン味", "創案者の名前"],
    correct: "メロンの形",
    correctAnswer: "メロンの形", // 正解を示すプロパティを追加
  },
  {
    question: "メロンパンの初出は？",
    answers: ["江戸時代", "明治時代", "大正時代", "昭和時代"],
    correct: "明治時代",
    correctAnswer: "明治時代",
  },
  {
    question: "どのディズニーキャラをモチーフに作られたメロンパン？",
    imagePath: "./photos/マイク.svg",
    answers: [
      "グリーンアーミーメン",
      "リトルグリーンメン",
      "シュレック",
      "マイク・ワゾウスキ",
    ],
    correct: "マイク・ワゾウスキ",
    correctAnswer: "マイク・ワゾウスキ",
  },
  {
    question: "どこのメロンパン？",
    imagePath: "./photos/ローソン.svg",
    answers: ["ファミマ", "セブンイレブン", "ミニストップ", "ローソン"],
    correct: "ローソン",
    correctAnswer: "ローソン",
  },
  {
    question: "どこのメロンパン？",
    imagePath: "./photos/新宿.svg",
    answers: [
      "ベーカリー明治堂(王子)",
      "八天堂(池袋)",
      "メロンパンファクトリー(大井町)",
      "HOKUO(新宿)",
    ],
    correct: "HOKUO(新宿)",
    correctAnswer: "HOKUO(新宿)",
  },
  {
    question:
      "これは高田馬場「東京メロンパン」のメロンパンですが、何味でしょう？",
    imagePath: "./photos/東京.svg",
    answers: ["ノーマル", "ココア", "シナモン", "キャラメル"],
    correct: "シナモン",
    correctAnswer: "シナモン",
  },
];
const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.getElementsByTagName("button");
//「＄」でHTMLのオブジェクトが入っていることが理解しやすい
const buttonLength = $button.length;

//クイズの問題文、選択肢を定義
const setupQuiz = () => {
  document.getElementById("js-question").textContent = ""; // 問題文をクリア

  const currentQuestion = quiz[quizIndex].question;
  let i = 0;

  // タイピングアニメーション
  const interval = setInterval(() => {
    if (i < currentQuestion.length) {
      document.getElementById("js-question").textContent +=
        currentQuestion.charAt(i);
      i++;
    } else {
      clearInterval(interval); // アニメーション終了後にタイマーをクリア

      // 問題文の表示後に画像の表示を行うコード
      if (quiz[quizIndex].imagePath) {
        const quizImage = document.getElementById("quizImage");
        quizImage.src = quiz[quizIndex].imagePath;
      }

      // ここで選択肢を表示する処理を追加
      let buttonIndex = 0;
      while (buttonIndex < buttonLength) {
        $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
        buttonIndex++;
      }
    }
  }, 150); // 各文字の出力間隔（ミリ秒）
};

setupQuiz(); // クイズの問題文や選択肢の書き換えを行なっている命令

// ポップアップ
const clickHandler = (e) => {
  if (quiz[quizIndex].correct === e.target.textContent) {
    window.alert("正解！");
    score++;
  } else {
    window.alert("不正解！");
  }

  quizIndex++;

  if (quizIndex < quizLength) {
    setupQuiz();
  } else {
    let finalMessage = "";
    if (score === quizLength) {
      finalMessage = "全問正解！君はもうメロンパン博士だ！";
    } else if (score >= quizLength / 2) {
      finalMessage = "よくやった！まだまだこれからだ！";
    } else {
      finalMessage =
        "やる気を出そうよ！正解数は " + score + " / " + quizLength + " です。";
    }

    window.alert("終了！" + finalMessage);
  }
};

//ボタンをクリックしたら正解判定
let handlerIndex = 0;
while (handlerIndex < buttonLength) {
  $button[handlerIndex].addEventListener("click", (e) => {
    clickHandler(e);
  });
  handlerIndex++;
}
