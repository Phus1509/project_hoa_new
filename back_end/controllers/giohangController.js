import { connection } from "../config/connect.js";

const getCartByUserId = (req, res) =>{
    const {id} = req.params;
    console.log("userID", id)
    const query = `
    SELECT ci.cart_id,ci.MaSP,ci.item_id, sp.TenSP,sp.GiaSP,sp.description,sp.image,ci.quantity
    FROM carts c
    INNER JOIN cart_items ci ON c.cart_id = ci.cart_id
    INNER JOIN SanPham sp ON ci.MaSP = sp.MaSP
    WHERE c.user_id = ${id}
  `;
  
    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error('Lỗi khi truy vấn thông tin giỏ hàng: ' + error.message);
        res.status(500).send('Lỗi khi truy vấn thông tin giỏ hàng');
        return;
      }
  
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).send('Không tìm thấy giỏ hàng');
      }
    });
};

const addToCart = (req, res) =>{
    const { userId, MaSP, quantity } = req.body;
    console.log("quantity", quantity)

  const checkCartQuery = `SELECT * FROM carts WHERE user_id = ?`;
  connection.query(checkCartQuery, [userId], (err, cartResult) => {
    console.log("cartResult", cartResult)
    if (err) {
      console.error('Lỗi khi kiểm tra giỏ hàng:', err);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi kiểm tra giỏ hàng' });
    } else {
      if (cartResult.length === 0) {
        const createCartQuery = `INSERT INTO carts (user_id) VALUES (?)`;
        connection.query(createCartQuery, [userId], (err, createCartResult) => {
            console.log("createCartResult",createCartResult)
          if (err) {
            console.error('Lỗi khi tạo giỏ hàng mới:', err);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo giỏ hàng mới' });
          } else {
            const addToCartQuery = `INSERT INTO cart_items (cart_id, MaSP, quantity) VALUES (?, ?, ?)`;
            connection.query(addToCartQuery, [createCartResult.insertId, MaSP, quantity], (err, addToCartResult) => {
              if (err) {
                console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', err);
                res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng' });
              } else {
                console.log('Đã thêm sản phẩm vào giỏ hàng thành công');
                res.status(200).json({ message: 'Đã thêm sản phẩm vào giỏ hàng' });
              }
            });
          }
        });
      } else {
        const cartId = cartResult[0].cart_id;
        console.log("cartId", cartResult)
        const checkCartItemQuery = `SELECT * FROM cart_items WHERE cart_id = ? AND MaSP = ?`;
        connection.query(checkCartItemQuery, [cartId, MaSP], (err, cartItemResult) => {
            console.log("cartItemResult", cartItemResult)
          if (err) {
            console.error('Lỗi khi kiểm tra sản phẩm trong giỏ hàng:', err);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi kiểm tra sản phẩm trong giỏ hàng' });
          } else {
            if (cartItemResult.length === 0) {
              const addToCartQuery = `INSERT INTO cart_items (cart_id, MaSP, quantity) VALUES (?, ?, ?)`;
              connection.query(addToCartQuery, [cartId, MaSP, quantity], (err, addToCartResult) => {
                if (err) {
                  console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', err);
                  res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng' });
                } else {
                  console.log('Đã thêm sản phẩm vào giỏ hàng thành công');
                  res.status(200).json({ message: 'Đã thêm sản phẩm vào giỏ hàng' });
                }
              });
            } else {
                const updatedQuantity = cartItemResult[0].quantity + 1;
                console.log("updatedQuantity", updatedQuantity)
              const updateCartItemQuery = `UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND MaSP = ?`;
              connection.query(updateCartItemQuery, [updatedQuantity, cartId, MaSP], (err, updateCartItemResult) => {
                console.log("updateCartItemResult", updateCartItemResult)
                if (err) {
                  console.error('Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng:', err);
                  res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng' });
                } else {
                  console.log('Đã cập nhật số lượng sản phẩm trong giỏ hàng thành công');
                  res.status(200).json({ message: 'Đã cập nhật số lượng sản phẩm trong giỏ hàng' });
                }
              });
            }
          }
        });
      }
    }
  });
}
const deleteCart = (req, res) =>{
    const {cartId }= req.params;

    const deleteCartItemsQuery = `DELETE FROM cart_items WHERE item_id = ?`;
    connection.query(deleteCartItemsQuery, [cartId], (err, result) => {
      if (err) {
        console.error('Lỗi khi xóa các mặt hàng trong giỏ hàng:', err);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa các mặt hàng trong giỏ hàng' });
      } else {
        console.log('Đã xóa tất cả các mặt hàng trong giỏ hàng thành công');
        res.status(200).json({ message: 'Đã xóa tất cả các mặt hàng trong giỏ hàng' });
      }
    });
}
  export {
    getCartByUserId,
    addToCart,
    deleteCart,
}