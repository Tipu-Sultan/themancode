import AcademicSections from "@/components/home/AcademicSections";
import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import SkillsSection from "@/components/home/SkillsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      {/* <AcademicSections /> */}
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}