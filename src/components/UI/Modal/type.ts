export interface ModalIprops {
  children?: React.ReactNode;
  data?: any;
  setVisible?: any;
  visible?: any;
  user?: any
  onRefresh?: () => void
  action?:string
  disabled?:boolean
}