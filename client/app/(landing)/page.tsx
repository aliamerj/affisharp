import { Navbar } from "@/components/globle/navbar";

export default async function Home() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>landing</h1>
      </div>
    </>
  );
}
