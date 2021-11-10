import React, { useEffect, useState, useRef, useCallback } from 'react'
import AceEditor from 'react-ace'
import { Parser } from 'node-sql-parser'
import JSONPretty from 'react-json-pretty'

// ace editor 기능을 위해
import 'ace-builds/src-noconflict/mode-mysql'
import 'ace-builds/src-noconflict/theme-monokai'
// react-json-pretty 테마 적용
import 'react-json-pretty/themes/monikai.css'

import { FlexCenterDiv } from '../styles/common'
import { Button, message } from 'antd'

const parser = new Parser()

const CodeEditor = ({ setSelectedAnswer }) => {
    // TODO: 외부에서 사용하는 CodeEditor에서 ast를 반환하고 state 관리가 잘 되도록 해야함.
    const [codeValue, setCodeValue] = useState('')
    const [resultJSON, setResultJSON] = useState(null)
    // const [tableList, setTableList] = useState([])

    const editorRef = useRef()

    const runQuery = () => {
        // TODO: 나중에 BigQuery로 파싱해도 되고. react-ace도 Bigquery로 나오긴 해야 하는데
        const opt = {
            database: 'MySQL',
        }

        try {
            // const ast = parser.astify(codeValue)
            const { tableList: parsedTableList, columnList: parsedColumnList, ast } = parser.parse(codeValue)
            // const parsedTableList = parser.tableList(codeValue, opt)
            // const parsedTableList = parser.tableList(codeValue)

            setResultJSON({ ...ast })
            setSelectedAnswer(JSON.stringify(ast))

            // TODO: tableList를 제대로 가져오지 못함.
            // TODO: 확인시 아래 주석해제 하면 됨.
            // console.log('parsedTableList')
            // console.log(parsedTableList)
            // console.log('parsedColumnList')
            // console.log(parsedColumnList)
            console.log('ast')
            console.log(ast)

            // 기본 포멧
            //  {type}::{tableName}::{columnName}
            // TODO: 서버에서 문제 정보(문제의 테이블, 칼럼 정보)를 가져오거나, 여기에서 만들어서 비교하거나
            const whiteColumnList = ['select::null::(a|b)']
            // parser.whiteListCheck(codeValue, whiteColumnList, opt)
        } catch (error) {
            // console.log('ast 에러')
            // console.log(error)
            message.warn('제대로된 쿼리를 입력해주세요', 0.6)
            setResultJSON(null)
            setSelectedAnswer(null)
        }
    }

    const onChange = (v) => {
        setCodeValue(v)
    }

    const onClickBtn = (e) => {
        e.preventDefault()

        runQuery()
    }

    useEffect(() => {
        // 에디터에 자동 커서
        editorRef.current.editor.focus()
    }, [])

    return (
        <>
            <FlexCenterDiv
                style={{
                    margin: '20px auto',
                    // auto로 안하면 옆으로 튀어 나감.
                }}
            >
                <AceEditor
                    mode="mysql"
                    theme="monokai"
                    // 외부에서 컴포넌트로 사용할 때는 setSelectedAnswer와 selectedAnswer 사용. 아니면 로컬용으로 onChange와 codeValue 사용.
                    onChange={onChange}
                    value={codeValue}
                    ref={editorRef}
                    fontSize={20}
                    height={300} // TODO: 나중에 더 괜찮은 높이 찾기
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    commands={[
                        {
                            // 실행은 되는데 정상 작동 안됨.
                            name: 'runQuery',
                            bindKey: { win: 'Ctrl-enter', mac: 'Cmd-enter' },
                            exec: (editor) => {
                                console.log('enter')
                                // TODO: runQuery()가 정상 작동하지 않음
                                runQuery()
                            },
                        },
                    ]}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: false,
                        tabSize: 2,
                    }}
                />
            </FlexCenterDiv>
            <FlexCenterDiv>
                <Button size="large" type="primary" onClick={onClickBtn}>
                    변환하기
                </Button>
            </FlexCenterDiv>
            <FlexCenterDiv
                style={{
                    marginTop: '20px',
                }}
            >
                {resultJSON ? (
                    <JSONPretty
                        space="14"
                        style={{
                            fontSize: '19px',
                        }}
                        data={resultJSON}
                    ></JSONPretty>
                ) : (
                    '아직 없음'
                )}
            </FlexCenterDiv>

            <FlexCenterDiv
                style={{
                    marginTop: '30px',
                }}
            >
                테이블
            </FlexCenterDiv>
            <FlexCenterDiv
                style={{
                    marginTop: '10px',
                }}
            ></FlexCenterDiv>
        </>
    )
}

export default CodeEditor
