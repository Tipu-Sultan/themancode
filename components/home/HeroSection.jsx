"use client";

import { motion, useAnimation } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, FileText } from "lucide-react"; // Added FileText for resume icon
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const splitTextVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stickerVariants = {
  initial: { opacity: 0, rotate: -10, scale: 0.8 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  transition: { duration: 0.5, type: "spring", bounce: 0.4 },
};

const nameVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
};

const resumeCardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut", delay: 0.5 },
  whileHover: { scale: 1.02, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" },
};

export default function HeroSection() {
  const controls = useAnimation();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = ["Next.js", "Mern.js", "Web Developer", "Full-stack Developer"];

  const socials = [
    {
      icon: Github,
      href: "https://github.com/Tipu-Sultan?tab=repositories",
      label: "GitHub",
      followers: "1.2k",
      color: "text-purple-500",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/tipu-sultan-47b4221b4/",
      label: "LinkedIn",
      followers: "850",
      color: "text-blue-500",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/pathan__sultan/",
      label: "Instagram",
      followers: "774",
      color: "text-cyan-500",
    },
    {
      icon: Mail,
      href: "mailto:teepukhan729@gmail.com",
      label: "Email",
      followers: null,
      color: "text-green-500",
    },
  ];

  const stickers = [
    {
      text: "Software Developer",
      color:
        "bg-blue-500/20 text-blue-600 dark:bg-blue-400/30 dark:text-blue-300",
      position: "-top-6 -left-6",
      rotate: "-12deg",
    },
    // { text: 'Tech Enthusiast', color: 'bg-purple-500/20 text-purple-600 dark:bg-purple-400/30 dark:text-purple-300', position: 'top-20 -right-4', rotate: '8deg' },
  ];

  useEffect(() => {
    const animateText = async () => {
      await controls?.start((i) => ({
        opacity: i === currentRoleIndex ? 1 : 0,
        y: i === currentRoleIndex ? 0 : 20,
        transition: { duration: 0.5, ease: "easeOut" },
      }));

      const timeout = setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }, 2000);

      return () => clearTimeout(timeout);
    };

    animateText();

    return () => {};
  }, [controls, currentRoleIndex, roles.length]);

  return (
    <section className="relative py-12 md:py-20 lg:py-28 bg-background overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 dark:from-purple-400/30 dark:to-blue-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-pink-500/20 to-yellow-500/20 dark:from-pink-400/30 dark:to-yellow-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="space-y-4 lg:space-y-6 text-center md:text-left relative"
          >
            {/* Stickers */}
            {stickers.map((sticker, index) => (
              <motion.div
                key={sticker.text}
                variants={stickerVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 * (index + 1) }}
                className={`absolute ${sticker.position} ${sticker.color} px-3 py-1 rounded-full text-sm font-semibold shadow-md`}
                style={{ transform: `rotate(${sticker.rotate})` }}
              >
                {sticker.text}
              </motion.div>
            ))}

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
            >
              Hey, I'm{" "}
              <motion.span
                variants={nameVariants}
                initial="initial"
                animate="animate"
                className="relative inline-block"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 px-3 py-1 rounded-lg shadow-lg font-extrabold italic">
                  Tipu Sultan
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-blue-500 dark:from-pink-400 dark:to-blue-400 rounded-full opacity-50 animate-pulse" />
              </motion.span>
            </motion.h1>

            {/* Roles Display */}
            <div className="relative h-8 sm:h-10 md:h-12 overflow-hidden">
              {roles.map((role, index) => (
                <motion.p
                  key={role}
                  custom={index}
                  animate={controls}
                  className="absolute text-lg sm:text-xl md:text-2xl font-medium w-full"
                >
                  {role.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={splitTextVariants}
                      initial="initial"
                      animate="animate"
                      className={`inline-block ${
                        index === 0
                          ? "text-blue-500 dark:text-blue-400"
                          : index === 1
                          ? "text-green-500 dark:text-green-400"
                          : "text-purple-500 dark:text-purple-400"
                      }`}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.p>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground dark:text-muted-foreground max-w-md mx-auto md:mx-0"
            >
              Building{" "}
              <span className="text-yellow-500 dark:text-yellow-400">
                modern
              </span>{" "}
              and{" "}
              <span className="text-pink-500 dark:text-pink-400">scalable</span>{" "}
              solutions
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 dark:from-blue-400 dark:to-purple-400 dark:hover:from-blue-500 dark:hover:to-purple-500 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link
                  href="/projects"
                  className="flex items-center text-base sm:text-lg"
                >
                  Explore Projects
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-200">
                    →
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-6 text-base sm:text-lg border-pink-500 dark:border-pink-400 text-pink-500 dark:text-pink-400 hover:bg-pink-500/10 dark:hover:bg-pink-400/10 transition-all duration-300"
              >
                <Link href="/contact">Let's Connect</Link>
              </Button>
            </motion.div>

            {/* Resume Preview */}
            <motion.div
              variants={resumeCardVariants}
              initial="initial"
              animate="animate"
              whileHover="whileHover"
              className="mt-6 max-w-sm mx-auto md:mx-0 bg-card border border-muted/30 dark:border-muted-foreground/20 rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Link href="/resume" className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    My Resume
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                    Check out my skills and experience
                  </p>
                </div>
                <span className="text-primary text-sm font-medium hover:underline">
                  View →
                </span>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex flex-wrap justify-center md:justify-start gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 p-2 rounded-lg bg-muted/20 dark:bg-muted-foreground/10 hover:bg-${
                    social.color.split("-")[1]
                  }-100/20 border border-muted/30 dark:border-muted-foreground/20 hover:border-${
                    social.color.split("-")[1]
                  }-400/40 transition-all duration-300 shadow-sm hover:shadow-md`}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon
                    className={`w-5 h-5 ${
                      social.color
                    } dark:${social.color.replace(
                      "500",
                      "400"
                    )} group-hover:${social.color.replace(
                      "500",
                      "600"
                    )} dark:group-hover:${social.color.replace("500", "500")}`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      social.color
                    } dark:${social.color.replace(
                      "500",
                      "400"
                    )} group-hover:${social.color.replace(
                      "500",
                      "600"
                    )} dark:group-hover:${social.color.replace("500", "500")}`}
                  >
                    {social.label}
                  </span>
                  {social.followers && (
                    <span
                      className={`text-xs ${
                        social.color
                      } dark:${social.color.replace("500", "400")} bg-${
                        social.color.split("-")[1]
                      }-100/20 dark:bg-${
                        social.color.split("-")[1]
                      }-400/20 px-1.5 py-0.5 rounded-full`}
                    >
                      {social.followers}
                    </span>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto"
          >
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-pink-500/20 to-purple-500/20 dark:from-yellow-400/30 dark:via-pink-400/30 dark:to-purple-400/30 rounded-full animate-pulse opacity-50" />
              <Image
                src="/assets/myself.jpg"
                alt="Profile"
                fill
                className="rounded-full object-cover border-4 border-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-400/30 shadow-xl hover:shadow-2xl transition-all duration-300 z-10"
              />
              <motion.div
                variants={stickerVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.3 }}
                className="absolute -bottom-2 -right-2 bg-yellow-500/20 dark:bg-yellow-400/30 text-yellow-600 dark:text-yellow-300 px-3 py-1 rounded-lg shadow-md rotate-[8deg] z-20"
              >
                <span className="text-xs font-semibold">Available!</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
