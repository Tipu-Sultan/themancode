'use client';
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

// Separate component to handle route checking
export default function FooterWithRouteCheck() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
  
    return !isAdmin ? <Footer/> : null;
  }