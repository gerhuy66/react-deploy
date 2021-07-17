import React, {useState} from "react";
import {AgGridReact} from "ag-grid-react";
import axios from "axios";
import {Button, Col, Form, Input, InputNumber, Radio, Row, Table, Tag} from "antd";
import {AgAbstractField} from "ag-grid-community";
import {
    DownloadOutlined
} from '@ant-design/icons';
import {HaystackModel} from "./haystack.model";
import {HayStackItem} from "../custom/hay-stack-item";
import {DocumentItem} from "../custom/documents-item";
import {SnippetsTwoTone} from "@ant-design/icons";

type Props = {
    setActiveMenu: (key: string) => void;
}
export const SearchDocument = (props: Props) => {
    props.setActiveMenu('document')
    const [dataResponse, setDataResponse] = useState<any[]>([])
    const [totalCount, setTotalCount] = useState<number>(0)
    const [timeOut, setTimeOut] = useState<number>(0)

    const onFinish = async (values: any) => {
        const sendDate = (new Date()).getTime();

        const formValues = {
            'haystackData': values?.user.haystackData,
        }
        axios.post('http://54.169.14.103:5000/searchText', formValues)
            .then((res: any) => {
                setTotalCount(res.data.result.length)
                setDataResponse(res.data.result)
                const receiveDate = (new Date()).getTime();
                setTimeOut(receiveDate - sendDate)
            })
    }
    return <>
        <Row className="document-search">
            <Col span={12} offset={6} className="fieldset">
                <h1> <SnippetsTwoTone/>Tìm Kiếm CV</h1>
                <Col span={18} offset={3} className="fieldset-box">
                    <Form name="nest-messages" onFinish={onFinish}>
                        <Row>
                            <Col span={20} offset={2}>
                                <Form.Item name={['user', 'haystackData']} label="Tìm kiếm">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                tìm kiếm
                            </Button>
                        </Form.Item>
                        <h4>Total: {totalCount} tài liệu</h4>
                        <h4>Thời gian tìm kiếm: {timeOut/1000} giây</h4>

                    </Form>
                </Col>
            </Col>
        </Row>
        <Row>
            <Col span={18} offset={3}>
                {dataResponse.map((items: any) => {
                    return <DocumentItem haystack={items} />
                })}
            </Col>
        </Row>
    </>
}
