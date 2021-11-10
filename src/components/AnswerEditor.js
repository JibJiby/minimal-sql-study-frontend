import React from 'react'
import { Input } from 'antd'

import { FlexCenterDiv } from '../styles/common'
import CodeEditor from './CodeEditor'

const AnswerEditor = ({ selectedQuizType, setSelectedAnswer, onChangeSelectionAnswer, selectedAnswer }) => {
    const selectionFn = (type) => {
        switch (type) {
            case 'selection':
                return (
                    <>
                        <label>1</label>
                        <FlexCenterDiv>
                            <Input />
                        </FlexCenterDiv>
                        <label>2</label>
                        <FlexCenterDiv>
                            <Input />
                        </FlexCenterDiv>
                        <label>3</label>
                        <FlexCenterDiv>
                            <Input />
                        </FlexCenterDiv>
                        <label>4</label>
                        <FlexCenterDiv>
                            <Input />
                        </FlexCenterDiv>
                    </>
                )
            case 'query':
                return (
                    <>
                        {/* TODO: '변환하기' '테이블' 모두 제거해줘야 함.  */}
                        <CodeEditor setSelectedAnswer={setSelectedAnswer} selectedAnswer={selectedAnswer} />
                    </>
                )
            default:
                return (
                    <>
                        <FlexCenterDiv style={{ marginTop: '10px' }}>
                            <Input onChange={onChangeSelectionAnswer} value={selectedAnswer} />
                        </FlexCenterDiv>
                    </>
                )
        }
    }

    return <>{selectionFn(selectedQuizType)}</>
}

export default AnswerEditor
