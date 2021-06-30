import React, {useState} from "react";
import {AgGridReact} from "ag-grid-react";
import axios from "axios";
import {Button, Col, Form, Input, InputNumber, Radio, Row, Table, Tag} from "antd";
import {AgAbstractField} from "ag-grid-community";
import {
    DownloadOutlined
} from '@ant-design/icons';
const columnDefs = [
    {
        title: 'File name',
        dataIndex: 'file_url',
        key: 'file_url',
        width: 150,
        render: (params: string) => {
            const link = params.replace("txt","pdf")
            return <a href={`http://13.213.71.142:80/download/${link}`} target={"_blank"}>{params}</a>
        }
    },
    {
        title: 'Answer',
        dataIndex: 'answer',
        key: 'answer',
        width: 150,
        filtered: true,
    },
    {
        title: 'Context',
        dataIndex: 'context',
        key: 'context',
        minWidth: 500,
    },
]
export const SearchHaystack: React.FC = () => {
    const [dataResponse, setDataResponse] = useState<any[]>([])
    const onFinish = async (values: any) => {
        console.log("Haystack")
        const formValues = {
            'haystackData': values?.user.haystackData,
        }
        axios.post('http://13.213.71.142/haystack', formValues)
            .then((res: any) => {
                setDataResponse(res.data.result)
            })
    }
    return <>
        <Row>
            <Col span={12} offset={6} className="fieldset">
                <h1>Haystack</h1>
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
        <Row className={"row-table"}>
            <Col span={20} offset={2}>

                <Table
                    columns={columnDefs}
                    dataSource={dataResponse}
                    // loading={}
                />
            </Col>
        </Row>
    </>
}
