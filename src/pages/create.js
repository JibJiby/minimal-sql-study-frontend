import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import fetcher from '../utils/fetcher'
import AppLayout from '../components/AppLayout'
import { FlexCenterDiv } from '../styles/common'
import QuizEditor from '../components/QuizEditor'

const Create = () => {
    const { data: adminData, error, mutate: revalidateUser } = useSWR('/user', fetcher, { refreshInterval: 1000 * 60 }) // 60초마다

    return (
        <AppLayout>
            {adminData ? <QuizEditor /> : <FlexCenterDiv style={{ marginTop: '30px' }}>권한 없음</FlexCenterDiv>}
            {/* <QuizEditor /> */}
        </AppLayout>
    )
}

export default Create
