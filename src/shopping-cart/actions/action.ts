import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): { [id: string]: number } => {
    if (hasCookie("cart")) {
        const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
        return cookieCart;
    }
    return {};
};

export const addProductToCart = (productId: string) => {
    const cookieCart = getCookieCart();
    cookieCart[productId] = (cookieCart[productId] ?? 0) + 1;

    setCookie("cart", JSON.stringify(cookieCart), {
        maxAge: 60 * 60 * 24 * 30,
    });
};

export const removeSingleItemFromCart = (productId: string) => {
    const cookieCart = getCookieCart();
    if (cookieCart[productId] > 1) {
        cookieCart[productId] -= 1;
    } else {
        delete cookieCart[productId];
    }

    setCookie("cart", JSON.stringify(cookieCart), {
        maxAge: 60 * 60 * 24 * 30,
    });
};

export const removeProductFromCart = (productId: string) => {
    const cookieCart = getCookieCart();
    delete cookieCart[productId];
    setCookie("cart", JSON.stringify(cookieCart), {
        maxAge: 60 * 60 * 24 * 30,
    });
};
