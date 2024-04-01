import { Questions } from "./common";
import FAQAccordian from "./accordian";

import "./style.scss";
import { useState } from "react";

const Faq = () => {
  const faqItems = [...Questions];
  const [activeElement, setActiveElement] = useState("");

  return (
    <>
      <section className={"faq-section"}>
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col"}>
              <div className={"faq-content-section"}>
                <h4 className={"faq-heading"}>FAQs</h4>
                <div className={"faq-accordian-section"}>
                  {faqItems.map((questions, index) => {
                    return (
                      <FAQAccordian
                        key={questions.id}
                        elementIndex={index}
                        isActive={activeElement === index}
                        setActiveElement={setActiveElement}
                        {...questions}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
