import { useCallback, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { useHistory } from 'react-router-dom'
import { Layout, Form, Input, Button, message } from 'antd'
import useSWR from 'swr'

import fetcher from '../utils/fetcher'
import axios from 'axios'

const Login = () => {
    const { data: adminData, error, mutate } = useSWR('/user', fetcher)
    const [logInError, setLogInError] = useState(false)
    // const [email, onChangeEmail] = useInput('');
    // const [password, onChangePassword] = useInput('');

    const history = useHistory()

    const onSubmit = useCallback(
        // e가 아닌 이유는 기본 form이 아닌, antd.Form 이기 때문에
        (inputValue) => {
            setLogInError(false)
            axios
                .post(
                    '/admin/login',
                    {
                        email: inputValue.email,
                        password: inputValue.password,
                    },
                    {
                        withCredentials: true,
                    },
                )
                .then(() => {
                    mutate()
                    message.info('로그인 성공')
                })
                .catch((error) => {
                    message.warn('어드민 계정이 아닙니다.')
                    setLogInError(error.response?.data?.code === 401) // 필요한가??
                })

            // }, [email, password, mutate])
        },
        [adminData, mutate],
    )

    console.log(error, adminData)
    // TODO: ADMIN_EMAIL로 하거나, 서버에서 처리하거나
    if (!error && adminData && adminData.email === 'admin@admin.com') {
        console.log('로그인됨', adminData)
        return <Redirect to="/" />
    }

    return (
        <Layout
            style={{
                width: '100%',
                // height: '100%',
                // marginLeft: '20%',
                marginRight: '20%',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto' }}>
                <Button onClick={() => history.push('/')}>홈 화면으로</Button>
            </div>

            <Form onFinish={onSubmit}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" size="large" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export default Login
