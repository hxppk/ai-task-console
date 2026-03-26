import { Drawer, Descriptions, Timeline, Tag, Button, Space, Alert } from 'antd'
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import { ADMIN_COUPON_STATUS, ADMIN_COUPON_STATUS_COLOR } from '../../mock/data'
import styles from './SubTaskDrawer.module.css'

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

export default function SubTaskDrawer({ subTask, onClose }) {
  if (!subTask) return null

  return (
    <Drawer
      title={
        <Space>
          <span>{subTask.name}</span>
          <Tag color="blue">{subTask.skillType}</Tag>
        </Space>
      }
      open={!!subTask}
      onClose={onClose}
      width={400}
    >
      <div className={styles.section}>
        <div className={styles.sectionTitle}>通用信息</div>

        <div className={styles.subsection}>
          <div className={styles.subsectionTitle}>执行链路</div>
          <Timeline
            items={subTask.execSteps.map((step) => ({
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

        {subTask.errors.length > 0 && (
          <div className={styles.subsection}>
            <div className={styles.subsectionTitle}>异常记录</div>
            {subTask.errors.map((err, i) => (
              <Alert key={i} message={err} type="error" showIcon style={{ marginBottom: 8 }} />
            ))}
          </div>
        )}

        <div className={styles.footer}>
          {subTask.status === ADMIN_COUPON_STATUS.FAILED && (
            <Button type="primary" danger block>
              重试
            </Button>
          )}
          {subTask.status === ADMIN_COUPON_STATUS.COMPLETED && subTask.ext?.draftId && (
            <Button type="primary" block>
              去确认草稿
            </Button>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>扩展信息（{subTask.skillType}）</div>
        <Descriptions column={2} size="small">
          <Descriptions.Item label="券类型">{subTask.ext?.type}</Descriptions.Item>
          <Descriptions.Item label="面额">{subTask.ext?.amount}</Descriptions.Item>
          <Descriptions.Item label="适用范围">{subTask.ext?.scope}</Descriptions.Item>
          <Descriptions.Item label="库存">{subTask.ext?.stock?.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="有效期" span={2}>{subTask.ext?.validRange}</Descriptions.Item>
        </Descriptions>
        {subTask.ext?.draftId && (
          <div style={{ marginTop: 12 }}>
            <span className={styles.subsectionTitle}>草稿链接：</span>
            <a>{subTask.ext.draftId}</a>
          </div>
        )}
      </div>
    </Drawer>
  )
}
