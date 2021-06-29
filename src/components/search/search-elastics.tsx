import React, {useState} from "react";
import {AgGridReact} from "ag-grid-react";
import axios from "axios";
import {Button, Col, Form, Input, InputNumber, Radio, Row, Table} from "antd";
import {AgAbstractField} from "ag-grid-community";

const columnDefs = [
    {
        title: 'Birth date',
        dataIndex: 'birth_date',
        key: 'birth_date',
        width: 150,
    },
    {
        title: 'File name',
        dataIndex: 'file_name',
        key: 'file_name',
        width: 150
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 150,
        filtered: true,
    },
    {
        title: 'Content',
        dataIndex: 'cv_content',
        key: 'cv_content',
        minWidth: 500,
        // render: (value: string) => {
        //     return value.replace(/[^a-zA-Z ]/g, ".")
        // }
    }
]
export const SearchElastics: React.FC = () => {
    const [dataResponse, setDataResponse] = useState<any[]>([])

    const onFinish = async (values: any) => {
        console.log(values)
        const formValues = {
            'gender': values?.user.gender,
            'major': values?.user.major,
            'languages': values?.user.languages,
            'skills': values?.user.skills,
            'full_name': values?.user.full_name,
            'birth_date': values?.user.birth_date,
            'email': values?.user.email,
            'phone': values?.user.full_name,
            'address': values?.user.full_name,
            'old_position': values?.user.full_name,
            'target': values?.user.full_name,
        }

        // setDataResponse(data)
        axios.post('http://13.213.71.142/searchCvAdvance', formValues)
            .then((res: any) => {
                const data = res.data.res
                const finalResponse = data.map((item: any, index: number) => {
                    const subItem = item._source
                    subItem.key = index
                    return subItem
                })
                console.log(finalResponse)
                setDataResponse(finalResponse)
            })
    }
    return <>
        <Row>
            <Col span={12} offset={6} className="fieldset">
                <h1>Elastic</h1>
                <Col span={18} offset={3}>
                    <Form name="nest-messages" onFinish={onFinish}>
                        <Row>
                            <Col span={12}>
                                <Form.Item name={['user', 'gender']} label="Gender">
                                    <Radio.Group >
                                        <Radio value={"Nam"}>Nam</Radio>
                                        <Radio value={"Nữ"}>Nữ</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['user', 'language']} label="Language">
                                    <Radio.Group >
                                        <Radio value={"Anh"}>Anh</Radio>
                                        <Radio value={"Việt"}>Việt</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['user', 'full_name']} label="Tên">
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['user', 'skills']} label="Skills">
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['user', 'major']} label="Major">
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['user', 'phone']} label="Số điện thoại">
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['user', 'address']} label="Địa chỉ">
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['user', 'old_position']} label="Vị trí cũ">
                                    <Input/>
                                </Form.Item>
                            </Col>
                            {/*<Col span={12}>*/}
                            {/*    <Form.Item name={['user', 'target']} label="Mục tiêu">*/}
                            {/*        <Input/>*/}
                            {/*    </Form.Item>*/}
                            {/*</Col>*/}
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