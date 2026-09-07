"use client";

import { REVIEWS } from "../data/products";
import { Star, CheckCircle2 } from "lucide-react";

export default function CustomerReviews() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="section-heading">
          <div><span className="section-eyebrow">THE AURA EXPERIENCE</span><h2 id="reviews-heading">Comfort worth talking about.</h2></div>
          <p>A few words from the people who wear us.</p>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((review) => (
            <article key={review.id} className="review-card">
              <div className="stars-row" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, index) => <Star key={index} size={12} fill="currentColor" aria-hidden="true" />)}</div>
              <h3>&ldquo;{review.headline}&rdquo;</h3>
              <p>{review.comment}</p>
              <div className="review-author">{review.author}{review.verified && <span className="review-verified"><CheckCircle2 size={12} /> Verified buyer</span>}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
