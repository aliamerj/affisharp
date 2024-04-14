import { OnboardingForm } from "@/components/onboardingForm/OnboardingForm";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  // if the company username is passed as props then show subscription page
  // if there is a company show the dashboard

  // if there is no company then show form to set up the company
  const company = false; //TODO

  if (user && !company) return <OnboardingForm />;

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
