"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "@/hooks/use-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    subject: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      if (!executeRecaptcha) {
        toast({
          title: "Error",
          description: "reCAPTCHA not available. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      try {
        const recaptchaToken = await executeRecaptcha("contact_form");
        const response = await fetch("/api/client/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, recaptchaToken }),
        });

        if (!response.ok) throw new Error("Failed to send email");

        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
          variant: "default",
        });
        setFormData({ name: "", mobile: "",subject: "", email: "", message: "" });
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Failed to send your message. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [executeRecaptcha, formData]
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex items-center gap-4 p-6 bg-card rounded-lg border">
            <Mail className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <a href={'mailto:themancode7@gmail.com'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground">themancode7@gmail.com</a>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-card rounded-lg border">
            <Phone className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <a href={'mailto:themancode7@gmail.com'}  className="text-muted-foreground">+91 (991) 940-8817</a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Mobile
              </label>
              <Input
                id="mobile"
                type="mobile"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
