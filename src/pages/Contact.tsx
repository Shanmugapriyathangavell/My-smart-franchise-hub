import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  ArrowRight
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Demo-only submission simulation
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent",
      description:
        "Thanks for reaching out! This is a demo form — responses are not sent."
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: ""
    });

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email us",
      value: "hello@smartfranchisehub.dev",
      description: "Demo inbox — UI only"
    },
    {
      icon: Phone,
      title: "Call us",
      value: "+91 90000 00000",
      description: "Mon–Fri · Chennai time"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Chennai, India",
      description: "Built with local context"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about the project? This demo page shows how a real
            contact flow would work in production.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="pb-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => (
              <GlassCard key={index} className="text-center p-6">
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{info.title}</h3>
                <p className="text-primary font-medium mb-1">{info.value}</p>
                <p className="text-sm text-muted-foreground">
                  {info.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Send a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your needs…"
                  rows={5}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-primary text-primary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending…" : (
                  <>
                    Send message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                This form is UI‑only. Backend integration can be added later.
              </p>
            </form>
          </GlassCard>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-12 px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Clock className="w-5 h-5" />
          <span>Average response time: under 24 hours</span>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <GlassCard className="text-center p-12 bg-gradient-secondary">
            <h2 className="text-3xl font-bold mb-4">
              Prefer to explore the demo?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Navigate through the dashboard to see how Smart Franchise Hub
              handles projects, franchises, and reports.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground">
                View Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
