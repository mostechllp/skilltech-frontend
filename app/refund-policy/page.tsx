import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy - Skill Tech',
  description: 'Refund and Return Policy for Skill Mount Electronics Trading LLC.',
};

export default function RefundPolicyPage() {
  return (
    <>
      <section className="container py-5 mt-5">
        <h1 className="mb-4">Refund Policy</h1>
        <div className="content-page">
            <h3>1. Returns</h3>
            <p>We want you to be completely satisfied with your purchase. If you are not, you may return eligible items within 14 days of receipt for a refund or exchange, subject to the conditions below.</p>

            <h3>2. Eligibility for Returns</h3>
            <p>To be eligible for a return:</p>
            <ul>
                <li>The item must be unused and in the same condition that you received it.</li>
                <li>It must be in the original packaging.</li>
                <li>You must provide a receipt or proof of purchase.</li>
            </ul>
            <p>Certain items, such as custom-made products or clearance items, may not be eligible for return.</p>

            <h3>3. Defective or Damaged Items</h3>
            <p>If you receive a defective or damaged item, please contact us immediately at info@skillmount.com with details and photos of the defect. We will arrange for a replacement or refund.</p>

            <h3>4. Refund Process</h3>
            <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within a certain amount of days.</p>

            <h3>5. Shipping Costs</h3>
            <p>You will be responsible for paying for your own shipping costs for returning your item, unless the return is due to our error (e.g., you received an incorrect or defective item). Shipping costs are non-refundable.</p>

            <h3>6. Service Cancellation</h3>
            <p>For installation services, cancellations must be made at least 24 hours in advance. Cancellations made less than 24 hours before the scheduled appointment may be subject to a cancellation fee.</p>

            <h3>7. Contact Us</h3>
            <p>If you have any questions about our Refund Policy, please contact us at info@skillmount.com.</p>
        </div>
      </section>
    </>
  );
}