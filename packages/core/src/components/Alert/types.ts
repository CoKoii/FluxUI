export interface AlertProps {
  // 颜色
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  // 变体
  variant?: 'solid' | 'bordered' | 'flat' | 'faded'
  // 圆角
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  // 图标隐藏
  hiddenIcon?: boolean
  // 可关闭
  closable?: boolean
}
