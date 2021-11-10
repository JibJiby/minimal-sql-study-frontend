import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'

import AppLayout from '../components/AppLayout'
import { FlexCenterDiv } from '../styles/common'
import CodeEditor from '../components/CodeEditor'
import fetcher from '../utils/fetcher'

const Editor = () => {
    const { data: adminData, error, mutate: revalidateUser } = useSWR('/user', fetcher, { refreshInterval: 1000 * 60 }) // 60초마다

    return (
        <AppLayout>
            {/* 여기에 Flex로 덮으면 안에 있는 flex는 가로로 반반 나뉘어짐. 위아래가 아니라. */}
            {adminData ? <CodeEditor /> : <FlexCenterDiv style={{ marginTop: '30px' }}>권한 없음</FlexCenterDiv>}
            {/* <CodeEditor /> */}
        </AppLayout>
    )
}

export default Editor
