import React from "react";
import {HaystackModel} from "../search/haystack.model";
import "react-string-replace"
import {Button, Col, Row} from "antd";
import ReactLoading from 'react-loading';

type Props = {
    haystack: HaystackModel
};
export const HayStackItem = (props: Props) => {
    const haystack = props.haystack
    const linkIm = haystack.file_url.replace("txt", "jpg").replace(" (1)", "").replace(" (2)", "").replace(" (3)", "").replace(" (4)", "").replace(" (5)", "")
    const linkCv = haystack.file_url.replace("txt", "pdf").replace(" (1)", "").replace(" (2)", "").replace(" (3)", "").replace(" (4)", "").replace(" (5)", "")
    const context = haystack.context.replace(haystack.answer, `<span class="special-text">${haystack.answer}</span>`)
    return (
    <>
        <Row className="container-item">
            <Col className="image-item" span={5}>
                <Row>
                    <Col span={16} offset={4}>

                        <img src={`http://54.169.14.103:5000/getImage/${linkIm}`}
                             className="image-cv" alt={"CV"}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={8}>
                        <Button type="primary">
                            <a href={`http://54.169.14.103:5000/download/${linkCv}`} className="link-cv">Download CV</a>
                        </Button>
                    </Col>
                </Row>
            </Col>
            <Col className="text-item" span={18} offset={1}>
                <div className="answer-item">
                    <span className="answer-sub-item">{linkCv}</span>
                </div><br></br>
                <div className="context-item">
                    ...<span className="text-item" dangerouslySetInnerHTML={{__html: context}}/>...
                </div>
            </Col>
        </Row>
    </>
    )
}
