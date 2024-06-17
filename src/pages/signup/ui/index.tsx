import { postSignUp } from "@/shared/api/api";

export function SignupPage() {
  return (
    <div>
      회원가입에 온걸 환영해
      <button
        onClick={() =>
          (async () => {
            const data = await postSignUp({
              email: "codeit98@naver.com",
              nickname: "lsh",
              password: "q1w2e3r4",
              passwordConfirmation: "q1w2e3r4",
            });
            console.log(data);
          })()
        }
      >
        회원가입
      </button>
    </div>
  );
}
