import React from "react";
import {HaystackModel} from "../search/haystack.model";
import "react-string-replace"
import {Button, Col, Row} from "antd";

type Props = {
    haystack: HaystackModel
};
export const HayStackItem = (props: Props) => {
    const haystack = props.haystack
    const linkCv = haystack.file_url.replace("txt", "pdf")
    const linkIm = haystack.file_url.replace("txt", "jpg")
    const context = haystack.context.replace(haystack.answer, `<span class="special-text">${haystack.answer}</span>`)
    return (
        <Row className="container-item">
            <Col className="image-item" span={5}>
                <Row>
                    <img src={`https://cvpreviewimage.s3.ap-southeast-1.amazonaws.com/CV_IMG/${linkIm}`}
                         className="image-cv" alt={"CV"}/>
                </Row>
                <Row>

                    <Button type="primary">
                        <a href={`http://54.169.14.103:5000/download/${linkCv}`} className="link-cv">Download CV</a>
                    </Button>
                </Row>
            </Col>
            <Col className="text-item" span={19}>
                <div className="answer-item">
                    Answer: <span className="answer-sub-item">{haystack.answer}</span>
                </div>
                <div className="context-item">
                    Context: <span className="text-item" dangerouslySetInnerHTML={{__html: context}}/>
                </div>
            </Col>
        </Row>
    )
}