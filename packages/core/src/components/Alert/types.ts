export interface AlertProps {
  // 颜色
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  // 变体
  // TODO:功能待完善
  variant?: 'solid' | 'bordered' | 'flat' | 'faded'
  // 圆角
  // TODO:功能待完善
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  // 图标隐藏
  // TODO:功能待完善
  iconHidden?: boolean
}
