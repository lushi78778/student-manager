import React from 'react';
import {List, Space, Tag} from "antd-mobile";
import {UserContactOutline} from "antd-mobile-icons";
import {useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import studentSlice from "../store/student";
import style from '/src/css/student.module.css'

//列表项右侧标签
const types = [
    {color: 'success', text: '本科生'},
    {color: 'primary', text: '研究生'},
    {color: 'danger', text: '黑名单'}
]

const StudentList = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //点击列表项
    const onClick = student => {
        //设置一个student状态
        dispatch(studentSlice.actions.set(student))
        //跳转页面
        navigate("/student/edit")
    }

    return (
        <List>
            {
                props.list.map(item => (
                    <List.Item className={style.item}
                               key={item.id}
                               title={item.collegeName}
                               description={item.className}
                               prefix={<UserContactOutline/>}
                               extra={
                                   <Tag color={types[item.type - 1].color}>
                                       {types[item.type - 1].text}
                                   </Tag>
                               }
                               onClick={() => onClick(item)}>
                        <Space>
                            <span>{item.studentId}</span>
                            <span>{item.realName}</span>
                        </Space>
                    </List.Item>
                ))
            }
        </List>
    );
};

export default StudentList;
