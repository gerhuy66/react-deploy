import React from "react";
import {HaystackModel} from "../search/haystack.model";
import "react-string-replace"

type Props = {
    haystack: HaystackModel
};
export const HayStackItem = (props: Props) => {
    const haystack = props.haystack
    const linkCv = haystack.file_url.replace("txt", "pdf")
    const linkIm = haystack.file_url.replace("txt", "jpg")
    const context = haystack.context.replace(haystack.answer, `<span class="special-text">${haystack.answer}</span>`)
    return (
        <div className="container-item">
            <div className="image-item">
                <img src={`https://cvpreviewimage.s3.ap-southeast-1.amazonaws.com/CV_IMG/${linkIm}`} className="image-cv" alt={"CV"}/>
                <button id="downloadBtn" className={"button-cv"}>
                    <a href={`http://13.213.71.142:80/download/${linkCv}`} className={"link-cv"}>Download CV</a>
                </button>
            </div>
            <div>
                <div className={"answer-item"}>
                    Answer: <span className={"answer-sub-item"}>{haystack.answer}</span>
                </div>
                <div className={"context-item"}>
                    Context: <span className={"text-item"}>{context}</span>
                </div>
            </div>
        </div>
)}