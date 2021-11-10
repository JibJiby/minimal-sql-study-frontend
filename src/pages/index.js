import React, { useEffect, useState, useCallback } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'
import { Button, message } from 'antd'

import fetcher from '../utils/fetcher'
import AppLayout from '../components/AppLayout'
import { FlexCenterDiv } from '../styles/common'

const Home = () => {
    // url별로 저장 캐시 다름
    // const { data: adminData, error, mutate: revalidateUser } = useSWR('/user', fetcher, { refreshInterval: 1000 * 60 }) // 60초마다
    const { data: adminData, error, mutate: revalidateUser } = useSWR('/user', fetcher, { refreshInterval: 1000 * 60 }) // 60초마다
    const history = useHistory()

    const onLogOut = useCallback(() => {
        axios
            .post('/user/logout')
            .then(() => {
                revalidateUser()
                message.info('로그아웃 되었습니다.')
            })
            .catch((error) => {
                console.dir(error)
                // toast.error(error.response?.data, { position: 'bottom-center' });
            })
    }, [])

    if (adminData !== null) {
        // GET /user else 분기문의 json(null)을 반환하기 때문에
        return (
            <AppLayout>
                어드민 로그인 중
                <FlexCenterDiv>
                    <Button onClick={onLogOut}>로그아웃</Button>
                </FlexCenterDiv>
            </AppLayout>
        )
    } else {
        return (
            <AppLayout>
                로그인 안했음
                <FlexCenterDiv>
                    <Button onClick={() => history.push('/login')}>로그인하러</Button>
                </FlexCenterDiv>
            </AppLayout>
        )
    }
}

export default Home
