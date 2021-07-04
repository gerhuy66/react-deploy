import React from "react";
import {HaystackModel} from "../search/haystack.model";
import "react-string-replace"
import {Button, Col, Row} from "antd";

type Props = {
    haystack: any
};
export const DocumentItem = (props: Props) => {
    const haystack = props.haystack
    return (
        <Row className="container-item">
                <div className="answer-item">
                    file_url: <span className="answer-sub-item">{haystack.file_url}</span>
                </div>
                <div className="context-item">
                    text: <span className="text-item" >{haystack.text}</span>
                </div>
        </Row>
    )
}