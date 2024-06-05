import { connection } from "../config/connect.js";
const getProduct = (req, res) =>{
    connection.query('SELECT * FROM SanPham', (error, results) => {
        if (error) {
          console.error('Lỗi truy vấn: ' + error);
          res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu.' });
          return;
        }
        // Gửi kết quả về cho client
        res.json(results);
      });
}
const getProductDetail = (req, res) =>{
    const {id} = req.params;
    const query = 'SELECT * FROM SanPham WHERE MaSP = ?';

  // Execute the query with the productId as a parameter
  connection.query(query, [id], (error, results, fields) => {
    if (error) {
      console.error('Error retrieving product details: ' + error.message);
      res.status(500).send('Error retrieving product details');
      return;
    }
    if (results.length > 0) {
        console.log("results", results)
      res.json(results[0]);
    } else {
      res.status(404).send('Product not found');
    }
  });
}
export {
    getProduct,
    getProductDetail
}