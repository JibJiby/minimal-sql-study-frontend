import React, { useEffect, useState, useCallback } from 'react'
import { useHistory, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios'
import { Button, message } from 'antd';

import fetcher from '../utils/fetcher'
import AppLayout from '../components/AppLayout';
import { FlexCenterDiv } from '../styles/common'




const Home = () => {
    // url별로 저장 캐시 다름
    // const { data: adminData, error, mutate: revalidateUser } = useSWR('/user', fetcher, { refreshInterval: 1000 * 60 }) // 60초마다
    const { data: testData, error, mutate } = useSWR('/test', fetcher, { refreshInterval: 1000 * 60 })
    const history = useHistory()

    // const onLogOut = useCallback(() => {
    //     axios
    //         .post('/user/logout')
    //         .then(() => {
    //             revalidateUser();
    //             message.info('로그아웃 되었습니다.')
    //         })
    //         .catch((error) => {
    //             console.dir(error);
    //         });
    // }, []);


    return (
        <AppLayout>
            <FlexCenterDiv
                // 스타일 추가.
                style={{
                    marginTop: '30px'
                }}
            >
                {testData ? '홈' : '홈(백엔드x)'}
            </FlexCenterDiv>
        </AppLayout>
    )
}

export default Home