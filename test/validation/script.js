console.log('js has been loaded!')

const validateButton = () => {
  const validForm = document.querySelector("form:valid");
  const submitButton = document.querySelector("#submit");
  const formValidateMessage = document.querySelector("#formValidate");
  // フォーム全体が妥当なら送信ボタンのaria-disabledをfalse、そうでない場合はtrue
  submitButton.setAttribute("aria-disabled", String(validForm === null));
  // ボタンのステータスメッセージの表示・非表示
  if (validForm !== null) {
    formValidateMessage
      .querySelector(".OKMessage")
      .setAttribute("aria-hidden", "false");
    formValidateMessage
      .querySelector(".errorMessage")
      .setAttribute("aria-hidden", "true");
  } else {
    formValidateMessage
      .querySelector(".OKMessage")
      .setAttribute("aria-hidden", "true");
    formValidateMessage
      .querySelector(".errorMessage")
      .setAttribute("aria-hidden", "false");
  }
};

const hideStatus = event => {
  const inputElement = event.target;
  const liveRegionElement = inputElement.parentNode.querySelector(
    "span[role='status']"
  );
  if (liveRegionElement == null) {
    return;
  }
  liveRegionElement.querySelectorAll(".messageBox").forEach((element) => {
    element.setAttribute("aria-hidden", "true");
  });
};

const changeAriaHidden = (event) => {
  const inputElement = event.target;
  const liveRegionElement = inputElement.parentNode.querySelector(
    "span[role='status']"
  );
  console.log(inputElement)
  if (liveRegionElement == null) {
    return;
  }
  if (inputElement.validity.valid) {
    liveRegionElement
      .querySelector(".OKMessage")
      .setAttribute("aria-hidden", "false");
  } else {
    liveRegionElement
      .querySelector(".errorMessage")
      .setAttribute("aria-hidden", "false");
  }
};


// フォームに入力されたら、各種関数を実行
document.querySelectorAll("input,textarea").forEach((element) => {
  // 入力中はステータスメッセージを非表示に
  element.addEventListener("input", hideStatus);
  // 入力内容が変更されたらメッセージを表示
  element.addEventListener("change", changeAriaHidden);
  // 入力内容が変更されたらボタンのバリデーションを実行
  element.addEventListener("change", validateButton);
});
