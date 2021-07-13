import React from "react";
import {HaystackModel} from "../search/haystack.model";
import "react-string-replace"
import {Button, Col, Row} from "antd";

type Props = {
    haystack: any;
};
export const DocumentItem = (props: Props) => {
    const haystack = props.haystack
    const linkIm = haystack.file_url.replace("txt", "jpg").replace(" (1)", "")
    const linkCv = haystack.file_url.replace("txt", "pdf").replace(" (1)", "")
    console.log(haystack.text)
    const context = haystack.text.replace('\n', '<br />').replace('/n', '<br />')
    console.log(context)
    return (
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

            <Col span={18} offset={1}>
                <div className="answer-item">
                    file_url: <span className="answer-sub-item">{linkCv}</span>
                </div>
                <div className="context-item">
                    {/* text: <span className="text-item">{haystack.text}</span> */}
                    text: <span className="text-item" dangerouslySetInnerHTML={{__html: context}}/>
                </div>
            </Col>
        </Row>
    )
}