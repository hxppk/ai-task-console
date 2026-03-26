import { Drawer, Descriptions, Timeline, Tag, Button, Space, Alert } from 'antd'
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import { ADMIN_COUPON_STATUS, ADMIN_COUPON_STATUS_COLOR } from '../../mock/data'
import styles from './CouponDrawer.module.css'

const stepIconMap = {
  done: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
  running: <SyncOutlined spin style={{ color: '#1677ff' }} />,
  pending: <MinusCircleOutlined style={{ color: '#d9d9d9' }} />,
  failed: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
}

const stepColorMap = {
  done: 'green',
  running: 'blue',
  pending: 'gray',
  failed: 'red',
}

export default function CouponDrawer({ coupon, onClose }) {
  if (!coupon) return null

  return (
    <Drawer
      title={
        <Space>
          <span>{coupon.name}</span>
          <Tag color={ADMIN_COUPON_STATUS_COLOR[coupon.adminStatus]}>{coupon.adminStatus}</Tag>
        </Space>
      }
      open={!!coupon}
      onClose={onClose}
      width={400}
    >
      <div className={styles.section}>
        <div className={styles.sectionTitle}>券基本信息</div>
        <Descriptions column={2} size="small">
          <Descriptions.Item label="券名称" span={2}>{coupon.name}</Descriptions.Item>
          <Descriptions.Item label="券类型">{coupon.type}</Descriptions.Item>
          <Descriptions.Item label="面额">{coupon.amount}</Descriptions.Item>
          <Descriptions.Item label="适用范围">{coupon.scope}</Descriptions.Item>
          <Descriptions.Item label="库存">{coupon.stock?.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="有效期" span={2}>{coupon.validRange}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>执行链路</div>
        <Timeline
          items={coupon.execSteps.map((step) => ({
            dot: stepIconMap[step.status],
            color: stepColorMap[step.status],
            children: (
              <div className={styles.timelineItem}>
                <span>{step.step}</span>
                {step.duration && <span className={styles.duration}>{step.duration}</span>}
              </div>
            ),
          }))}
        />
      </div>

      {coupon.draftId && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>草稿链接</div>
          <a>{coupon.draftId}</a>
        </div>
      )}

      {coupon.errors.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>异常记录</div>
          {coupon.errors.map((err, i) => (
            <Alert key={i} message={err} type="error" showIcon style={{ marginBottom: 8 }} />
          ))}
        </div>
      )}

      <div className={styles.footer}>
        {coupon.adminStatus === ADMIN_COUPON_STATUS.FAILED && (
          <Button type="primary" danger block>
            重试
          </Button>
        )}
        {coupon.adminStatus === ADMIN_COUPON_STATUS.COMPLETED && coupon.draftId && (
          <Button type="primary" block>
            去确认草稿
          </Button>
        )}
      </div>
    </Drawer>
  )
}
