import { toast } from "@/components/UI/Toast/toast";

interface OnAddProps {
    product:any, cartItems?:any, setCartItems?:any, count?:any, setCount?:any, user:any
}

export const onAdd = ({product, cartItems, setCartItems, count, setCount, user}: OnAddProps) => {
        if (product?.soLuong === 0) {
            toast.error('Sản phẩm đã hết hàng !');
        }
        else {
            const exist = cartItems.find((cartItem:any) => {
                return cartItem?.ID === product?.ID && cartItem?.customer_id === user?.account?.getUser?.id 
            });
            
            if (exist) {
                setCartItems(
                    cartItems.map((cartItem:any) =>
                        cartItem.ID === product.ID
                            ? {
                                  ...exist,
                                  qty: count + cartItem.qty,
                                  total:
                                      (count + cartItem.qty) *
                                      (cartItem.giaBan - (cartItem.giaBan * cartItem.giamGia) / 100),
                                      customer_id:user?.account?.getUser?.id
                              }
                            : cartItem,
                    ),
                );
                toast.success('Thêm sản phẩm thành công !');
            } else {
                setCartItems([
                    ...cartItems,
                    {
                        ...product,
                        qty: count,
                        total: count * (product.giaBan - (product.giaBan * product.giamGia) / 100),
                        customer_id:user?.account?.getUser?.id
                    },
                ]);
                toast.success('Thêm sản phẩm thành công !');
            }
            setCount(1);
        }
};

export const onDelete = ({product, cartItems, setCartItems, user}: OnAddProps) => {
    setCartItems(cartItems.filter((cartItem:any) => cartItem.ID !== product.ID));
    toast.success('Xóa sản phẩm thành công !');
};