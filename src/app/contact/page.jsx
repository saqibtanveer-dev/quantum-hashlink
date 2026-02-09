import Contact from '@/components/contact'
import React from 'react'

export const metadata = {
  title: 'Contact Us | Quantum HashLink',
  description: 'Get in touch with Quantum HashLink for your next project. We offer free consultations and are ready to turn your vision into reality.',
  keywords: ['contact quantum hashlink', 'tech consultation', 'software inquiry', 'get quote'],
  openGraph: {
    title: 'Contact Us | Quantum HashLink',
    description: 'Get in touch with Quantum HashLink for your next project.',
    url: 'https://quantum-hashlink.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Quantum HashLink',
    description: 'Get in touch with Quantum HashLink for your next project.',
  },
};

function page() {
  return (
    <section className='py-8 md:py-10 lg:py-14'>
        <Contact />
    </section>
  )
}

export default page