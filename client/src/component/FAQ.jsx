import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleFaqClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      title: 'How to cancel?',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat tenetur in cupiditate magni?',
    },
    {
      title: 'Is there any vacancy?',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat tenetur in cupiditate magni?',
    },
    {
      title: 'What are payment methods?',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat tenetur in cupiditate magni?',
    },
    {
      title: 'Will we pass the 3rd year?',
      content:
        'If you or someone you know is concerned about passing the third year, it might be helpful to remember that everyones academic journey is unique, and challenges can be overcome with the right approach and support',
    },
    {
      title: 'When is the right time to start?',
      content:
        'Ultimately, the right time to start varies from person to person and depends on the specific context of the question. It often involves a balance between preparedness, motivation, and a willingness to take action despite uncertainties.',
    },
    // ... add more FAQ items as needed
  ];

  return (
    <section className="contact" id="contact">
      <div className="row">

        <div className="faq">
          <h3 className="title">Frequently Asked Questions</h3>
          {faqItems.map((faq, index) => (
            <div
              key={index}
              className={`box ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleFaqClick(index)}
            >
              <h3>{faq.title}</h3>
              <p>{faq.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
