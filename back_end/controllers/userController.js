import { connection } from "../config/connect.js";

connection.connect((err) => {
    if (err) {
      console.error('Lỗi kết nối:', err);
      return;
    }
    console.log('Kết nối thành công vào cơ sở dữ liệu MySQL');
  });

const loginUser = async (req, res) =>{
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp tên người dùng và mật khẩu' });
    }
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi' });
      }
      if (results.length > 0) {
        console.log("results", results)
        var data = {
            id: results[0].user_id,
            username: results[0].username,
        }
        return res.json({ 
            message: 'Đăng nhập thành công',
            data: data
        });
      } else {
        return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng' });
      }
    });
}
const registerUser = async (req, res) =>{
  const { username, password, email } = req.body;

  // Thực hiện câu truy vấn để thêm tài khoản mới vào cơ sở dữ liệu
  const sql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
  connection.query(sql, [username, password, email], (err, result) => {
    if (err) {
      console.error('Lỗi khi thêm tài khoản mới:', err);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm tài khoản mới' });
    } else {
      console.log('Đã thêm tài khoản mới thành công');
      res.status(200).json({ message: 'Đăng ký tài khoản thành công' });
    }
  });
}
export {
    loginUser,
    registerUser
}