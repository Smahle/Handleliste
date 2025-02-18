import { Button } from "@mui/material";
import ShoppingCartManager from "../components/ShoppingCartManager";
import { useCartContext } from "../context/CartContext"


export default function Shop(){
    const { clearCart, deleteCart, activeCartId } = useCartContext();

    if(!activeCartId){
        return console.log("No active cart")
    }
    return (
    <ShoppingCartManager showFullControls={false} />
    );
}