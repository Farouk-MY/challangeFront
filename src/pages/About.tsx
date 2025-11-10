import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Zap, Target, Users, Award } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, value: "10K+", label: "Happy Customers" },
    { icon: Award, value: "500+", label: "Products" },
    { icon: Target, value: "99.9%", label: "Satisfaction Rate" },
    { icon: Zap, value: "24/7", label: "Support" },
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Marcus Lee",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      name: "Emma Davis",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-animated opacity-10" />
        <div className="scan-line" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 shadow-glow"
            >
              <Zap className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6">
              <span className="elegant-text">
                About NeonShop
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to bring the future to your doorstep. NeonShop curates the most innovative,
              cutting-edge technology products from around the globe, delivering tomorrow's tech today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 glass-strong">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center glass p-6 rounded-2xl hover:scale-105 transition-transform elegant-border"
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-orbitron font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
                <span className="elegant-text">
                  Our Story
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2020, NeonShop emerged from a simple vision: to make cutting-edge technology
                accessible to everyone. What started as a small online store has grown into a global
                community of tech enthusiasts and early adopters.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We partner directly with innovative brands and manufacturers worldwide, ensuring our
                customers always have access to the latest and greatest in tech. From VR headsets to
                smart home devices, we're your gateway to the future.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-strong rounded-3xl overflow-hidden elegant-border">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
                  alt="Technology"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full blur-3xl opacity-30" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 glass">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
              <span className="elegant-text">
                Meet Our Team
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The innovators behind your favorite tech destination
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-strong rounded-2xl overflow-hidden elegant-border group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-orbitron font-bold mb-2 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
              <span className="elegant-text">
                Our Values
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation First",
                description: "We constantly seek out the most innovative products and technologies to offer our customers.",
              },
              {
                title: "Quality Guarantee",
                description: "Every product is carefully selected and tested to meet our high standards of excellence.",
              },
              {
                title: "Customer Focus",
                description: "Your satisfaction is our priority. We're here to support you every step of the way.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-strong p-8 rounded-2xl elegant-border hover:scale-105 transition-transform"
              >
                <h3 className="text-2xl font-orbitron font-bold mb-4 text-primary">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
