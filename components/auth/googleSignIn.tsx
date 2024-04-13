import { signIn } from "@/auth";

export function GoogleSignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
