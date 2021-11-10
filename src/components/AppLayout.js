import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
      box-sizing: border-box;
    }
`;

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
    const history = useHistory();

    const onMenuClick = ({ item, key, keyPath, e }) => {
        if (key === 'Home') {
            history.push('/');
        } else if (key === 'Editor') {
            history.push('/editor');
        }
    };

    return (
        <>
            <GlobalStyle />
            <Layout style={{ height: '100%' }}>
                <Header
                    style={{
                        color: 'white',
                        background: '#343a40',
                        // fixed 하면서 공백 없애기
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,

                        // Content 위에 <div>도 동일한 높이 줘야 함
                        height: '64px',
                    }}
                >
                    {/* <Menu horizon>
                        <Menu.Item>Home</Menu.Item>
                        <Menu.Item>Home</Menu.Item>
                    </Menu> */}
                </Header>
                {/* 헤더 크기만큼 height를 주고, width: 100%으로 한다. */}
                <div
                    style={{
                        height: '64px',
                        width: '100%',
                        backgroundColor: 'white',
                    }}
                />
                <Content
                    style={{
                        backgroundColor: 'white', //antd 디폴트 회색 배경 바꿔주기
                        overflow: 'auto',
                        width: '100%',
                        // height: '100%',      // 스크롤 없어지는 거 같음
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </>
    );
};

export default AppLayout;
