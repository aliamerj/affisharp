import { Navbar } from "@/components/globle/navbar";
import { OnboardingForm } from "@/components/onboardingForm/OnboardingForm";
import { getComapnyByUserId } from "@/lib/api_handler/get_company";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function New() {
  const user = await currentUser();
  // if the company username is passed as props then show subscription page
  // if there is a company show the dashboard

  // if there is no company then show form to set up the company
  const company = user && getComapnyByUserId(user.id);
  if (user && company) return redirect("/");

  return (
    <>
      <Navbar />
      <OnboardingForm />
    </>
  );
}
