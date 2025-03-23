"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import PageHeader from "../components/common/page-header"
import SectionHeader from "../components/common/section-header"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Card, CardContent } from "../components/ui/card"
import { useToast } from "../components/ui/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="pt-24 pb-16">
      <PageHeader 
        title="Contact Us" 
        description="We'd love to hear from you. Get in touch with us."
      />

      <div className="container mx-auto px-4">
        {/* Contact Information */}
        <section className="mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            <ContactCard 
              icon={<MapPin className="h-6 w-6 text-gold" />}
              title="Visit Us"
              details={[
                "123 Sweet Lane, Kolkata",
                "West Bengal, India 700001"
              ]}
            />
            <ContactCard 
              icon={<Phone className="h-6 w-6 text-gold" />}
              title="Call Us"
              details={[
                "+91 9876 543 210",
                "+91 9876 543 211"
              ]}
            />
            <ContactCard 
              icon={<Mail className="h-6 w-6 text-gold" />}
              title="Email Us"
              details={[
                "info@rameshsweets.co.in",
                "orders@rameshsweets.co.in"
              ]}
            />
            <ContactCard 
              icon={<Clock className="h-6 w-6 text-gold" />}
              title="Opening Hours"
              details={[
                "Mon - Sat: 9:00 AM - 9:00 PM",
                "Sunday: 10:00 AM - 6:00 PM"
              ]}
            />
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <SectionHeader 
              title="Send Us a Message" 
              description="Fill out the form below and we'll get back to you as soon as possible."
              className="mb-6"
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                />
              </div>

              <Button 
                type="submit" 
                className="bg-gold hover:bg-gold-dark text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <div>
            <SectionHeader 
              title="Our Location" 
              description="Visit our main store in Kolkata"
              className="mb-6"
            />

            <div className="rounded-lg overflow-hidden h-[400px] shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.21689846735!2d88.26494987792967!3d22.535564900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277c3c0c093d1%3A0x85bf8bc90e55caa!2sRamesh%20Sweets!5e0!3m2!1sen!2sin!4v1647863121212!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Ramesh Sweets Location"
              ></iframe>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <SectionHeader 
            title="Frequently Asked Questions" 
            description="Find answers to common questions about our products and services"
            className="text-center mb-12"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FaqItem 
              question="Do you deliver all across India?"
              answer="Yes, we deliver to most locations across India. Delivery times may vary depending on your location. For remote areas, additional delivery charges may apply."
            />
            <FaqItem 
              question="How long do your sweets stay fresh?"
              answer="Our sweets typically stay fresh for 3-15 days depending on the type. We recommend consuming them within the shelf life mentioned on the packaging for the best taste and quality."
            />
            <FaqItem 
              question="Do you offer customized gift packs?"
              answer="Yes, we offer customized gift packs for special occasions like weddings, corporate events, and festivals. Please contact us directly for customization options."
            />
            <FaqItem 
              question="Are your sweets suitable for vegetarians?"
              answer="Yes, all our sweets are 100% vegetarian. We use pure ghee and high-quality ingredients to ensure authentic taste and quality."
            />
            <FaqItem 
              question="Do you offer bulk orders for events?"
              answer="Yes, we accept bulk orders for events and provide special pricing. Please contact us at least 3-5 days in advance for bulk orders."
            />
            <FaqItem 
              question="What payment methods do you accept?"
              answer="We accept various payment methods including credit/debit cards, UPI, net banking, and cash on delivery for orders below ₹2000."
            />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-cream/30 py-12 rounded-lg text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-display font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for exclusive offers, new product announcements, and sweet inspiration.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow"
                required
              />
              <Button className="bg-gold hover:bg-gold-dark text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

function ContactCard({ icon, title, details }) {
  return (
    <Card className="border-gold/10 hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-display font-semibold mb-2">{title}</h3>
        <div className="text-muted-foreground">
          {details.map((detail, index) => (
            <p key={index}>{detail}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function FaqItem({ question, answer }) {
  return (
    <div className="border-b border-gold/10 pb-4">
      <h3 className="text-lg font-display font-semibold mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  )
}
