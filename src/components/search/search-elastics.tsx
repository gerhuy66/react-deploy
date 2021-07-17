import React, {useState} from "react";
import {AgGridReact} from "ag-grid-react";
import axios from "axios";
import {Button, Col, Form, Input, InputNumber, Radio, Row, Select, Table} from "antd";
import {AgAbstractField} from "ag-grid-community";
import {Option} from "antd/es/mentions";
import ReactLoading from "react-loading";
import {SnippetsTwoTone} from "@ant-design/icons";

const columnDefs = [
    {
        title: 'Họ Tên',
        dataIndex: 'full_name',
        key: 'full_name',
        width: 100
    },
    {
        title: 'Ngày Sinh',
        dataIndex: 'birth_date',
        key: 'birth_date',
        width: 50,
    },
    {
        title: 'Tên File',
        dataIndex: 'file_name',
        key: 'file_name',
        width: 50,
        render: (value: string) =>{
            console.log(value)
            const linkCv = value.replace("txt", "pdf").replace(" (1)", "").replace(" (2)", "").replace(" (3)", "").replace(" (4)", "").replace(" (5)", "")
            const linkIm = value.replace("txt", "jpg").replace(" (1)", "").replace(" (2)", "").replace(" (3)", "").replace(" (4)", "").replace(" (5)", "")

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
        title: 'Giới Tính',
        dataIndex: 'gender',
        key: 'gender',
        width: 50,
    },
    {
        title: 'Số Điện Thoại',
        dataIndex: 'phone',
        key: 'phone',
        width: 50,
    },
    {
        title: 'Kĩ Năng',
        dataIndex: 'skills',
        key: 'skills',
        width: 50,
    },
    {
        title: 'Ngoại Ngữ',
        dataIndex: 'language',
        key: 'language',
        width: 50,
    },
    {
        title: 'Vị Trí Cũ',
        dataIndex: 'old_position',
        key: 'old_position',
        width: 50,
        maxHeight:100,
    },
    {
        title: 'Ngành',
        dataIndex: 'major',
        key: 'major',
        width: 50,
        maxHeight:100,
    },
    {
        title: 'Mục Tiêu',
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
    const [totalCount, setTotalCount] = useState<number>(0)
    const [timeOut, setTimeOut] = useState<number>(0)


    const onFinish = async (values: any) => {
        
        const formValues: any = {
            'gender': values?.user.gender,
            'major': values?.user.major,
            'language': values?.user.language,
            'skills': values?.user.skills,
            'full_name': values?.user.full_name,
            'birth_date': values?.user.birth_date,
            'email': values?.user.email,
            'phone': values?.user.phone,
            'address': values?.user.address,
            'old_position': values?.user.old_position,
            'target': values?.user.target,
            'file_name':values?.user.file_name
        }
        for(const i in formValues){
            if(formValues[i] === undefined || formValues[i] === "") delete formValues[i];
        }

        console.log(formValues)
          const sendDate = (new Date()).getTime();
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
                setTotalCount(finalResponse.length)
                setDataResponse(finalResponse)
                
                const receiveDate = (new Date()).getTime();
                setTimeOut(receiveDate - sendDate)
            })
    }
    return <>
        <Row>
            <Col span={16} offset={4} className="fieldset">
                <h1><SnippetsTwoTone/> Tìm Kiếm Nâng Cao</h1>
                <Col span={18} offset={3} className="fieldset-box">
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
                                    <Select style={{width: 120}} allowClear>
                                        <Option value="Tiếng Anh" >Tiếng Anh</Option>
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
                                <Form.Item name={['user', 'file_name']} label="Tên File CV">
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
                        <h4>Total: {totalCount} tài liệu</h4>
                        <h4>Thời gian tìm kiếm: {timeOut/1000} giây</h4>

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