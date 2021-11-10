import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Divider, Select, Input, Button, message } from 'antd'

// import userSlice from '../reducers/userSlice';
import fetcher from '../utils/fetcher'
// import AppLayout from '../components/AppLayout'
// import PartList from '../components/PartList';
import { FlexCenterDiv } from '../styles/common'
import { backendUrl } from '../config/config'
import AnswerEditor from './AnswerEditor'

const { Option } = Select
const { TextArea } = Input

const QuizEditor = () => {
    const {
        data: partData,
        error: partError,
        mutate: revalidatePartData,
    } = useSWR('/part', fetcher, { refreshInterval: 1000 * 60 }) // 60초마다
    const {
        data: chapterData,
        error: chapterError,
        mutate: revalidateChapterData,
    } = useSWR('/chapter', fetcher, { refreshInterval: 1000 * 60 }) // 60초마다
    const {
        data: quizData,
        error: quizError,
        mutate: revalidateQuizData,
    } = useSWR('/quiz', fetcher, { refreshInterval: 1000 * 60 }) // 60초마다

    const [selectedPartId, setSelectedPartId] = useState('')
    const [selectedChapterId, setSelectedChapterId] = useState('')
    // 임시
    const [selectedChapterValue, setSelectedChapterValue] = useState('')

    const [selectedDifficulty, setSelectedDifficulty] = useState(0)
    const [selectedQuizType, setSelectedQuizType] = useState('')
    const [selectedQuizContent, setSelectedQuizContent] = useState('')
    const [selectedAnswer, setSelectedAnswer] = useState('')

    const history = useHistory()

    // 확인용
    // console.log(partData)
    // console.log('-'.repeat(100))
    // console.log(chapterData)
    // console.log('-'.repeat(100));
    // console.log(quizData)

    const onChangeSelectionPart = (v) => {
        setSelectedPartId(v)
        // 둘이 세트
        setSelectedChapterValue('')
        setSelectedChapterId('')
    }

    const onChangeSelectionChapter = (v) => {
        // 둘이 세트임
        setSelectedChapterValue(v)
        setSelectedChapterId(v)
    }

    const onChangeSelectionDifficulty = (v) => {
        setSelectedDifficulty(v)
    }

    const onChangeSelectionQuizType = (v) => {
        setSelectedQuizType(v)
    }

    const onChangeSelectionQuizContent = (e) => {
        setSelectedQuizContent(e.target.value)
    }

    const onChangeSelectionAnswer = (e) => {
        setSelectedAnswer(e.target.value)
    }

    const onClickSubmit = async (e) => {
        e.preventDefault()
        // TODO: POST /quiz로 요청

        // chapterId

        // difficulty
        const difficulty = selectedDifficulty
        // quiz_type
        const quizType = selectedQuizType
        // quiz_content
        const quizContent = selectedQuizContent
        // solution_value
        const solution_value = selectedAnswer

        // fk 생략되면 Validation 오류
        const chapterId = selectedChapterId

        const newQuizData = {
            difficulty: difficulty,
            quiz_type: quizType,
            quiz_content: quizContent,
            solution_value: solution_value,
            chapterId,
        }

        console.log('newQuizData')
        console.log(newQuizData)

        try {
            const result = await axios.post(backendUrl + '/quiz/', newQuizData, { withCredentials: true })
            console.log('quiz maker result')
            console.log(result)

            message.info('문제 생성!', 0.5)
            history.push('/')
        } catch (error) {
            console.error(error)
            console.log(error)

            message.warn('생성 안됨!', 0.5)
        }
    }

    return (
        <>
            <FlexCenterDiv style={{ marignTop: '10px', marginBottom: '15px' }}>
                <label style={{ marginRight: '15px' }}>파트</label>
                <Select defaultValue="" style={{ width: 300 }} onChange={onChangeSelectionPart}>
                    {partData && partData.map((v) => <Option value={v.id}>{v.part_name}</Option>)}
                </Select>
            </FlexCenterDiv>

            <FlexCenterDiv style={{ marginBottom: '10px' }}>
                <label style={{ marginRight: '15px' }}>챕터</label>
                <Select
                    defaultValue=""
                    value={selectedChapterValue}
                    style={{ width: 300 }}
                    onChange={onChangeSelectionChapter}
                >
                    {chapterData &&
                        chapterData
                            .filter((v) => v.fk_part_id === selectedPartId)
                            .map((v) => <Option value={v.id}>{v.chapter_name}</Option>)}
                </Select>
            </FlexCenterDiv>

            <Divider />

            <FlexCenterDiv style={{ marginBottom: '10px' }}>
                {/* difficulty, quiz_content, quiz_type, solution_value */}
                <label style={{ marginRight: '15px' }}>난이도</label>
                <Select defaultValue={selectedDifficulty} style={{ width: 100 }} onChange={onChangeSelectionDifficulty}>
                    {/* 하 - 0 / 중 - 1 / 상 - 2 */}
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                </Select>
            </FlexCenterDiv>

            <FlexCenterDiv style={{ marginBottom: '10px' }}>
                <label style={{ marginRight: '15px' }}>퀴즈 타입</label>
                <Select defaultValue={selectedQuizType} style={{ width: 100 }} onChange={onChangeSelectionQuizType}>
                    <Option value="selection">selection</Option>
                    <Option value="query">query</Option>
                    <Option value="typing">typing</Option>
                    <Option value="assay">assay</Option>
                </Select>
            </FlexCenterDiv>

            <FlexCenterDiv style={{ marginTop: '20px' }}>문제 내용</FlexCenterDiv>
            <FlexCenterDiv style={{ marginTop: '10px' }}>
                <TextArea
                    showCount
                    maxLength={100}
                    rows={4}
                    size={400}
                    onChange={onChangeSelectionQuizContent}
                    value={selectedQuizContent}
                    style={{
                        margin: '0 200px',
                        flex: 1,
                    }}
                />
            </FlexCenterDiv>

            {/* TODO: 보기의 4개 값을 하나의 리스트로 만들어 보내야 함 */}
            {/*  */}
            <FlexCenterDiv style={{ marginTop: '20px' }}>정답</FlexCenterDiv>
            <AnswerEditor
                selectedQuizType={selectedQuizType}
                onChangeSelectionAnswer={onChangeSelectionAnswer}
                setSelectedAnswer={setSelectedAnswer} // CodeEditor를 위해.
                selectedAnswer={selectedAnswer}
            />

            <FlexCenterDiv style={{ marginTop: '10px' }}>
                {/* TODO: 누르고 '정말 제출하시겠습니까?' 띄우기 */}
                <Button onClick={onClickSubmit}>제출</Button>
            </FlexCenterDiv>
        </>
    )
}

export default QuizEditor
