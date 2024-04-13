import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>HOMEY</h1>
      {user && (
        <>
          {" "}
          <p>{user.firstName}</p>
        </>
      )}
    </main>
  );
}
