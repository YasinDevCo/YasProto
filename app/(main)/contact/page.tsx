"'use client'"
import { SectionHeader } from "@/components/ui/section-header"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="تماس با من" subtitle="برای همکاری یا سوالات با من در ارتباط باشید" />

        <div className="grid gap-12 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
