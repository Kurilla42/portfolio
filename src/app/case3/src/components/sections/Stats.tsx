import React from 'react';

export const Stats = () => {
  return (
    <section className="bg-dark py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-8">Stats & Trust</h2>
        <div className="flex flex-wrap justify-around gap-8">
          <div><h3 className="text-4xl text-primary">4.9</h3><p>Google Rating</p></div>
          <div><h3 className="text-4xl text-primary">500+</h3><p>Reviews</p></div>
          <div><h3 className="text-4xl text-primary">98%</h3><p>Recommend</p></div>
        </div>
      </div>
    </section>
  );
};
