import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/ServicesBanner.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Props {
  QueryData: any;
}

function ServicesBanner({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const Description = QueryData?.description;
  const MainImage = QueryData?.image?.sourceUrl();
  const Buttons = QueryData?.serviceBannerButton;

  const ServiceBannerImg = ({ src, width, quality }) => {
    return `${String(MainImage)}?q=${quality || 100}`;
  };

  const Width = QueryData?.image?.mediaDetails?.width;
  const height = QueryData?.image?.mediaDetails?.height;

  return (
    <section className={styles.servicesBanner}>
      <div
        className={styles.bannerWrap}
      >
        <div className="overlay_gd1"></div>

        <div className="container">
          <div className={`${styles.bannerinfoinner} d-flex two-col align-center`}>
              <div className="left-col col">
              {MainHeading ? (
              <Heading level={HeadingTag} className={styles.bannertitle}>
                {MainHeading}
              </Heading>
            ) : (
              ""
            )}
            {Description ? (
                <div
                className={styles.serviceBannerContent}
                dangerouslySetInnerHTML={{ __html: Description ?? "" }}
                />
            ) : (
                ""
            )}
            {Buttons ? (
                  <div className={styles.buttonGroup}>
                    
                        <Link href={String(Buttons.url)}>
                          <a className="commonButton commonButtonOutlined">{Buttons.title}</a>
                        </Link>
                    
                  </div>
                ) : (
                  ""
                )}
              </div>
              {Width ? (
                <div className={`${styles.imageCol}  col right-col`}>
                    <Image
                    loader={ServiceBannerImg}
                    src="loader.png"
                    alt={QueryData.image.title()}
                    layout="responsive"
                    width={Width}
                    height={height}
                    />
                </div>
                ) : (
                ""
                )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesBanner;
