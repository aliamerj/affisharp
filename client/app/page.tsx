import { getComapnyByUserId } from "@/lib/api_handler/get_company";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  // if the company username is passed as props then show subscription page
  // if there is a company show the dashboard

  // if there is no company then show form to set up the company

  const company = user ? await getComapnyByUserId(user.id) : null;

  if (user && !company) return redirect("/new");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>dashboard {company?.name}</h1>
      {user && (
        <>
          {" "}
          <p>{user.firstName}</p>
        </>
      )}
    </main>
  );
}
