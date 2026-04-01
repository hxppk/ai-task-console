import { useEffect, useRef } from 'react'
import { Modal, Button, Avatar, Space } from 'antd'
import { SafetyCertificateOutlined } from '@ant-design/icons'
import { Bubble } from '@ant-design/x'
import { AI_REVIEW_MESSAGES } from '../../mock/data'
import { useStreamingMessages } from './useStreamingMessages'
import styles from './AiReviewModal.module.css'

const aiRole = {
  ai: {
    placement: 'start',
    avatar: <Avatar size={40} icon={<SafetyCertificateOutlined />} style={{ background: '#1677ff' }} />,
    variant: 'filled',
    styles: {
      content: { background: '#f0f5ff', maxWidth: '100%' },
    },
  },
}

const GREETING = {
  key: 'greeting',
  role: 'ai',
  content: '你好！我是 AI 审核 Agent，将对您提交的活动立项申请进行智能校验审查。\n审核涵盖信息完整性、日期合规、预算合理性、优惠券配置等 8 个维度。',
}

export default function AiReviewModal({ open, onClose, onConfirmSubmit }) {
  const { visibleMessages, isStreaming, startStreaming, reset } = useStreamingMessages(AI_REVIEW_MESSAGES)
  const scrollRef = useRef(null)

  const isDone = !isStreaming && visibleMessages.length === AI_REVIEW_MESSAGES.length

  useEffect(() => {
    if (open) {
      reset()
      const id = setTimeout(() => startStreaming(), 400)
      return () => clearTimeout(id)
    }
  }, [open, startStreaming, reset])

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
      })
    }
  }, [visibleMessages.length])

  const handleClose = () => {
    reset()
    onClose()
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
    <Modal
      title={
        <div className={styles.modalTitle}>
          <Avatar size={24} icon={<SafetyCertificateOutlined />} style={{ background: '#1677ff' }} />
          <span>AI 审核 Agent</span>
        </div>
      }
      open={open}
      onCancel={handleClose}
      width={680}
      maskClosable={false}
      footer={
        <Space>
          <Button onClick={handleClose}>
            {isDone ? '返回修改' : '取消'}
          </Button>
          {isDone && (
            <Button type="primary" onClick={onConfirmSubmit}>
              确认提交
            </Button>
          )}
        </Space>
      }
    >
      <div className={styles.modalBody}>
        <div className={styles.bubbleSection} ref={scrollRef}>
          <Bubble.List
            items={bubbleItems}
            role={aiRole}
          />
        </div>
      </div>
    </Modal>
  )
}
