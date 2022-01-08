import React from 'react';
import {Button, Form, Input, Picker, Switch, Toast} from "antd-mobile";
import Top from "../component/Top";
import axios from "axios";

const StudentAdd = () => {

    const [form] = Form.useForm()

    //提交表单
    const onFinish = value => {
        //根据开关状态设置黑名单
        value.type = value.type ? 3 : 1
        //请求后端
        axios.post("/api/student/save", value)
            .then(res => {
                if (res.data === true) {
                    //弹出提示
                    Toast.show({
                        icon: 'success',
                        content: '添加成功',
                    })
                } else {
                    Toast.show({
                        icon: 'fail',
                        content: '无权限',
                    })
                }
            })
    }

    //选择学院
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

    //选择班级
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
            <Top title="添加学生信息"/>
            <Form layout='horizontal'
                  onFinish={onFinish}
                  form={form}
                  footer={
                      <Button block type='submit' color='primary'>添加</Button>
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
                    <Switch/>
                </Form.Item>
            </Form>
        </div>
    );
};

export default StudentAdd;
