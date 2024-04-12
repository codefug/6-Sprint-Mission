// input안에 있는거 버튼 이미지 path 바꾸는 eventHandler
export function togglePasswordVision() {
  const visionButtons = document.querySelectorAll(".content-form__icon");
  const imageUrl = (bool) =>
    `image/signin-page/btn_visibility_${bool}_24px.png`;

  visionButtons.forEach((visionButton) => {
    visionButton.addEventListener("click", (event) => {
      visionButton.parentElement.firstElementChild.type === "text"
        ? (() => {
            visionButton.src = imageUrl("on");
            visionButton.parentElement.firstElementChild.type = "password";
          })()
        : (() => {
            visionButton.src = imageUrl("off");
            visionButton.parentElement.firstElementChild.type = "text";
          })();
    });
  });
}

// url을 전부 입력하는 방식 > imageUrl 함수
// 클로저를 이용해 visionButton 이벤트 핸들러 내에서 on off로 간단하게 활용할 수 있게 하였습니다.
//
// 부모노드에서 첫번째 노드로 접근해서 setAttribute (x)
// 이부분도 할 때 애매하긴 했는데 invalid시에 p태그가 input태그 
// 아래로 들어갔다 나갔다를 해서 형제노드로는 접근을 못하고 
// 부모에서 자식으로 가는 식으로 구현하는 것 밖에 생각이 안나네요..