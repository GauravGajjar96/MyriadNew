import Heading from "components/Heading";
import React, { useRef, useState } from "react";
import styles from "scss/components/FlexibleComponentStyles/CareersSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import Cf7FormWrapper from "./cf7-form-wrapper";

interface Props {
  QueryData: any;
}

interface Form{ 
  handler: any; 
  isLoading: Boolean;
  isSent:Boolean;
  hasError: any;
}
interface handleFileInput{
  onFileSelectError : any;
  onFileSelectSuccess :any;
}


const Form = function Form({ handler, isLoading, isSent, hasError }) {
  const [formState, setFormState] = useState({})
  const [selectedFile, setSelectedFile] = useState(null);
  

  const handleFieldChange = (field, e) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    })
  }

  const handleFileChange = (field, e) => {
    setFormState({
      ...formState,
      [field]: e.target.files[0],
    })
  }
  const handleFormSubmit = (e) => {
    handler(e, formState)
  }


  return (
    <form onSubmit={handleFormSubmit}>
      

      <div className="form-fields row d-flex careers-form">
      <div className="form-field col">
        <div className="form-field-wrap">
          <input onChange={(e) => handleFieldChange("your-name", e)} type="text" placeholder="Name" className="outline-style"/>
        </div>
      </div>
      <div className="form-field col col-6 pr-1">
        <div className="form-field-wrap">
          <input onChange={(e) => handleFieldChange("your-email", e)} type="text" placeholder="Email" className="outline-style"/>
        </div>
      </div>
      <div className="form-field col col-6 pl-1">
        <div className="form-field-wrap">
          <input onChange={(e) => handleFieldChange("phone", e)} type="tel" placeholder="Phone" className="outline-style"/>
        </div>
      </div>
      <div className="form-field col">
        <div className="form-field-wrap">
          <select onChange={(e) => handleFieldChange("select-position", e)} placeholder="Subject" className="outline-style">
            <option value="Mobile App Developer (Flutter)">Mobile App Developer (Flutter)</option>
            <option value="Php Developer">Php Developer</option>
            <option value="Jr. SEO Executive">Jr. SEO Executive</option>
            <option value="Business Development Executive">Business Development Executive</option>
          </select>
        </div>
      </div>
      {/* <div className="form-field col">
        <div className="form-field-wrap file-input">
          <input type="file" onChange={(e) => handleFieldChange("file-input", e)} className="wpcf7-form-control wpcf7-file outline-style" accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.pptx,.odt,.avi,.ogg,.m4a,.mov,.mp3,.mp4,.mpg,.wav,.wmv" aria-invalid="false"></input>
        </div>
      </div> */}
      {/* <FileUploaded
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        /> */}
        <div className="form-field col">
        <div className="form-field-wrap file-input">
      <input name="file" type="file" onChange={(e)=> handleFileChange('fileinput',e)} className="wpcf7-form-control wpcf7-file outline-style" accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.pptx,.odt,.avi,.ogg,.m4a,.mov,.mp3,.mp4,.mpg,.wav,.wmv" aria-invalid="false"/>
      </div></div>
      <div className="form-field col">
        <div className="form-field-wrap">
          <textarea onChange={(e) => handleFieldChange("your-message", e)} placeholder="Comment" className="outline-style" rows={5}/>
        </div>
      </div>
      <div className="form-field col">
        <div className="form-field-wrap mb-0 h-100">
          <button type="submit" className="commonButton commonButtonOutlined form-submit-button">Apply Now</button>
          {/* <input type="submit" value="Send" /> */}
        </div>
      </div>          
      </div>
      <div className="form-status">
      {isLoading ? ( <div>{isLoading ? "Loading" : "false"}</div>): ""}
      {isSent ? ( <div className="success form-status-info">{isSent ? "Sent" : "false"}</div>):""}
      {hasError ? (<div className="alert form-status-info">{hasError || "null"}</div>) :""}
      </div>
    </form>
  )
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
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

  const [modal,showModal]=useState(false);
  function toggleModal(e){
    e.preventDefault();
    showModal(!modal);
    document.body.classList.add('modal-open');
  }
  function closeModal(e){
    e.preventDefault();
    showModal(!modal);
    document.body.classList.remove('modal-open');
  }


  return (
    <>
      <section className="careers_section commonPadding">
        <div className="container">
          {positions ? (
            <Accordion className={`${styles.positionslist} d-flex justify-space`} >
              {positions.map((item, index) => {
                const positionTitle = item?.positionTitle;
                const positionContent = item?.positionDescription;
                return (
                    <AccordionItem key={item.uuid} className={`${styles.positionbox}`}>
                        <AccordionItemHeading className={styles.positionHeader}>
                            <AccordionItemButton>
                              <>
                              <Heading level="h4" className={`${styles.h4}`}>
                                {positionTitle}
                              </Heading>

                              <p
                                dangerouslySetInnerHTML={{
                                  __html: "Click here for more information",
                                }}
                              />
                              <Link href="#" ><a className="commonButton commonButtonSecondary" onClick={(e)=>toggleModal(e)}>Apply Now <i className="fa fa-long-arrow-alt-right"></i></a></Link>
                              </>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className={styles.positionBody}>
                          <div className={styles.positionContent}
                            dangerouslySetInnerHTML={{
                              __html: positionContent ?? "",
                            }}
                          />  
                        </AccordionItemPanel>
                    </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            ""
          )}
        </div>
      </section>

      {modal ? (
        <div className={`modal fade ${modal?"show":""}`} style={{display: `${modal?"block":"none"}`}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close custom-close" data-dismiss="modal" onClick={(e) => closeModal(e)}><i className="fas fa-times"></i></button>
                <Image
                        
                          src="https://myriadsolutionz.com/wp-content/themes/Myriad-New/images/seo-banner-1.jpg"
                          alt="popup_img"
                          layout="responsive"
                          width={500}
                          height={201}
                        />
              </div>
              <div className="modal-body">
                <h3 className="mb-4">Apply Now</h3>
            
                <Cf7FormWrapper url="https://codywebz.com/myriadsolutionz/wp-json/contact-form-7/v1/contact-forms/459/feedback">
                    <Form handler={undefined} isLoading={false} isSent={false} hasError={false} />
                  </Cf7FormWrapper>
              </div>
            </div> 
          </div>
        </div>
      ) : ""}
    </>
  );
}

export default CareersSection;


