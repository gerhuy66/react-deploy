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

type Props = {
    setActiveMenu: (key: string) => void;
}
export const SearchDocument = (props: Props) => {
    props.setActiveMenu('document')
    const [dataResponse, setDataResponse] = useState<any[]>([])

    const onFinish = async (values: any) => {
        console.log("Haystack")
        const formValues = {
            'haystackData': values?.user.haystackData,
        }
        axios.post('http://54.169.14.103:5000/searchText', formValues)
            .then((res: any) => {
                console.log(res)
                setDataResponse(res.data.result)
            })
    }
    return <>
        <Row>
            <Col span={12} offset={6} className="fieldset">
                <h1>Document Search</h1>
                <Col span={18} offset={3}>
                    <Form name="nest-messages" onFinish={onFinish}>
                        <Row>
                            <Col span={20} offset={2}>
                                <Form.Item name={['user', 'haystackData']} label="Search">
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Col>
        </Row>
        <Row>
            <Col span={18} offset={3}>
                {dataResponse.map((items: any) => {
                    return <DocumentItem haystack={items}/>
                })}
            </Col>
        </Row>
    </>
}
