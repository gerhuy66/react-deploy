import React from "react";
import {HaystackModel} from "../search/haystack.model";
import "react-string-replace"

type Props = {
    haystack: HaystackModel
};
export const HayStackItem = (props: Props) => {
    const haystack = props.haystack
    const link = haystack.file_url.replace("txt","pdf")
    const context = haystack.context.replace(haystack.answer, `<span class="special-text">${haystack.answer}</span>`)
    return <div className="container-item">
        <div className={"sub-item"}>
            <div style={{}}>Answer: <span className="text-answer">{haystack.answer}</span></div>
            <div className="parent-context">
                <div style={{}}>Context:<span className="text-context" dangerouslySetInnerHTML={{ __html: context}}/></div>
            </div>
            <div>
                Link pdf: <a href={`http://13.213.71.142:80/download/${link}`} target="_blank">{link}</a>
            </div>
        </div>
    </div>

}