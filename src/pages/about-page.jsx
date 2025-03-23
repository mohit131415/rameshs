import { Link } from "react-router-dom"
import { Calendar, Award, Users, Clock } from 'lucide-react'
import PageHeader from "../components/common/page-header"
import SectionHeader from "../components/common/section-header"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <PageHeader 
        title="About Ramesh Sweets" 
        description="Crafting authentic Indian sweets with traditional recipes since 1975"
      />

      <div className="container mx-auto px-4">
        {/* Our Story Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <SectionHeader 
                title="Our Story" 
                description="A journey of passion, tradition, and sweetness"
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ramesh Sweets began as a small sweet shop in the heart of Kolkata in 1975. Founded by Mr. Ramesh Kumar, 
                  the shop quickly gained popularity for its authentic taste and premium quality sweets made from traditional recipes.
                </p>
                <p>
                  What started as a modest establishment has now grown into one of the most beloved sweet brands in India, 
                  with multiple locations across the country and an online presence that allows us to deliver our delicacies 
                  to sweet lovers nationwide.
                </p>
                <p>
                  Despite our growth, we remain committed to our founding principles: using only the finest ingredients, 
                  following time-honored recipes, and ensuring that every sweet that bears the Ramesh name is crafted with 
                  care and passion.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/about/shop-history.jpg" 
                alt="Ramesh Sweets Shop in 1975" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-gold/90 text-white px-4 py-2 rounded-lg shadow-lg">
                <span className="font-display text-lg">Est. 1975</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-16 bg-cream/30 py-12 rounded-lg">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Our Values" 
              description="The principles that guide everything we do"
              className="text-center mb-12"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ValueCard 
                icon={<Award className="h-8 w-8 text-gold" />}
                title="Quality"
                description="We use only the finest ingredients and never compromise on quality."
              />
              <ValueCard 
                icon={<Calendar className="h-8 w-8 text-gold" />}
                title="Tradition"
                description="Our recipes have been passed down through generations, preserving authentic flavors."
              />
              <ValueCard 
                icon={<Users className="h-8 w-8 text-gold" />}
                title="Community"
                description="We believe in building relationships and bringing people together through our sweets."
              />
              <ValueCard 
                icon={<Clock className="h-8 w-8 text-gold" />}
                title="Freshness"
                description="Every sweet is made fresh daily to ensure the best taste and quality."
              />
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <section className="mb-16">
          <SectionHeader 
            title="Our Process" 
            description="How we craft our delicious sweets"
            className="text-center mb-12"
          />

          <div className="grid md:grid-cols-3 gap-8">
            <ProcessStep 
              number="01"
              title="Ingredient Selection"
              description="We source the finest ingredients from trusted suppliers, ensuring premium quality in every sweet."
              image="/images/about/ingredients.jpg"
            />
            <ProcessStep 
              number="02"
              title="Traditional Preparation"
              description="Our master sweet makers follow time-honored recipes and techniques passed down through generations."
              image="/images/about/preparation.jpg"
            />
            <ProcessStep 
              number="03"
              title="Quality Control"
              description="Each sweet undergoes rigorous quality checks before being packaged and delivered to our customers."
              image="/images/about/quality-control.jpg"
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <SectionHeader 
            title="Meet Our Team" 
            description="The people behind your favorite sweets"
            className="text-center mb-12"
          />

          <div className="grid md:grid-cols-4 gap-6">
            <TeamMember 
              name="Rajesh Kumar"
              position="Founder & CEO"
              image="/images/team/founder.jpg"
            />
            <TeamMember 
              name="Priya Sharma"
              position="Head Chef"
              image="/images/team/chef.jpg"
            />
            <TeamMember 
              name="Vikram Singh"
              position="Operations Manager"
              image="/images/team/operations.jpg"
            />
            <TeamMember 
              name="Ananya Patel"
              position="Customer Relations"
              image="/images/team/customer-relations.jpg"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gold/10 py-12 rounded-lg">
          <h2 className="text-3xl font-display font-bold mb-4">Experience the Taste of Tradition</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            From our kitchen to your doorstep, we deliver the authentic taste of India's finest sweets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gold hover:bg-gold-dark text-white">
              <Link to="/products">Explore Our Products</Link>
            </Button>
            <Button asChild variant="outline" className="border-gold text-gold-dark hover:bg-gold/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

function ValueCard({ icon, title, description }) {
  return (
    <Card className="border-gold/10 hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function ProcessStep({ number, title, description, image }) {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg mb-4">
        <img 
          src={image || "/placeholder.svg"} 
          alt={title} 
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="absolute -top-4 -left-4 bg-gold text-white w-12 h-12 rounded-full flex items-center justify-center font-display text-xl font-bold">
        {number}
      </div>
      <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function TeamMember({ name, position, image }) {
  return (
    <div className="text-center">
      <div className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-gold/20">
        <img 
          src={image || "/placeholder.svg"} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-display font-semibold mb-1">{name}</h3>
      <p className="text-muted-foreground">{position}</p>
    </div>
  )
}
