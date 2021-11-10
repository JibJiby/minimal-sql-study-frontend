import React from 'react'
import { useHistory, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios'

import AppLayout from '../components/AppLayout'
import { FlexCenterDiv } from '../styles/common'
import CodeEditor from '../components/CodeEditor';


const Editor = () => {
    // const { data: testData, error, mutate } = useSWR('/test', fetcher, { refreshInterval: 1000 * 60 })


    return (
        <AppLayout>
            {/* 여기에 Flex로 덮으면 안에 있는 flex는 가로로 반반 나뉘어짐. 위아래가 아니라. */}
            {/* <FlexCenterDiv> */}
            <CodeEditor />
            {/* </FlexCenterDiv> */}
        </AppLayout>
    )
}

export default Editor