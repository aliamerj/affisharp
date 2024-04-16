import { Navbar } from "@/components/globle/navbar";
import { getComapnyByUserId } from "@/lib/api_handler/get_company";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  const company = user ? await getComapnyByUserId(user.id) : null;

  // if there is a company show the dashboard
  if (user && company) return redirect("/dashboard");
  // if there is no company then show form to set up the company
  if (user && !company) return redirect("/new");

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>dashboard {company?.username}</h1>
        {user && (
          <>
            {" "}
            <p>{user.firstName}</p>
          </>
        )}
      </div>
    </>
  );
}
