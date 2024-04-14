nav bar 같은 경우 ui로 쓰고 li에 요소들을 담아내는 식이 좋다.

"DomContentLoaded" event 이후에 js가 실행되는 것이 좋다. (이후 querySelector에서 받아온 애들이 null이 아닌지 검사해준다.)

이벤트를 제거하게 될 수도 있기 때문에 addEventListener에 콜백 함수의 변수명을 넣는 것이 좋다.

validate를 통과하지 못했을 때 isValid, errorMesage 등의 관련 이름의 프로퍼티를 객체에 넣어서 에러라는 걸 리턴(유효성 검사만 담당하는 함수)

이후 유효성에 대해서 처리하는 함수 이런식으로 분리할 수 있다.

class CustomError extends Error{ } 를 이용해서 커스텀 에러를 활용해도 된다.

상태를 갖고 있는 경우 하나만 묻히면 된다.

변수명의 경우 handle은 이벤트에 담는 함수명, 이런거처럼 정해진 규칙이 있다.

순수한 함수 : 전제가 존재하면 안된다. document.querySelector가 필요한 조건이 이벤트 핸들러에 있어선 안된다.

co-location 비슷한 코드는 같이 있는 것이 좋다. ex) (errorMessage에 담을 메시지를 따로 객체에 담아서 { EMAIL:{ TOO_SHORT:"" , EMPTY:" "} } 형식으로 한다.)

eventDelegation을 이용해서 input들을 한번에 관리할 수 있다.

$를 앞에 붙혀서 함수의 arg가 element인가를 확인

every같이 큰 메소드들 한 변수로 합치기