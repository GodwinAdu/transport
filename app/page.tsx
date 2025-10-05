import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { createAdmin } from "@/lib/actions/admin.actions";

export default async  function Home() {
  const username = "western"
  const password = "Western12345"
  // await createAdmin(username,password)
  return (
    <main className="h-screen overflow-hidden">

    <HeroSection />
  </main>
  );
}
