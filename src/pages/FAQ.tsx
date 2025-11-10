import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: 'How long does shipping take?',
      answer:
        'We offer three shipping options: Free Shipping (7-14 business days), Standard Shipping (3-5 business days), and Express Shipping (1-2 business days). You can select your preferred option during checkout.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy for most items. Products must be in their original condition and packaging. Please contact our support team to initiate a return.',
    },
    {
      question: 'Do you ship internationally?',
      answer:
        'Currently, we ship to most countries worldwide. Shipping times and costs vary by location. International orders may be subject to customs fees and import duties.',
    },
    {
      question: 'How can I track my order?',
      answer:
        'Once your order ships, you will receive a tracking number via email. You can also view your order status in your account under "Order History".',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, Mastercard, American Express, Discover) and PayPal. All transactions are secure and encrypted.',
    },
    {
      question: 'Can I modify or cancel my order?',
      answer:
        'Orders can be modified or canceled within 1 hour of placement. After that, the order enters our fulfillment process and cannot be changed. Please contact support immediately if you need assistance.',
    },
    {
      question: 'Are your products authentic?',
      answer:
        'Yes, we guarantee 100% authentic products. We work directly with authorized distributors and manufacturers to ensure quality and authenticity.',
    },
    {
      question: 'Do you offer warranty on products?',
      answer:
        'Most products come with manufacturer warranty. Warranty periods vary by product and manufacturer. Details are provided on individual product pages.',
    },
    {
      question: 'How do I contact customer support?',
      answer:
        'You can reach our customer support team via email at support@neonshop.com or through the contact form on our website. We typically respond within 24 hours.',
    },
    {
      question: 'Do you have a loyalty program?',
      answer:
        'Yes! Join our rewards program to earn points on every purchase. Points can be redeemed for discounts on future orders. Sign up in your account settings.',
    },
  ];

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <HelpCircle className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
              <span className="elegant-text">Frequently Asked Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our products and services
            </p>
          </div>

          <Card className="glass-strong border-border/50 p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/30">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <Card className="glass-strong border-border/50 p-8 mt-8 text-center">
            <h2 className="text-2xl font-orbitron font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Please contact our customer support team.
            </p>
            <a
              href="mailto:support@neonshop.com"
              className="text-primary font-semibold hover:underline"
            >
              support@neonshop.com
            </a>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

export default FAQ;
