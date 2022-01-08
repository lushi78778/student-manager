import React, {useState} from 'react';
import {Button, Form, Input, Space, Toast} from "antd-mobile";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import StudentList from "./StudentList";
import Top from "../component/Top";

const Index = () => {
    const navigate = useNavigate()

    //学生列表
    const [students, setStudents] = useState([])

    //添加学生信息
    const addClick = () => {
        navigate("/student/add")
    }

    //提交表单
    const onFinish = value => {
        //请求后端
        axios.get("/api/student/list", {
            params: value
        }).then(res => {
            if (res.data === "无权限") {
                Toast.show({
                    icon: 'fail',
                    content: '无权限',
                })
            } else {
                //更新学生列表数据
                setStudents(res.data)
            }
        })
    }

    return (
        <div>
            <Top title="首页"/>

            <Form layout='horizontal'
                  onFinish={onFinish}
                  footer={
                      <Space>
                          <Button type='submit' color='primary'>查询</Button>
                          <Button color='success' onClick={addClick}>添加</Button>
                      </Space>
                  }>
                <Form.Item name='collegeName' label='学院'>
                    <Input placeholder='请输入学院'/>
                </Form.Item>
                <Form.Item name='className' label='班级'>
                    <Input placeholder='请输入班级'/>
                </Form.Item>
                <Form.Item name='studentId' label='学号'>
                    <Input placeholder='请输入学号'/>
                </Form.Item>
                <Form.Item name='realName' label='姓名'>
                    <Input placeholder='请输入姓名'/>
                </Form.Item>
            </Form>

            <StudentList list={students}/>
        </div>
    );
};

export default Index;
