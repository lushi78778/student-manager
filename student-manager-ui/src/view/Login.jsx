import React from 'react';
import {Button, Form, Image, Input, Toast} from "antd-mobile";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import style from '/src/css/login.module.css'
import Logo from '/src/image/logo.png'

const Login = () => {

    const navigate = useNavigate()

    //提交表单
    const onFinish = (values) => {
        axios.post("/api/login", values)
            .then(res => {
                if (res.data === "登陆成功") {
                    Toast.show({
                        icon: 'success',
                        content: '登录成功',
                        duration: 1000,
                        afterClose: () => {
                            navigate("/")
                        }
                    })
                }
            })
    }

    return (
        <div>
            <div className={style.logo}>
                <Image src={Logo}/>
                <h1>学生信息管理</h1>
            </div>
            <Form onFinish={onFinish}
                  layout='horizontal'
                  footer={
                      <Button block type='submit' color='primary'>登录</Button>
                  }>
                <Form.Item name='username' label='账号'>
                    <Input placeholder='请输入账号' clearable/>
                </Form.Item>

                <Form.Item name='password' label='密码'>
                    <Input type="password" placeholder='请输入密码' clearable/>
                </Form.Item>
            </Form>
        </div>

    );
};

export default Login;
