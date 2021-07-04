import React, {useState} from "react";
import {AgGridReact} from "ag-grid-react";
import axios from "axios";
import {Button, Col, Form, Input, InputNumber, Radio, Row, Select, Table} from "antd";
import {AgAbstractField} from "ag-grid-community";
import {Option} from "antd/es/mentions";
import ReactLoading from "react-loading";

const columnDefs = [
    {
        title: 'Full Name',
        dataIndex: 'full_name',
        key: 'full_name',
        width: 100
    },
    {
        title: 'Birth date',
        dataIndex: 'birth_date',
        key: 'birth_date',
        width: 50,
    },
    {
        title: 'File name',
        dataIndex: 'file_name',
        key: 'file_name',
        width: 50,
        render: (value: string) =>{
            console.log(value)
            const linkCv = value.replace("txt", "pdf").replace(" (1)", "")
            const linkIm = value.replace("txt", "jpg").replace(" (1)", "")

            return <Row>
                <Col span={24}>
                    <img src={`http://54.169.14.103:5000/getImage/${linkIm}`} width={150} height={200} alt={"CV"}/>
                </Col>
                <Col span={24}>
                    <a href={`http://54.169.14.103:5000/download/${linkCv}`} target="_blank">{linkCv} </a>
                </Col>
            </Row>
        },
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 50,
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: 50,
    },
    {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
        width: 50,
    },
    {
        title: 'Language',
        dataIndex: 'language',
        key: 'language',
        width: 50,
    },
    {
        title: 'Old Position',
        dataIndex: 'old_position',
        key: 'old_position',
        width: 50,
        maxHeight:100,
    },
    {
        title: 'Target',
        dataIndex: 'target',
        key: 'target',
        width: 50,
        maxHeight:100,
    },
    // {
    //     title: 'Content',
    //     dataIndex: 'cv_content',
    //     key: 'cv_content',
    //     width: 500,
    //     render: (value: string) => {
    //         return <div className='content'> {value} </div>
    //     }
    // }
]

type Props = {
    setActiveMenu: (key: string) => void;
}

export const SearchElastics = (props: Props) => {
    props.setActiveMenu('elastic')
    const [dataResponse, setDataResponse] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)

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
        axios.post('http://54.169.14.103:5000/searchCvAdvance', formValues)
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
                                <Form.Item name={['user', 'gender']} label="Giới tính">
                                    <Radio.Group>
                                        <Radio value={"Nam"}>Nam</Radio>
                                        <Radio value={"Nữ"}>Nữ</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['user', 'language']} label="Ngoại ngữ">
                                    <Select defaultValue="Tiếng Anh" style={{width: 120}} allowClear>
                                        <Option value="Tiếng Anh">Tiếng Anh</Option>
                                        <Option value="Tiếng Trung">Tiếng Trung</Option>
                                        <Option value="Tiếng Nhật">Tiếng Nhật</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['user', 'full_name']} label="Tên">
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['user', 'skills']} label="Kĩ năng">
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['user', 'major']} label="Chuyên ngành">
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
            <Col span={24}>
                <Table
                    columns={columnDefs}
                    dataSource={dataResponse}
                    // loading={}
                />
            </Col>
        </Row>
    </>
}