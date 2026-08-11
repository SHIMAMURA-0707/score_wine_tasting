// -----------------------------
// 選択肢を作成
// -----------------------------

function createOptions(id, max) {
  const select = document.getElementById(id);

  for (let i = 0; i <= max; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }
}

createOptions("appearance", 8);
createOptions("aroma", 12);
createOptions("taste", 7);
createOptions("other", 4);


// -----------------------------
// ○ / × の選択
// -----------------------------

const judgments = {
  country: null,
  vintage: null,
  variety: null
};

document.querySelectorAll(".buttons").forEach(group => {
  const target = group.dataset.target;

  group.querySelectorAll(".judge-button").forEach(button => {
    button.addEventListener("click", () => {

      const value = button.dataset.value;
      judgments[target] = value;

      group.querySelectorAll(".judge-button").forEach(btn => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");
    });
  });
});


// -----------------------------
// 採点
// -----------------------------

document.getElementById("calculateButton").addEventListener("click", () => {

  // 入力値
  const appearance =
    Number(document.getElementById("appearance").value);

  const aroma =
    Number(document.getElementById("aroma").value);

  const taste =
    Number(document.getElementById("taste").value);

  const other =
    Number(document.getElementById("other").value);

  const country = judgments.country;
  const vintage = judgments.vintage;
  const variety = judgments.variety;


  // -----------------------------
  // 必須判定
  // -----------------------------

  if (!country || !vintage || !variety) {
    alert("国・収穫年・品種をすべて選択してください。");
    return;
  }


  // -----------------------------
  // 各項目の得点
  // -----------------------------

  const appearanceScore = appearance * 2;
  const aromaScore = aroma * 2;
  const tasteScore = taste * 2.3;
  const otherScore = other * 3;

  const countryScore =
    country === "○" ? 10 : 0;


  // 国が×の場合、
  // 収穫年が○でも0点
  let vintageScore;

  if (country === "×") {
    vintageScore = 0;
  } else {
    vintageScore =
      vintage === "○" ? 6 : 0;
  }


  const varietyScore =
    variety === "○" ? 16 : 0;


  // -----------------------------
  // 合計点
  // -----------------------------

  const total =
    appearanceScore +
    aromaScore +
    tasteScore +
    otherScore +
    countryScore +
    vintageScore +
    varietyScore;

  // 小数第1位まで表示
  const roundedTotal =
    Math.round(total * 10) / 10;


  // -----------------------------
  // 結果表示
  // -----------------------------

  const resultDetails =
    document.getElementById("resultDetails");

  resultDetails.innerHTML = `
    <div class="result-row">
      <div class="result-name">外観</div>
      <div class="result-calculation">
        ${appearance} × 2 ＝ ${appearanceScore}点
      </div>
    </div>

    <div class="result-row">
      <div class="result-name">香り</div>
      <div class="result-calculation">
        ${aroma} × 2 ＝ ${aromaScore}点
      </div>
    </div>

    <div class="result-row">
      <div class="result-name">味わい</div>
      <div class="result-calculation">
        ${taste} × 2.3 ＝ ${tasteScore}点
      </div>
    </div>

    <div class="result-row">
      <div class="result-name">その他</div>
      <div class="result-calculation">
        ${other} × 3 ＝ ${otherScore}点
      </div>
    </div>

    <div class="result-row">
      <div class="result-name">国</div>
      <div class="result-calculation">
        ${country} ＝ ${countryScore}点
      </div>
    </div>

    <div class="result-row">
      <div class="result-name">収穫年</div>
      <div class="result-calculation">
        ${vintage} ＝ ${vintageScore}点
        ${
          country === "×"
            ? "<br>※国が×のため0点"
            : ""
        }
      </div>
    </div>

    <div class="result-row">
      <div class="result-name">品種</div>
      <div class="result-calculation">
        ${variety} ＝ ${varietyScore}点
      </div>
    </div>
  `;


  // -----------------------------
  // 合計点表示
  // -----------------------------

  document.getElementById("totalScore").textContent =
    `${roundedTotal}点`;


  // -----------------------------
  // 合計式
  // -----------------------------

  const calculation =
    `${appearanceScore} ＋ ` +
    `${aromaScore} ＋ ` +
    `${tasteScore} ＋ ` +
    `${otherScore} ＋ ` +
    `${countryScore} ＋ ` +
    `${vintageScore} ＋ ` +
    `${varietyScore}`;


  document.getElementById("calculationCheck").innerHTML = `
    <strong>合計：</strong><br>
    ${calculation}<br>
    ＝ ${roundedTotal}点 / 100.1点
  `;


  // -----------------------------
  // 結果を表示
  // -----------------------------

  const result =
    document.getElementById("result");

  result.classList.remove("hidden");

  result.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});
