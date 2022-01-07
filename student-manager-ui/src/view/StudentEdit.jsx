import React, {useEffect, useState} from 'react'
import {Button, Form, Input, Picker, Switch, Toast} from "antd-mobile"
import {useSelector} from "react-redux";
import Top from "../component/Top";
import axios from "axios";

const StudentEdit = () => {

    const [form] = Form.useForm()
    //开关选中状态
    const [checked, setChecked] = useState(false)
    //学生信息
    const student = useSelector(state => state.student.value)

    useEffect(() => {
        setChecked(student.type === 3)
        form.setFieldsValue(student)
    }, [])

    //提交表单
    const onFinish = value => {
        //设置ID
        value.id = student.id
        //根据开关状态设置黑名单
        value.type = value.type ? 3 : 1
        //请求后端
        axios.post("/api/student/save", value)
            .then(res => {
                if (res.data) {
                    Toast.show({
                        icon: 'success',
                        content: '修改成功',
                    })
                }
            })
    }

    const selectCollege = () => {
        axios.get("/api/student/colleges")
            .then(res => {
                Picker.prompt({
                    value: [form.getFieldValue("collegeName")],
                    columns: [res.data],
                }).then(value => {
                    if (value !== null) {
                        form.setFieldsValue({collegeName: value[0]})
                    }
                })
            })
    }

    const selectClass = () => {
        axios.get("/api/student/classes", {
            params: {collegeName: form.getFieldValue("collegeName")}
        }).then(res => {
            Picker.prompt({
                value: [form.getFieldValue("className")],
                columns: [res.data],
            }).then(value => {
                if (value !== null) {
                    form.setFieldsValue({className: value[0]})
                }
            })
        })
    }

    return (
        <div>
            <Top title="修改学生信息"/>
            <Form layout='horizontal'
                  form={form}
                  onFinish={onFinish}
                  footer={
                      <Button block type='submit' color='primary'>修改</Button>
                  }>
                <Form.Item name='realName' label='姓名'>
                    <Input placeholder='请输入姓名'/>
                </Form.Item>
                <Form.Item name='studentId' label='学号'>
                    <Input placeholder='请输入学号'/>
                </Form.Item>
                <Form.Item name="collegeName" label='学院' onClick={selectCollege}>
                    <Input placeholder='请选择学院' readOnly/>
                </Form.Item>
                <Form.Item name='className' label='班级' onClick={selectClass}>
                    <Input placeholder='请选择班级' readOnly/>
                </Form.Item>
                <Form.Item name='type' label='黑名单'>
                    <Switch checked={checked} onChange={checked => setChecked(checked)}/>
                </Form.Item>
            </Form>
        </div>
    )
}

export default StudentEdit
