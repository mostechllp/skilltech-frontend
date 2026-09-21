import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - Skill Tech',
  description: 'Terms and conditions for using Skill Mount Electronics Trading LLC website and services.',
};

export default function TermsConditionsPage() {
  return (
    <>
      <section className="container py-5 mt-5">
        <h1 className="mb-4">Terms and Conditions</h1>
        <div className="content-page">
            <h3>1. Introduction</h3>
            <p>Welcome to Skill Mount Electronics Trading LLC. These Terms and Conditions govern your use of our website and the purchase of our products and services. By accessing or using our website, you agree to be bound by these terms.</p>

            <h3>2. Intellectual Property</h3>
            <p>All content on this website, including text, graphics, logos, images, and software, is the property of Skill Mount Electronics Trading LLC and is protected by copyright and other intellectual property laws.</p>

            <h3>3. Products and Services</h3>
            <p>We strive to display our products and services as accurately as possible. However, we do not warrant that product descriptions, images, or other content are error-free, complete, or current. We reserve the right to modify or discontinue any product or service at any time without notice.</p>

            <h3>4. Pricing and Payment</h3>
            <p>Prices for our products and services are subject to change without notice. We reserve the right to refuse or cancel any order placed for a product listed at an incorrect price. Payment must be made in full at the time of purchase unless otherwise agreed.</p>

            <h3>5. Shipping and Delivery</h3>
            <p>We will make reasonable efforts to deliver products within the estimated timeframes. However, we are not responsible for delays caused by external factors. Risk of loss and title for items purchased pass to you upon delivery to the carrier.</p>

            <h3>6. Installation Services</h3>
            <p>For installation services, you agree to provide a safe and suitable environment for our technicians. We reserve the right to refuse service if conditions are deemed unsafe or unsuitable.</p>

            <h3>7. Limitation of Liability</h3>
            <p>Skill Mount Electronics Trading LLC shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or products.</p>

            <h3>8. Governing Law</h3>
            <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of the United Arab Emirates.</p>

            <h3>9. Changes to Terms</h3>
            <p>We reserve the right to update or modify these Terms and Conditions at any time. Your continued use of the website following any changes constitutes your acceptance of the new terms.</p>

            <h3>10. Contact Us</h3>
            <p>If you have any questions about these Terms and Conditions, please contact us at info@skillmount.com.</p>
        </div>
      </section>
    </>
  );
}