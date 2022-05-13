import Heading from "components/Heading";
import React, { useRef, useState } from "react";
import styles from "scss/components/FlexibleComponentStyles/CareersSection.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Props {
  QueryData: any;
}

function CareersSection({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const description = QueryData?.description;
  const positions = QueryData?.positionsList;

  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const content = useRef(null);
  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }
  return (
    <>
      <section className="careers_section commonPadding">
        <div className="container">
          {positions ? (
            <div className={`${styles.positionslist} d-flex justify-space`}>
              {positions.map((item, index) => {
                const positionTitle = item?.positionTitle;
                const positionContent = item?.positionDescription;
                return (
                  <div className={`${styles.positionbox}`} key={index}>
                    <div className={`${styles.positionHeader} ${setActive}`} onClick={toggleAccordion}>
                      <>
                        <Heading level="h4" className={`${styles.h4}`}>
                          {positionTitle}
                        </Heading>

                        <p
                          dangerouslySetInnerHTML={{
                            __html: "Click here for more information",
                          }}
                        />
                        <Link href="#"><a href="#" className="commonButton commonButtonSecondary">Apply Now <i className="fa fa-long-arrow-alt-right"></i></a></Link>
                      </>
                    </div>
                    <div className={styles.positionBody} style={{ maxHeight: `${setHeight}` }} ref={content}>
                        <div className={styles.positionContent}
                          dangerouslySetInnerHTML={{
                            __html: positionContent ?? "",
                          }}
                        />    
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
}

export default CareersSection;
