import { useState } from 'react'
import { Modal, Button, Upload, Avatar, Space } from 'antd'
import { RobotOutlined, InboxOutlined } from '@ant-design/icons'
import { Bubble } from '@ant-design/x'
import { AI_PARSE_MESSAGES } from '../../mock/data'
import { useStreamingMessages } from './useStreamingMessages'
import styles from './AiAssistantPanel.module.css'

const { Dragger } = Upload

const aiRole = {
  ai: {
    placement: 'start',
    avatar: <Avatar size={40} icon={<RobotOutlined />} style={{ background: '#1677ff' }} />,
    variant: 'filled',
    styles: {
      content: { background: '#f0f5ff', maxWidth: '100%' },
    },
  },
}

const GREETING = {
  key: 'greeting',
  role: 'ai',
  content: '你好！我是 AI建券助手，可以帮你快速批量创建优惠券。\n只需上传建券文件，我会自动解析并生成优惠券配置，支持 .xlsx、.csv 格式。',
}

export default function AiAssistantPanel() {
  const [open, setOpen] = useState(false)
  const [fileSelected, setFileSelected] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const { visibleMessages, isStreaming, startStreaming, reset } = useStreamingMessages(AI_PARSE_MESSAGES)

  const isDone = !isStreaming && uploaded && visibleMessages.length === AI_PARSE_MESSAGES.length

  const handleClose = () => {
    setOpen(false)
    setFileSelected(false)
    setUploaded(false)
    reset()
  }

  const handleFileSelect = (file) => {
    setFileSelected(true)
    return false
  }

  const handleStartUpload = () => {
    setUploaded(true)
    setFileSelected(false)
    startStreaming()
  }

  const bubbleItems = [
    GREETING,
    ...visibleMessages.map((msg, index) => ({
      key: msg.key,
      role: 'ai',
      content: msg.content,
      typing: isStreaming && index === visibleMessages.length - 1
        ? { effect: 'typing', step: 3, interval: 30 }
        : undefined,
    })),
  ]

  return (
    <>
      <Button
        type="primary"
        icon={<RobotOutlined />}
        onClick={() => setOpen(true)}
      >
        AI 助手
      </Button>

      <Modal
        title={
          <div className={styles.modalTitle}>
            <Avatar size={24} icon={<RobotOutlined />} style={{ background: '#1677ff' }} />
            <span>AI 批量建券</span>
          </div>
        }
        open={open}
        onCancel={handleClose}
        width={640}
        maskClosable={false}
        footer={
          <Space>
            <Button onClick={handleClose}>取消</Button>
            {!uploaded && (
              <Button type="primary" disabled={!fileSelected} onClick={handleStartUpload}>
                开始上传
              </Button>
            )}
            {isDone && (
              <Button type="primary" onClick={handleClose}>
                完成
              </Button>
            )}
          </Space>
        }
      >
        <div className={styles.modalBody}>
          <div className={styles.bubbleSection}>
            <Bubble.List
              items={bubbleItems}
              role={aiRole}
              autoScroll
            />
          </div>

          {!uploaded && (
            <div className={styles.uploadSection}>
              <Dragger
                accept=".xlsx,.xls,.csv"
                maxCount={1}
                showUploadList={true}
                beforeUpload={handleFileSelect}
                onRemove={() => setFileSelected(false)}
                classNames={{
                  root: styles.draggerWrapper,
                  trigger: styles.dragger,
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#1677ff', fontSize: 36 }} />
                </p>
                <p className="ant-upload-text">
                  将建券文件拖拽到此处，或 <span style={{ color: '#1677ff' }}>点击选择文件</span>
                </p>
                <p className="ant-upload-hint">
                  支持 .xlsx、.csv、.xls 格式，上传后将自动开始解析
                </p>
              </Dragger>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
