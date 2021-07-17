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
import ReactLoading from "react-loading";
import {SnippetsTwoTone} from "@ant-design/icons";


type Props = {
    setActiveMenu: (key: string) => void;
}

export const SearchHaystack = (props: Props) => {
    props.setActiveMenu('haystack')
    const [dataResponse, setDataResponse] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [timeOut, setTimeOut] = useState<number>(0)

    const onFinish = async (values: any) => {
        setLoading(true)
        const sendDate = (new Date()).getTime();

        const formValues = {
            'haystackData': values?.user.haystackData,
        }
        await axios.post('http://54.169.14.103:5000/haystack', formValues)
            .then((res: any) => {
                setDataResponse(res.data.result)
                setTotalCount(res.data.result.length)
                const receiveDate = (new Date()).getTime();
                setTimeOut(receiveDate - sendDate)
            })
        setLoading(false)
    }
    return <>
        <Row>
            <Col span={12} offset={6} className="fieldset">
                <h1><SnippetsTwoTone />Tìm kiếm Q/A</h1>
                <Col span={18} offset={3} className="fieldset-box">
                    <Form name="nest-messages" onFinish={onFinish}>
                        <Row>
                            <Col span={20} offset={2}>
                                <Form.Item name={['user', 'haystackData']} label="Tìm kiếm">
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        <h4>Total: {totalCount} tài liệu</h4>
                        <h4>Thời gian tìm kiếm: {timeOut/1000} giây</h4>

                    </Form>
                </Col>
            </Col>
        </Row>
        <Row>
            <Col span={2} offset={11}>
                {loading && <ReactLoading type={'balls'} className="loading" width={'100%'} height={10}/>}
            </Col>
            <Col span={18} offset={3}>
                {!loading && dataResponse.map((items: HaystackModel) => {
                    return <HayStackItem haystack={items}/>
                })}
            </Col>
        </Row>
    </>
}
