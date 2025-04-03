import AcademicSections from "@/components/home/AcademicSections";
import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectsServer from "@/components/home/ProjectServer";
import SkillsSection from "@/components/home/SkillsSection";

export default function Home() {
  console.log("NEXTAUTH_SECRET",process.env.NEXT_PUBLIC_NEXTAUTH_SECRET)
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProjectsServer />
      <SkillsSection />
      {/* <AcademicSections /> */}
      <ContactSection />
    </main>
  );
}